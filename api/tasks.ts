import { put, list } from '@vercel/blob';

export const config = { runtime: 'edge' };

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

async function getTasks(): Promise<Task[]> {
  try {
    const { blobs } = await list({ prefix: TASKS_KEY });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    }
  } catch (e) {
    console.error('Error reading tasks from blob:', e);
  }
  return INITIAL_TASKS;
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await put(TASKS_KEY, JSON.stringify(tasks), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

export default async function handler(req: Request): Promise<Response> {
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
    const tasks = await getTasks();
    return new Response(JSON.stringify(tasks), { headers });
  }

  if (req.method === 'PUT') {
    try {
      const tasks: Task[] = await req.json();
      await saveTasks(tasks);
      return new Response(JSON.stringify({ ok: true }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400, headers });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
}
