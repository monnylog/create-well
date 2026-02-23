import { useState } from 'react';
import { CalendarDays, ExternalLink, Grid, List } from 'lucide-react';

const CALENDAR_ID = '852831a7508dafc2e0b3ab728fdc731e7bd45b568b4ab8b0fd7657a5e5771934%40group.calendar.google.com';

const EMBED_URL = `https://calendar.google.com/calendar/embed?src=${CALENDAR_ID}&ctz=America%2FLos_Angeles&mode=AGENDA&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&bgcolor=%23ffffff`;

const EMBED_MONTH_URL = `https://calendar.google.com/calendar/embed?src=${CALENDAR_ID}&ctz=America%2FLos_Angeles&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&bgcolor=%23ffffff`;

export function GoogleCalendarSection() {
  const [view, setView] = useState<'agenda' | 'month'>('agenda');

  const embedSrc = view === 'agenda' ? EMBED_URL : EMBED_MONTH_URL;

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
        All team events, syncs, walkthroughs, and deadlines — live from Google Calendar.
        Click any event for full details including notes, attendees, and linked documents.
      </p>

      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setView('agenda')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            view === 'agenda'
              ? 'bg-terracotta text-white'
              : 'bg-card border border-border text-muted-foreground hover:bg-card/80'
          }`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <List className="w-3 h-3" />
          Agenda
        </button>
        <button
          onClick={() => setView('month')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
            view === 'month'
              ? 'bg-terracotta text-white'
              : 'bg-card border border-border text-muted-foreground hover:bg-card/80'
          }`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <Grid className="w-3 h-3" />
          Month
        </button>
      </div>

      {/* Calendar Embed */}
      <div className="rounded-xl border border-border overflow-hidden bg-white shadow-sm">
        <iframe
          src={embedSrc}
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Create Well Google Calendar"
          className="w-full"
        />
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <a
          href={`https://calendar.google.com/calendar/r?cid=${CALENDAR_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-terracotta/80 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <ExternalLink className="w-4 h-4" />
          Open in Google Calendar
        </a>
        <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
          Live sync via Google Calendar
        </span>
      </div>
    </div>
  );
}
