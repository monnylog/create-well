export const config = { runtime: 'edge' };

const BLOB_STORE_URL = 'https://blob.vercel-storage.com';
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
  { id: '1', title: 'Finalize guest welcome packet design', assignee: 'Sunshine', status: 'in-progress', priority: 'high', dueDate: '2026-01-20', notes: 'Awaiting final copy from Monny' },
  { id: '2', title: 'Review activation station signage proofs', assignee: 'Bingle', status: 'todo', priority: 'high', dueDate: '2026-01-18' },
  { id: '3', title: 'Coordinate catering timeline with venue', assignee: 'Monny', status: 'in-progress', priority: 'medium', dueDate: '2026-01-22' },
  { id: '4', title: 'Set up registration check-in tablets', assignee: 'Bingle', status: 'todo', priority: 'medium', dueDate: '2026-01-25' },
  { id: '5', title: 'Draft social media post schedule', assignee: 'Sunshine', status: 'done', priority: 'low' },
  { id: '6', title: 'Confirm AV equipment delivery window', assignee: 'Monny', status: 'blocked', priority: 'high', dueDate: '2026-01-17', notes: 'Vendor not responding \u2014 follow up needed' },
  { id: '7', title: 'Create run-of-show document', assignee: 'Monny', status: 'todo', priority: 'high', dueDate: '2026-01-21' },
  { id: '8', title: 'Test nebula projection mapping sequence', assignee: 'Bingle', status: 'in-progress', priority: 'medium', dueDate: '2026-01-23' },
  { id: '9', title: 'Prepare team debrief template', assignee: 'Sunshine', status: 'todo', priority: 'low', dueDate: '2026-01-28' },
];

async function getTasks(token: string): Promise<Task[]> {
  try {
    const listRes = await fetch(`${BLOB_STORE_URL}?prefix=${TASKS_KEY}&limit=1`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const listData = await listRes.json();
    if (listData.blobs && listData.blobs.length > 0) {
      const dataRes = await fetch(listData.blobs[0].downloadUrl, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await dataRes.json();
    }
  } catch (e) {
    console.error('Error reading tasks from blob:', e);
  }
  return INITIAL_TASKS;
}

async function saveTasks(token: string, tasks: Task[]): Promise<void> {
  await fetch(`${BLOB_STORE_URL}/${TASKS_KEY}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
      'x-content-type': 'application/json',
      'x-cache-control-max-age': '0',
    },
    body: JSON.stringify(tasks),
  });
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
