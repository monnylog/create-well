import { stations } from '@/lib/data';
import { StatusBadge, CategoryBadge } from '@/components/StatusBadge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const stationEmoji: Record<string, string> = {
  'notes-well': '🖊️',
  'painting': '🎨',
  'word-bank': '📖',
  'human-design': '🔮',
  'somatic': '🧘',
  'body-flow': '💃',
  'live-podcast': '🎙️',
  'choir': '🎵',
  'closing-activity': '🎉',
};

export function ActivationStationsSection() {
  const [openStations, setOpenStations] = useState<Set<string>>(new Set());

  const toggleStation = (id: string) => {
    setOpenStations(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Activation Stations</h2>
        <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
          Each station is a "well experience" — ambient, low-pressure, conversation-starting
        </p>
      </div>

      {/* Station summary bar */}
      <div className="flex flex-wrap gap-2">
        {['Locked', 'Planning', 'Idea'].map(status => {
          const count = stations.filter(s => s.status === status).length;
          if (count === 0) return null;
          return (
            <div key={status} className="flex items-center gap-1.5">
              <StatusBadge status={status} />
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>({count})</span>
            </div>
          );
        })}
      </div>

      {/* Station Cards */}
      <div className="grid gap-3">
        {stations.map(station => (
          <Collapsible key={station.id} open={openStations.has(station.id)} onOpenChange={() => toggleStation(station.id)}>
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-4 p-4">
                  <span className="text-xl flex-shrink-0">{stationEmoji[station.id] || '⛲'}</span>
                  <div className="flex-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-foreground">{station.name}</h3>
                      <CategoryBadge category={station.category} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                      {station.lead} &middot; {station.type} &middot; {station.timing}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={station.status} />
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openStations.has(station.id) ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-4 pb-4 pt-0 border-t border-border/50">
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>Format</p>
                      <p className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{station.format || 'TBD'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>Setup Needs</p>
                      <p className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{station.setupNeeds || 'TBD'}</p>
                    </div>
                    {station.coordinationNotes && (
                      <div className="md:col-span-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)" }}>Coordination Notes</p>
                        <p className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{station.coordinationNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </section>
  );
}
