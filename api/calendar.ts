export const config = { runtime: 'edge' };

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

function parseICSDate(dateStr: string): string {
  if (!dateStr) return '';
  const tzMatch = dateStr.match(/TZID=([^:]+):(.+)/);
  if (tzMatch) return formatDateStr(tzMatch[2]);
  return formatDateStr(dateStr.replace(/[^0-9T]/g, ''));
}

function formatDateStr(dt: string): string {
  if (dt.length < 8) return dt;
  const y = dt.substring(0, 4);
  const m = dt.substring(4, 6);
  const d = dt.substring(6, 8);
  if (dt.length >= 15) {
    return `${y}-${m}-${d}T${dt.substring(9, 11)}:${dt.substring(11, 13)}:${dt.substring(13, 15)}`;
  }
  return `${y}-${m}-${d}`;
}

function unfoldICS(raw: string): string {
  return raw.replace(/\r?\n[ \t]/g, '');
}

function extractField(block: string, field: string): string {
  const regex = new RegExp(`^${field}[;:](.*)$`, 'mi');
  const match = block.match(regex);
  if (!match) return '';
  const fullLine = match[0];
  if (fullLine.startsWith(field + ';')) return match[1];
  return match[1];
}

function parseDescription(desc: string): { notes: string; documents: string[] } {
  const decoded = desc.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\\\/g, '\\').replace(/\\;/g, ';');
  const documents: string[] = [];
  const urlRegex = /https?:\/\/[^\s<>"]+/g;
  let m;
  while ((m = urlRegex.exec(decoded)) !== null) documents.push(m[0]);
  return { notes: decoded.trim(), documents };
}

function parseAttendees(block: string): string[] {
  const attendees: string[] = [];
  const regex = /^ATTENDEE[;:].*/gmi;
  let m;
  while ((m = regex.exec(block)) !== null) {
    const cn = m[0].match(/CN=([^;:]+)/);
    const ml = m[0].match(/mailto:([^\s;]+)/i);
    if (cn) attendees.push(cn[1].replace(/"/g, ''));
    else if (ml) attendees.push(ml[1]);
  }
  return attendees;
}

function parseOrganizer(block: string): string {
  const m = block.match(/^ORGANIZER[;:].*/mi);
  if (!m) return '';
  const cn = m[0].match(/CN=([^;:]+)/);
  const ml = m[0].match(/mailto:([^\s;]+)/i);
  if (cn) return cn[1].replace(/"/g, '');
  if (ml) return ml[1];
  return '';
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const ICS_URL = 'https://calendar.google.com/calendar/ical/852831a7508dafc2e0b3ab728fdc731e7bd45b568b4ab8b0fd7657a5e5771934%40group.calendar.google.com/private-7488cacbe0ed358a3e498183e2e2ea63/basic.ics';

  try {
    const response = await fetch(ICS_URL, {
      headers: { 'User-Agent': 'CreateWell-Dashboard/1.0' },
    });

    if (!response.ok) throw new Error(`ICS fetch failed: ${response.status}`);

    const icsText = await response.text();
    const unfolded = unfoldICS(icsText);
    const eventBlocks = unfolded.split('BEGIN:VEVENT');
    eventBlocks.shift();

    const events: CalendarEvent[] = [];

    for (const block of eventBlocks) {
      const ec = block.split('END:VEVENT')[0];
      const summary = extractField(ec, 'SUMMARY').replace(/\\,/g, ',').replace(/\\\\/g, '\\');
      const descriptionRaw = extractField(ec, 'DESCRIPTION');
      const { notes, documents } = parseDescription(descriptionRaw);

      events.push({
        id: extractField(ec, 'UID'),
        title: summary,
        start: parseICSDate(extractField(ec, 'DTSTART')),
        end: parseICSDate(extractField(ec, 'DTEND')),
        description: notes,
        location: extractField(ec, 'LOCATION').replace(/\\,/g, ',').replace(/\\\\/g, '\\'),
        organizer: parseOrganizer(ec),
        attendees: parseAttendees(ec),
        status: extractField(ec, 'STATUS') || 'CONFIRMED',
        created: parseICSDate(extractField(ec, 'CREATED')),
        updated: parseICSDate(extractField(ec, 'LAST-MODIFIED')),
        documents,
      });
    }

    events.sort((a, b) => {
      const dA = new Date(a.start || '1970-01-01').getTime();
      const dB = new Date(b.start || '1970-01-01').getTime();
      return dB - dA;
    });

    return new Response(
      JSON.stringify({
        calendarName: 'Create Well',
        eventCount: events.length,
        events,
        lastFetched: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch calendar data', message: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}
