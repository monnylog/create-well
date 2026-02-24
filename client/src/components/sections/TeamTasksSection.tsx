import { useState, useEffect, useCallback, useRef } from 'react';
import { Users, CheckCircle2, Circle, Clock, AlertCircle, Plus, ChevronDown, ChevronUp, Trash2, Save, Loader2, X } from 'lucide-react';

/*
 * Team Tasks Section — Monny, Bingle & Sunshine
 * Editable with Vercel Blob persistence
 * Auto-saves on every change
 */

interface Task {
  id: string;
  title: string;
  assignee: 'Monny' | 'Bingle' | 'Sunshine';
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  notes?: string;
}

const TEAM_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Monny: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' },
  Bingle: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200', dot: 'bg-sky-500' },
  Sunshine: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200', dot: 'bg-rose-400' },
};

const STATUS_CONFIG = {
  'todo': { icon: Circle, label: 'To Do', color: 'text-muted-foreground' },
  'in-progress': { icon: Clock, label: 'In Progress', color: 'text-amber-600' },
  'done': { icon: CheckCircle2, label: 'Done', color: 'text-emerald-600' },
  'blocked': { icon: AlertCircle, label: 'Blocked', color: 'text-red-500' },
};

const STATUS_CYCLE: Task['status'][] = ['todo', 'in-progress', 'done', 'blocked'];

const FALLBACK_TASKS: Task[] = [
  { id: '1', title: 'Finalize guest welcome packet design', assignee: 'Sunshine', status: 'in-progress', priority: 'high', dueDate: '2026-01-20', notes: 'Awaiting final copy from Monny' },
  { id: '2', title: 'Review activation station signage proofs', assignee: 'Bingle', status: 'todo', priority: 'high', dueDate: '2026-01-18' },
  { id: '3', title: 'Coordinate catering timeline with venue', assignee: 'Monny', status: 'in-progress', priority: 'medium', dueDate: '2026-01-22' },
  { id: '4', title: 'Set up registration check-in tablets', assignee: 'Bingle', status: 'todo', priority: 'medium', dueDate: '2026-01-25' },
  { id: '5', title: 'Draft social media post schedule', assignee: 'Sunshine', status: 'done', priority: 'low' },
  { id: '6', title: 'Confirm AV equipment delivery window', assignee: 'Monny', status: 'blocked', priority: 'high', dueDate: '2026-01-17', notes: 'Vendor not responding' },
  { id: '7', title: 'Create run-of-show document', assignee: 'Monny', status: 'todo', priority: 'high', dueDate: '2026-01-21' },
  { id: '8', title: 'Test nebula projection mapping sequence', assignee: 'Bingle', status: 'in-progress', priority: 'medium', dueDate: '2026-01-23' },
  { id: '9', title: 'Prepare team debrief template', assignee: 'Sunshine', status: 'todo', priority: 'low', dueDate: '2026-01-28' },
];

export function TeamTasksSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState<Task['assignee']>('Monny');
  const [newPriority, setNewPriority] = useState<Task['priority']>('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load tasks from API on mount
  useEffect(() => {
    fetch('/api/tasks')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setTasks(data); else setTasks(FALLBACK_TASKS); })
      .catch(() => setTasks(FALLBACK_TASKS))
      .finally(() => setLoading(false));
  }, []);

  // Debounced save to API
  const saveToApi = useCallback((updated: Task[]) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaving(true);
      try {
        await fetch('/api/tasks', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });
      } catch (e) { console.error('Save failed:', e); }
      setSaving(false);
    }, 600);
  }, []);

  const updateTasks = useCallback((updated: Task[]) => {
    setTasks(updated);
    saveToApi(updated);
  }, [saveToApi]);

  // Toggle status by cycling through todo -> in-progress -> done -> blocked
  const cycleStatus = (id: string) => {
    const updated = tasks.map(t => {
      if (t.id !== id) return t;
      const idx = STATUS_CYCLE.indexOf(t.status);
      return { ...t, status: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] };
    });
    updateTasks(updated);
  };

  // Update a task field
  const updateField = (id: string, field: keyof Task, value: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, [field]: value } : t);
    updateTasks(updated);
  };

  // Delete a task
  const deleteTask = (id: string) => {
    updateTasks(tasks.filter(t => t.id !== id));
  };

  // Add a new task
  const addTask = () => {
    if (!newTitle.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      assignee: newAssignee,
      status: 'todo',
      priority: newPriority,
      dueDate: newDueDate || undefined,
    };
    updateTasks([...tasks, task]);
    setNewTitle('');
    setNewDueDate('');
    setShowAddForm(false);
  };

  const filtered = tasks.filter(t => {
    if (filterAssignee !== 'all' && t.assignee !== filterAssignee) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const countByStatus = (status: string) => tasks.filter(t => t.status === status).length;

  if (loading) {
    return (
      <section className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading tasks...</span>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header with save indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Team Tasks
          </h2>
          <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: 'var(--font-body)' }}>
            Task tracker for Monny, Bingle & Sunshine
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saving && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" /> Saving...
            </span>
          )}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Task
          </button>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="rounded-xl border border-primary/20 bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">New Task</span>
            <button onClick={() => setShowAddForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text" placeholder="Task title..." value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            autoFocus
          />
          <div className="flex flex-wrap gap-2">
            <select value={newAssignee} onChange={e => setNewAssignee(e.target.value as Task['assignee'])}
              className="px-2 py-1 rounded border border-border bg-background text-xs">
              <option value="Monny">Monny</option>
              <option value="Bingle">Bingle</option>
              <option value="Sunshine">Sunshine</option>
            </select>
            <select value={newPriority} onChange={e => setNewPriority(e.target.value as Task['priority'])}
              className="px-2 py-1 rounded border border-border bg-background text-xs">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)}
              className="px-2 py-1 rounded border border-border bg-background text-xs" />
            <button onClick={addTask}
              className="px-3 py-1 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">
              Add
            </button>
          </div>
        </div>
      )}

      {/* Team Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['Monny', 'Bingle', 'Sunshine'] as const).map(name => {
          const colors = TEAM_COLORS[name];
          const memberTasks = tasks.filter(t => t.assignee === name);
          const done = memberTasks.filter(t => t.status === 'done').length;
          return (
            <button
              key={name}
              onClick={() => setFilterAssignee(filterAssignee === name ? 'all' : name)}
              className={`rounded-xl border p-4 text-left transition-all ${
                filterAssignee === name
                  ? `${colors.bg} ${colors.border} ring-2 ring-offset-1 ring-current`
                  : `${colors.bg} ${colors.border} hover:shadow-md`
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                <span className={`font-display font-semibold text-sm ${colors.text}`}>{name}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${colors.text}`}>{done}</span>
                <span className="text-xs text-muted-foreground">/ {memberTasks.length} done</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Status Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'todo', 'in-progress', 'done', 'blocked'] as const).map(status => {
          const isActive = filterStatus === status;
          const count = status === 'all' ? tasks.length : countByStatus(status);
          const config = status !== 'all' ? STATUS_CONFIG[status] : null;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(isActive ? 'all' : status)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                isActive
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {config && <config.icon className="w-3 h-3" />}
              {status === 'all' ? 'All' : config?.label}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            No tasks match the current filters.
          </div>
        )}
        {filtered.map(task => {
          const StatusIcon = STATUS_CONFIG[task.status].icon;
          const statusColor = STATUS_CONFIG[task.status].color;
          const colors = TEAM_COLORS[task.assignee];
          const isExpanded = expandedTask === task.id;
          return (
            <div
              key={task.id}
              className={`rounded-lg border ${colors.border} bg-card transition-all hover:shadow-sm`}
            >
              <div className="flex items-center gap-3 p-4">
                {/* Clickable status icon to cycle */}
                <button
                  onClick={() => cycleStatus(task.id)}
                  title={`Status: ${STATUS_CONFIG[task.status].label} (click to change)`}
                  className="flex-shrink-0 hover:scale-110 transition-transform"
                >
                  <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {task.assignee}
                    </span>
                    {task.dueDate && (
                      <span className="text-[11px] text-muted-foreground">
                        Due {task.dueDate}
                      </span>
                    )}
                    {task.priority === 'high' && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-medium">
                        High
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-muted-foreground/40 hover:text-red-500 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Edit Panel */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-0 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Title</label>
                      <input
                        type="text" value={task.title}
                        onChange={e => updateField(task.id, 'title', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Assignee</label>
                      <select
                        value={task.assignee}
                        onChange={e => updateField(task.id, 'assignee', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-border bg-background text-xs"
                      >
                        <option value="Monny">Monny</option>
                        <option value="Bingle">Bingle</option>
                        <option value="Sunshine">Sunshine</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Priority</label>
                      <select
                        value={task.priority}
                        onChange={e => updateField(task.id, 'priority', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-border bg-background text-xs"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Due Date</label>
                      <input
                        type="date" value={task.dueDate || ''}
                        onChange={e => updateField(task.id, 'dueDate', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-border bg-background text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Notes</label>
                    <textarea
                      value={task.notes || ''}
                      onChange={e => updateField(task.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
                      rows={2}
                      className="w-full px-2 py-1 rounded border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-[11px] text-muted-foreground/60 text-center pt-2" style={{ fontFamily: 'var(--font-body)' }}>
        Auto-saved to cloud. Shared across all team members.
      </p>
    </section>
  );
}
