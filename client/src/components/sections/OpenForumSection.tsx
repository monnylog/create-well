import { useState } from 'react';
import { MessageCircle, Send, User, Clock, Pin, ChevronDown, ChevronUp, Tag } from 'lucide-react';

/*
 * Open Forum Section — Monny, Bingle & Sunshine
 * Ongoing questions, discussion threads & meeting prep notes
 * Design: Desert Dusk Command
 */

interface ForumThread {
  id: string;
  title: string;
  author: 'Monny' | 'Bingle' | 'Sunshine';
  timestamp: string;
  category: 'question' | 'idea' | 'decision' | 'followup';
  pinned: boolean;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: 'Monny' | 'Bingle' | 'Sunshine';
  content: string;
  timestamp: string;
}

const AUTHOR_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Monny: { bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-amber-500' },
  Bingle: { bg: 'bg-sky-50', text: 'text-sky-800', dot: 'bg-sky-500' },
  Sunshine: { bg: 'bg-rose-50', text: 'text-rose-800', dot: 'bg-rose-400' },
};

const CATEGORY_CONFIG = {
  question: { label: 'Question', color: 'bg-violet-100 text-violet-700' },
  idea: { label: 'Idea', color: 'bg-emerald-100 text-emerald-700' },
  decision: { label: 'Decision Needed', color: 'bg-orange-100 text-orange-700' },
  followup: { label: 'Follow-up', color: 'bg-blue-100 text-blue-700' },
};

const INITIAL_THREADS: ForumThread[] = [
  {
    id: '1',
    title: 'Should we add a second water station near the east entrance?',
    author: 'Sunshine',
    timestamp: '2026-01-15 10:30 AM',
    category: 'question',
    pinned: true,
    replies: [
      { id: '1a', author: 'Bingle', content: 'I think so — foot traffic modeling shows that side gets 40% of arrivals.', timestamp: '2026-01-15 11:15 AM' },
      { id: '1b', author: 'Monny', content: 'Agreed. Let\'s confirm with the venue that we have power access on that side.', timestamp: '2026-01-15 2:00 PM' },
    ],
  },
  {
    id: '2',
    title: 'Idea: Live mural station as a guest engagement activation',
    author: 'Bingle',
    timestamp: '2026-01-14 3:45 PM',
    category: 'idea',
    pinned: false,
    replies: [
      { id: '2a', author: 'Sunshine', content: 'Love this. We could tie it into the nebula theme with UV-reactive paint.', timestamp: '2026-01-14 4:20 PM' },
    ],
  },
  {
    id: '3',
    title: 'Final call on catering vendor — need decision by Friday',
    author: 'Monny',
    timestamp: '2026-01-13 9:00 AM',
    category: 'decision',
    pinned: true,
    replies: [
      { id: '3a', author: 'Bingle', content: 'I\'ve reviewed both proposals. Desert Bloom Catering has better pricing and allergen accommodations.', timestamp: '2026-01-13 10:30 AM' },
      { id: '3b', author: 'Sunshine', content: 'Second that. Their sample menu was excellent. Let\'s lock it in.', timestamp: '2026-01-13 11:00 AM' },
      { id: '3c', author: 'Monny', content: 'Done — sending the signed contract today.', timestamp: '2026-01-13 1:00 PM' },
    ],
  },
  {
    id: '4',
    title: 'Follow-up: AV vendor still hasn\'t confirmed delivery time',
    author: 'Monny',
    timestamp: '2026-01-16 8:15 AM',
    category: 'followup',
    pinned: false,
    replies: [],
  },
  {
    id: '5',
    title: 'What\'s our rain contingency for the outdoor stations?',
    author: 'Sunshine',
    timestamp: '2026-01-12 2:00 PM',
    category: 'question',
    pinned: false,
    replies: [
      { id: '5a', author: 'Bingle', content: 'We have pop-up canopies reserved. Need to confirm tent dimensions with the venue.', timestamp: '2026-01-12 3:30 PM' },
    ],
  },
];

export function OpenForumSection() {
  const [threads] = useState<ForumThread[]>(INITIAL_THREADS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedThread, setExpandedThread] = useState<string | null>(null);

  const sortedThreads = [...threads].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const filtered = sortedThreads.filter(t => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    return true;
  });

  const totalReplies = threads.reduce((sum, t) => sum + t.replies.length, 0);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" />
          Open Forum
        </h2>
        <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: 'var(--font-body)' }}>
          Ongoing questions & discussions between Monny, Bingle & Sunshine
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Threads', value: threads.length },
          { label: 'Replies', value: totalReplies },
          { label: 'Pinned', value: threads.filter(t => t.pinned).length },
          { label: 'Unanswered', value: threads.filter(t => t.replies.length === 0).length },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'question', 'idea', 'decision', 'followup'] as const).map(cat => {
          const isActive = filterCategory === cat;
          const count = cat === 'all' ? threads.length : threads.filter(t => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(isActive ? 'all' : cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                isActive
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-foreground border-border hover:bg-muted'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {cat === 'all' ? 'All' : CATEGORY_CONFIG[cat].label}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Thread List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            No threads match the current filter.
          </div>
        )}
        {filtered.map(thread => {
          const isExpanded = expandedThread === thread.id;
          const authorColors = AUTHOR_COLORS[thread.author];
          const catConfig = CATEGORY_CONFIG[thread.category];
          return (
            <div key={thread.id} className="rounded-lg border border-border bg-card overflow-hidden">
              {/* Thread Header */}
              <button
                onClick={() => setExpandedThread(isExpanded ? null : thread.id)}
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    {thread.pinned && <Pin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${catConfig.color}`}>
                      {catConfig.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${authorColors.bg} ${authorColors.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${authorColors.dot}`} />
                      {thread.author}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug">{thread.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {thread.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> {thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}
                    </span>
                  </div>
                </div>
                {isExpanded
                  ? <ChevronUp className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                }
              </button>

              {/* Replies */}
              {isExpanded && (
                <div className="border-t border-border/50">
                  {thread.replies.length === 0 ? (
                    <p className="text-xs text-muted-foreground p-4 italic" style={{ fontFamily: 'var(--font-body)' }}>
                      No replies yet. This thread is waiting for input.
                    </p>
                  ) : (
                    <div className="divide-y divide-border/30">
                      {thread.replies.map(reply => {
                        const replyColors = AUTHOR_COLORS[reply.author];
                        return (
                          <div key={reply.id} className="px-4 py-3 flex gap-3">
                            <div className={`w-6 h-6 rounded-full ${replyColors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <User className={`w-3 h-3 ${replyColors.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-semibold ${replyColors.text}`}>{reply.author}</span>
                                <span className="text-[10px] text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-xs text-foreground/80 mt-1 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-muted-foreground/60 text-center pt-2" style={{ fontFamily: 'var(--font-body)' }}>
        Forum data is local to this session. Connect to a shared backend for persistent team discussions.
      </p>
    </section>
  );
}
