import { deliverables } from '@/lib/data';
import { StatusBadge, OwnerBadge } from '@/components/StatusBadge';
import { AlertTriangle, Filter } from 'lucide-react';
import { useState } from 'react';

type FilterOwner = 'All' | 'Sunshine' | 'Bingle' | 'Monny';

export function MasterDeliverablesSection() {
  const [filterOwner, setFilterOwner] = useState<FilterOwner>('All');

  const filtered = filterOwner === 'All'
    ? deliverables
    : deliverables.filter(d => d.owner.toLowerCase().includes(filterOwner.toLowerCase()));

  const ownerFilters: FilterOwner[] = ['All', 'Sunshine', 'Bingle', 'Monny'];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Master Deliverables & Countdown</h2>
        <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
          The critical path to April 15 — what must get done, by when, and who owns it
        </p>
      </div>

      {/* Owner Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {ownerFilters.map(owner => (
          <button
            key={owner}
            onClick={() => setFilterOwner(owner)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
              filterOwner === owner
                ? 'bg-terracotta text-white border-terracotta'
                : 'bg-card text-muted-foreground border-border hover:border-terracotta/40'
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {owner}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2" style={{ fontFamily: "var(--font-body)" }}>
          {filtered.length} deliverable{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Deliverables List */}
      <div className="space-y-2">
        {filtered.map(d => (
          <div
            key={d.id}
            className={`bg-card rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow duration-200 ${
              d.status === 'FLAGGED' ? 'border-red-300 bg-red-50/30' :
              d.blocking ? 'border-amber-300/50' : 'border-border'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Blocking indicator */}
              {d.blocking && d.status !== 'Done' && (
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${d.status === 'FLAGGED' ? 'text-red-500' : 'text-amber-500'}`} />
              )}

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                    {d.task}
                  </h4>
                  <StatusBadge status={d.status} />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <OwnerBadge owner={d.owner} />
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                    Due: {d.due}
                  </span>
                  {d.blocking && (
                    <span className="text-xs text-amber-600 font-medium flex items-center gap-1" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Blocking
                    </span>
                  )}
                </div>

                {d.notes && (
                  <p className="text-xs text-muted-foreground mt-2 italic" style={{ fontFamily: "var(--font-body)" }}>
                    {d.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary by status */}
      <div className="bg-cream/50 rounded-xl border border-border p-4">
        <h3 className="font-display text-base font-semibold mb-3">Status Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Flowing', 'Needs Clarity', 'Idea', 'Open', 'Not Started', 'FLAGGED'].map(status => {
            const count = deliverables.filter(d => d.status === status).length;
            if (count === 0) return null;
            return (
              <div key={status} className="flex items-center gap-2">
                <StatusBadge status={status} />
                <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
