import { useState, useEffect } from 'react';
import { CalendarDays, ExternalLink, Clock, MapPin, Users, FileText, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  location: string;
  organizer: string;
  attendees: string[];
  status: string;
  created: string;
  updated: string;
  documents: string[];
}

interface CalendarData {
  calendarName: string;
  eventCount: number;
  events: CalendarEvent[];
  lastFetched: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(dateStr: string): string {
  if (!dateStr || dateStr.length <= 10) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function isUpcoming(dateStr: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) >= new Date();
}

function EventCard({ event }: { event: CalendarEvent }) {
  const [expanded, setExpanded] = useState(false);
  const upcoming = isUpcoming(event.start);
  const startTime = formatTime(event.start);
  const endTime = formatTime(event.end);
  const timeRange = startTime && endTime ? `${startTime} - ${endTime}` : startTime || '';

  return (
    <div
      className={`rounded-xl border shadow-sm transition-all duration-200 ${
        upcoming
          ? 'bg-card border-terracotta/30 hover:border-terracotta/50'
          : 'bg-card/60 border-border opacity-80'
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 md:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {upcoming && (
                <span className="inline-block w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              )}
              <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                {formatDate(event.start)}
              </span>
            </div>
            <h3 className="font-display text-base md:text-lg font-semibold text-foreground truncate">
              {event.title}
            </h3>
            {timeRange && (
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                <Clock className="w-3 h-3" />
                {timeRange}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {event.attendees.length > 0 && (
              <span className="text-xs text-muted-foreground flex items-center gap-1" style={{ fontFamily: 'var(--font-body)' }}>
                <Users className="w-3 h-3" />
                {event.attendees.length}
              </span>
            )}
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-3 border-t border-border/50 pt-3">
          {event.location && (
            <div className="flex items-start gap-2 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <MapPin className="w-3.5 h-3.5 text-terracotta/60 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{event.location}</span>
            </div>
          )}
          {event.organizer && (
            <div className="flex items-start gap-2 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <Users className="w-3.5 h-3.5 text-sage/60 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">Organizer: {event.organizer}</span>
            </div>
          )}
          {event.attendees.length > 0 && (
            <div className="flex items-start gap-2 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <Users className="w-3.5 h-3.5 text-gold/60 mt-0.5 flex-shrink-0" />
              <div className="text-muted-foreground">
                <span className="font-medium">Attendees:</span>{' '}
                {event.attendees.join(', ')}
              </div>
            </div>
          )}
          {event.description && (
            <div className="flex items-start gap-2 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              <FileText className="w-3.5 h-3.5 text-muted-foreground/60 mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground whitespace-pre-wrap text-xs leading-relaxed">
                {event.description}
              </p>
            </div>
          )}
          {event.documents.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Associated Documents:
              </p>
              {event.documents.map((doc, i) => (
                <a
                  key={i}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-terracotta hover:text-terracotta/80 transition-colors truncate"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  {doc}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function GoogleCalendarSection() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    async function fetchCalendar() {
      try {
        setLoading(true);
        const res = await fetch('/api/calendar');
        if (!res.ok) throw new Error('Failed to load calendar');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, []);

  const filteredEvents = data?.events.filter(e => {
    if (filter === 'upcoming') return isUpcoming(e.start);
    if (filter === 'past') return !isUpcoming(e.start);
    return true;
  }) || [];

  const upcomingCount = data?.events.filter(e => isUpcoming(e.start)).length || 0;
  const pastCount = data?.events.filter(e => !isUpcoming(e.start)).length || 0;

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="flex items-center gap-3 mb-4">
        <CalendarDays className="w-5 h-5 text-terracotta" />
        <p className="text-xs font-semibold tracking-[0.2em] text-terracotta/80 uppercase">
          LIVE CALENDAR
        </p>
      </div>

      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
        Create Well Calendar
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-8" style={{ fontFamily: 'var(--font-body)' }}>
        All team events, syncs, walkthroughs, and deadlines — pulled live from Google Calendar.
        Expand any event to see notes, attendees, and linked documents.
      </p>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {(['all', 'upcoming', 'past'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-terracotta text-white'
                : 'bg-card border border-border text-muted-foreground hover:bg-card/80'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {f === 'all' && `All (${data?.eventCount || 0})`}
            {f === 'upcoming' && `Upcoming (${upcomingCount})`}
            {f === 'past' && `Past (${pastCount})`}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-terracotta animate-spin" />
          <span className="ml-2 text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
            Loading calendar events...
          </span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-sm text-red-600" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <CalendarDays className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                No events found for this filter.
              </p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      )}

      {/* Footer */}
      {data && (
        <div className="mt-6 flex items-center justify-between">
          <a
            href="https://calendar.google.com/calendar/r?cid=852831a7508dafc2e0b3ab728fdc731e7bd45b568b4ab8b0fd7657a5e5771934%40group.calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-terracotta/80 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Calendar
          </a>
          <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
            Last synced: {new Date(data.lastFetched).toLocaleTimeString()}
          </span>
        </div>
      )}
    </div>
  );
}
