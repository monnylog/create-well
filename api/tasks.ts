export const config = { runtime: 'edge' };

const BLOB_API = 'https://blob.vercel-storage.com';
const TASKS_KEY = 'tasks.json';

interface Task {
  id: string;
  title: string;
  assignee: 'Monny' | 'Bingle' | 'Sunshine';
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  notes?: string;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Confirm venue contract with Taverna Costera', assignee: 'Monny', status: 'in-progress', priority: 'high', dueDate: '2026-02-28', notes: 'Venue status still pending — need signed contract and deposit' },
  { id: '2', title: 'Finalize CR8W pitch kit before BHD sync', assignee: 'Sunshine', status: 'in-progress', priority: 'high', dueDate: '2026-02-25', notes: 'Review at tomorrow Co-Hoe Updates sync' },
  { id: '3', title: 'Draft sponsorship package document', assignee: 'Monny', status: 'in-progress', priority: 'high', dueDate: '2026-03-01', notes: 'Tier structure defined — need final copy and send list' },
  { id: '4', title: 'Prep content intake brief for Bingle before Manila trip', assignee: 'Sunshine', status: 'todo', priority: 'high', dueDate: '2026-02-26', notes: 'Bingle leaves Feb 27 for 17 days — needs shot list and deliverables doc' },
  { id: '5', title: 'Coordinate with Elle Hope on Word Bank station details', assignee: 'Sunshine', status: 'todo', priority: 'medium', dueDate: '2026-03-15', notes: 'Book display logistics, mic moment timing, closing poem selection' },
  { id: '6', title: 'Reach out to Ilona Pamplona re: Human Design station format', assignee: 'Monny', status: 'todo', priority: 'medium', dueDate: '2026-03-10', notes: 'Lightning round format, type cards design, name tag badges' },
  { id: '7', title: 'Write Notes from the Well prompt card copy', assignee: 'Sunshine', status: 'todo', priority: 'medium', dueDate: '2026-03-20', notes: 'Need seeded prompts for The Well + The Spring vessels' },
  { id: '8', title: 'Set up CR8W Instagram account and handle', assignee: 'Bingle', status: 'blocked', priority: 'high', dueDate: '2026-03-16', notes: 'Blocked until Bingle returns from Manila (Mar 15)' },
  { id: '9', title: 'Build RSVP and email list sign-up integration', assignee: 'Monny', status: 'todo', priority: 'medium', dueDate: '2026-03-15', notes: 'Need landing page with capacity tracker (100-200 guests)' },
  { id: '10', title: 'Record Sunshine welcome + CR8W philosophy video', assignee: 'Bingle', status: 'todo', priority: 'high', dueDate: '2026-03-20', notes: 'Evergreen content — must capture before potential Virgin Voyages departure' },
  { id: '11', title: 'Create day-of run-of-show document', assignee: 'Monny', status: 'todo', priority: 'high', dueDate: '2026-04-01', notes: 'Full timeline: Arrive (0-25min), Welcome, Tasting Menu, Connect, From the Well, Closing Ritual' },
  { id: '12', title: 'Design and order welcome cards + bingo cards', assignee: 'Monny', status: 'todo', priority: 'medium', dueDate: '2026-03-25', notes: 'Welcome card shows 5 stations + evening flow; bingo card for guest exploration' },
  { id: '13', title: 'Confirm painting station lead (Gaia/Angel) and supply list', assignee: 'Sunshine', status: 'todo', priority: 'low', dueDate: '2026-03-20', notes: 'Art supplies, protective covering, single prompt card' },
  { id: '14', title: 'Define raffle prizes and incentive structure', assignee: 'Sunshine', status: 'todo', priority: 'low', dueDate: '2026-03-30', notes: 'Grand / Featured / Community tiers — coordinate with sponsors' },
  { id: '15', title: 'Draft Sunshine closing toast and vision speech', assignee: 'Sunshine', status: 'todo', priority: 'medium', dueDate: '2026-04-05', notes: 'What CR8W is building, where it is going, and how tonight is just the first page' },
  { id: '16', title: 'Source The Well + The Spring vessels', assignee: 'Monny', status: 'todo', priority: 'medium', dueDate: '2026-03-25', notes: 'Two branded vessels for the writing station — seed with pre-written cards before doors' },
  { id: '17', title: 'Coordinate MBODY somatic/play activation details', assignee: 'Monny', status: 'todo', priority: 'low', dueDate: '2026-03-15', notes: 'Format TBD — something that gets people moving or laughing, a shared reset' },
  { id: '18', title: 'Plan Feb-Apr workshop/gathering calendar', assignee: 'Sunshine', status: 'in-progress', priority: 'medium', dueDate: '2026-02-25', notes: 'Due for BHD sync discussion tomorrow' },
];

async function getTasks(token: string): Promise<Task[]> {
  try {
    const listRes = await fetch(`${BLOB_API}?prefix=${encodeURIComponent(TASKS_KEY)}&limit=1`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!listRes.ok) throw new Error(`List failed: ${listRes.status}`);
    const listData = await listRes.json();
    if (listData.blobs && listData.blobs.length > 0) {
      const blobUrl = listData.blobs[0].url;
      const dataRes = await fetch(blobUrl);
      if (dataRes.ok) {
        const data = await dataRes.json();
        if (Array.isArray(data)) return data;
      }
    }
  } catch (e) {
    console.error('getTasks error:', e);
  }
  return INITIAL_TASKS;
}

async function saveTasks(token: string, tasks: Task[]): Promise<void> {
  const res = await fetch(`${BLOB_API}/${TASKS_KEY}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
      'x-api-version': '7',
      'x-content-type': 'application/json',
      'x-add-random-suffix': 'false',
    },
    body: JSON.stringify(tasks),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('saveTasks error:', res.status, text);
  }
}

export default async function handler(req: Request): Promise<Response> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'Storage not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
    });
  }

  const headers = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, PUT, OPTIONS',
    'access-control-allow-headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === 'GET') {
    const tasks = await getTasks(token);
    return new Response(JSON.stringify(tasks), { headers });
  }

  if (req.method === 'PUT') {
    try {
      const tasks: Task[] = await req.json();
      await saveTasks(token, tasks);
      return new Response(JSON.stringify({ ok: true }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400, headers });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
}
