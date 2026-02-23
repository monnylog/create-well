import type { VercelRequest, VercelResponse } from '@vercel/node';

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
}

function parseICSDate(dateStr: string): string {
  if (!dateStr) return '';
  // Handle TZID format: TZID=America/Los_Angeles:20250224T100000
  const tzMatch = dateStr.match(/TZID=([^:]+):(.+)/);
  if (tzMatch) {
    const [, , dt] = tzMatch;
    return formatDateStr(dt);
  }
  // Handle basic format: 20250224T100000Z
  return formatDateStr(dateStr.replace(/[^0-9T]/g, ''));
}

function formatDateStr(dt: string): string {
  if (dt.length < 8) return dt;
  const year = dt.substring(0, 4);
  const month = dt.substring(4, 6);
  const day = dt.substring(6, 8);
  if (dt.length >= 15) {
    const hour = dt.substring(9, 11);
    const min = dt.substring(11, 13);
    const sec = dt.substring(13, 15);
    return `${year}-${month}-${day}T${hour}:${min}:${sec}`;
  }
  return `${year}-${month}-${day}`;
}

function unfoldICS(raw: string): string {
  // RFC 5545: long lines are folded with CRLF + space/tab
  return raw.replace(/\r?\n[ \t]/g, '');
}

function extractField(block: string, field: string): string {
  // Match field with optional params e.g. DTSTART;TZID=...:value
  const regex = new RegExp(`^${field}[;:](.*)$`, 'mi');
  const match = block.match(regex);
  if (!match) return '';
  const line = match[1];
  // For fields with params like DTSTART;TZID=...:value, get everything after field name
  const colonIdx = line.indexOf(':');
  // If the original match started with ;, the value includes params
  const fullLine = match[0];
  if (fullLine.startsWith(field + ';')) {
    // Has parameters - return full value for date parsing
    return line;
  }
  // Simple field:value
  return line;
}

function parseDescription(desc: string): { notes: string; documents: string[] } {
  const decoded = desc
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\\\/g, '\\')
    .replace(/\\;/g, ';');
  
  const documents: string[] = [];
  const urlRegex = /https?:\/\/[^\s<>"]+/g;
  let urlMatch;
  while ((urlMatch = urlRegex.exec(decoded)) !== null) {
    documents.push(urlMatch[0]);
  }
  
  return { notes: decoded.trim(), documents };
}

function parseAttendees(block: string): string[] {
  const attendees: string[] = [];
  const regex = /^ATTENDEE[;:].*/gmi;
  let match;
  while ((match = regex.exec(block)) !== null) {
    const line = match[0];
    // Extract CN (common name)
    const cnMatch = line.match(/CN=([^;:]+)/);
    // Extract mailto
    const mailtoMatch = line.match(/mailto:([^\s;]+)/i);
    if (cnMatch) {
      attendees.push(cnMatch[1].replace(/"/g, ''));
    } else if (mailtoMatch) {
      attendees.push(mailtoMatch[1]);
    }
  }
  return attendees;
}

function parseOrganizer(block: string): string {
  const regex = /^ORGANIZER[;:].*/mi;
  const match = block.match(regex);
  if (!match) return '';
  const line = match[0];
  const cnMatch = line.match(/CN=([^;:]+)/);
  const mailtoMatch = line.match(/mailto:([^\s;]+)/i);
  if (cnMatch) return cnMatch[1].replace(/"/g, '');
  if (mailtoMatch) return mailtoMatch[1];
  return '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const ICS_URL = 'https://calendar.google.com/calendar/ical/852831a7508dafc2e0b3ab728fdc731e7bd45b568b4ab8b0fd7657a5e5771934%40group.calendar.google.com/private-7488cacbe0ed358a3e498183e2e2ea63/basic.ics';

  try {
    const response = await fetch(ICS_URL, {
      headers: { 'User-Agent': 'CreateWell-Dashboard/1.0' }
    });

    if (!response.ok) {
      throw new Error(`ICS fetch failed: ${response.status}`);
    }

    const icsText = await response.text();
    const unfolded = unfoldICS(icsText);
    
    // Split into VEVENT blocks
    const eventBlocks = unfolded.split('BEGIN:VEVENT');
    eventBlocks.shift(); // Remove preamble
    
    const events: (CalendarEvent & { documents: string[] })[] = [];
    
    for (const block of eventBlocks) {
      const eventContent = block.split('END:VEVENT')[0];
      
      const summary = extractField(eventContent, 'SUMMARY')
        .replace(/\\,/g, ',')
        .replace(/\\\\/g, '\\');
      const dtStart = extractField(eventContent, 'DTSTART');
      const dtEnd = extractField(eventContent, 'DTEND');
      const uid = extractField(eventContent, 'UID');
      const locationRaw = extractField(eventContent, 'LOCATION')
        .replace(/\\,/g, ',')
        .replace(/\\\\/g, '\\');
      const statusRaw = extractField(eventContent, 'STATUS');
      const createdRaw = extractField(eventContent, 'CREATED');
      const lastModRaw = extractField(eventContent, 'LAST-MODIFIED');
      const descriptionRaw = extractField(eventContent, 'DESCRIPTION');
      
      const { notes, documents } = parseDescription(descriptionRaw);
      const attendees = parseAttendees(eventContent);
      const organizer = parseOrganizer(eventContent);
      
      events.push({
        id: uid,
        title: summary,
        start: parseICSDate(dtStart),
        end: parseICSDate(dtEnd),
        description: notes,
        location: locationRaw,
        organizer,
        attendees,
        status: statusRaw || 'CONFIRMED',
        created: parseICSDate(createdRaw),
        updated: parseICSDate(lastModRaw),
        documents
      });
    }
    
    // Sort by start date descending (newest first)
    events.sort((a, b) => {
      const dateA = new Date(a.start || '1970-01-01').getTime();
      const dateB = new Date(b.start || '1970-01-01').getTime();
      return dateB - dateA;
    });
    
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({
      calendarName: 'Create Well',
      eventCount: events.length,
      events,
      lastFetched: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Calendar API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch calendar data',
      message: error.message 
    });
  }
}
