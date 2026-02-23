import { useState } from 'react';
import { Users, CheckCircle2, Circle, Clock, AlertCircle, Plus, ChevronDown, ChevronUp } from 'lucide-react';

/*
 * Team Tasks Section — Monny, Bingle & Sunshine
 * Tracks task assignments, status, and priorities
 * Design: Desert Dusk Command
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

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Finalize guest welcome packet design', assignee: 'Sunshine', status: 'in-progress', priority: 'high', dueDate: '2026-01-20', notes: 'Awaiting final copy from Monny' },
  { id: '2', title: 'Review activation station signage proofs', assignee: 'Bingle', status: 'todo', priority: 'high', dueDate: '2026-01-18' },
  { id: '3', title: 'Coordinate catering timeline with venue', assignee: 'Monny', status: 'in-progress', priority: 'medium', dueDate: '2026-01-22' },
  { id: '4', title: 'Set up registration check-in tablets', assignee: 'Bingle', status: 'todo', priority: 'medium', dueDate: '2026-01-25' },
  { id: '5', title: 'Draft social media post schedule', assignee: 'Sunshine', status: 'done', priority: 'low' },
  { id: '6', title: 'Confirm AV equipment delivery window', assignee: 'Monny', status: 'blocked', priority: 'high', dueDate: '2026-01-17', notes: 'Vendor not responding — follow up needed' },
  { id: '7', title: 'Create run-of-show document', assignee: 'Monny', status: 'todo', priority: 'high', dueDate: '2026-01-21' },
  { id: '8', title: 'Test nebula projection mapping sequence', assignee: 'Bingle', status: 'in-progress', priority: 'medium', dueDate: '2026-01-23' },
  { id: '9', title: 'Prepare team debrief template', assignee: 'Sunshine', status: 'todo', priority: 'low', dueDate: '2026-01-28' },
];

export function TeamTasksSection() {
  const [tasks] = useState<Task[]>(INITIAL_TASKS);
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const filtered = tasks.filter(t => {
    if (filterAssignee !== 'all' && t.assignee !== filterAssignee) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const countByAssignee = (name: string) => tasks.filter(t => t.assignee === name).length;
  const countByStatus = (status: string) => tasks.filter(t => t.status === status).length;

  return (
    <section className="space-y-6">
      {/* Header */}
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
      </div>

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
              <button
                onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <StatusIcon className={`w-5 h-5 flex-shrink-0 ${statusColor}`} />
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
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {isExpanded && task.notes && (
                <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-0">
                  <p className="text-xs text-muted-foreground mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                    {task.notes}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-muted-foreground/60 text-center pt-2" style={{ fontFamily: 'var(--font-body)' }}>
        Task data is local to this session. Connect to a shared backend for persistent team collaboration.
      </p>
    </section>
  );
}
