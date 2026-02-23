import { CalendarDays, ExternalLink } from 'lucide-react';

const CALENDAR_ID = 'en.usa%23holiday%40group.v.calendar.google.com';

export function GoogleCalendarSection() {
  const embedUrl = `https://calendar.google.com/calendar/embed?src=${CALENDAR_ID}&ctz=America/Los_Angeles&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&bgcolor=%23FDF6EE`;

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="flex items-center gap-3 mb-4">
        <CalendarDays className="w-5 h-5 text-terracotta" />
        <p className="text-xs font-semibold tracking-[0.2em] text-terracotta/80 uppercase">
          LIVE CALENDAR
        </p>
      </div>

      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
        Team Schedule & Milestones
      </h2>

      <p className="text-muted-foreground max-w-2xl mb-8">
        Live view of CR8W team events, BHD syncs, venue walkthroughs, and deliverable deadlines.
        Synced from Google Calendar &mdash; updates in real time.
      </p>

      <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-card">
        <iframe
          src={embedUrl}
          className="w-full border-0"
          style={{ minHeight: '500px', height: '60vh' }}
          title="CR8W Team Calendar"
          loading="lazy"
        />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <a
          href={`https://calendar.google.com/calendar/r?cid=${CALENDAR_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-terracotta/80 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open in Google Calendar
        </a>
        <span className="text-muted-foreground text-xs">
          &middot; Replace CALENDAR_ID with your shared CR8W calendar ID
        </span>
      </div>
    </div>
  );
}
