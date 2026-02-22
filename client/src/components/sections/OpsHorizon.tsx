/*
 * Ops Horizon — Sunshine at Sea Contingency
 * Design: Desert Dusk Command
 * Internal BHD document, mapped as a visual timeline with risk matrix
 */

import { opsHorizon, opsPhases, opsRisks, opsNextSteps } from '@/lib/data';
import { StatusBadge, OwnerBadge } from '@/components/StatusBadge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Ship, Anchor, Compass, Sunrise, AlertTriangle, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';

const phaseIcons: Record<string, typeof Ship> = {
  'phase-0': Anchor,
  'phase-1': Star,
  'phase-2': Ship,
  'phase-3': Sunrise,
};

const phaseAccents: Record<string, string> = {
  'phase-0': 'border-terracotta/30 bg-terracotta/5',
  'phase-1': 'border-gold/30 bg-gold/5',
  'phase-2': 'border-sage/30 bg-sage/5',
  'phase-3': 'border-plum/30 bg-plum/5',
};

const severityColors: Record<string, string> = {
  high: 'bg-red-50 border-red-200 text-red-800',
  medium: 'bg-amber-50 border-amber-200 text-amber-800',
  low: 'bg-sage/10 border-sage/20 text-sage',
};

export function OpsHorizonSection() {
  const [openPhases, setOpenPhases] = useState<Set<string>>(new Set(['phase-0']));

  const togglePhase = (id: string) => {
    setOpenPhases(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = opsPhases.reduce((sum, p) => sum + p.items.length, 0);
  const criticalItems = opsPhases.reduce((sum, p) => sum + p.items.filter(i => i.critical).length, 0);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-umber/90 to-umber/70 p-6 md:p-8">
        <div className="absolute top-4 right-4 opacity-10">
          <Ship className="w-24 h-24 text-cream" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-5 h-5 text-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium" style={{ fontFamily: "var(--font-body)" }}>
              Internal BHD Document
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream">
            Ops Horizon: What If Sunshine Is at Sea?
          </h2>
          <p className="text-cream/70 text-sm mt-2 max-w-2xl" style={{ fontFamily: "var(--font-body)" }}>
            {opsHorizon.context}
          </p>
        </div>
      </div>

      {/* Thesis Quote */}
      <div className="bg-cream rounded-lg px-6 py-4 border-l-4 border-sage">
        <p className="font-display text-lg md:text-xl italic text-umber/80">
          "{opsHorizon.thesis}"
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center">
          <p className="text-2xl font-display font-bold text-terracotta">{opsPhases.length}</p>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Phases</p>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center">
          <p className="text-2xl font-display font-bold text-sage">{totalItems}</p>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Total Items</p>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center">
          <p className="text-2xl font-display font-bold text-gold">{criticalItems}</p>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Critical Path</p>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="space-y-4">
        {opsPhases.map(phase => {
          const Icon = phaseIcons[phase.id] || Compass;
          const accent = phaseAccents[phase.id] || '';
          const isOpen = openPhases.has(phase.id);

          return (
            <Collapsible key={phase.id} open={isOpen} onOpenChange={() => togglePhase(phase.id)}>
              <div className={`rounded-xl border shadow-sm overflow-hidden ${accent}`}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-4 p-5">
                    <div className="w-10 h-10 rounded-lg bg-background/80 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-display text-lg font-bold text-foreground">{phase.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                        {phase.timeframe} &middot; {phase.items.length} items &middot; {phase.items.filter(i => i.critical).length} critical
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={phase.status} />
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-5 pb-5 pt-0 border-t border-border/30">
                    {/* Phase summary */}
                    <p className="text-sm text-foreground/80 mt-4 mb-4 italic" style={{ fontFamily: "var(--font-body)" }}>
                      {phase.summary}
                    </p>

                    {/* Group items by category */}
                    {(() => {
                      const categories = Array.from(new Set(phase.items.map(i => i.category)));
                      return categories.map(cat => (
                        <div key={cat} className="mb-4 last:mb-0">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-body)" }}>
                            {cat}
                          </p>
                          <div className="space-y-2">
                            {phase.items.filter(i => i.category === cat).map(item => (
                              <div key={item.id} className={`bg-background/60 rounded-lg p-3 border ${item.critical ? 'border-terracotta/20' : 'border-border/50'}`}>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      {item.critical && <span className="text-terracotta text-xs">●</span>}
                                      <p className="text-sm font-medium text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                                        {item.task}
                                      </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                      <OwnerBadge owner={item.owner} />
                                      {item.notes && (
                                        <span className="text-xs text-muted-foreground italic" style={{ fontFamily: "var(--font-body)" }}>
                                          {item.notes}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <StatusBadge status={item.status} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>

      {/* Risk Matrix */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Honest Risks
        </h3>
        <div className="space-y-2">
          {opsRisks.map(risk => (
            <div key={risk.id} className={`rounded-xl border p-4 ${severityColors[risk.severity]}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{risk.risk}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ArrowRight className="w-3 h-3 opacity-50" />
                    <p className="text-xs opacity-80" style={{ fontFamily: "var(--font-body)" }}>{risk.mitigation}</p>
                  </div>
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${
                  risk.severity === 'high' ? 'bg-red-200/50' :
                  risk.severity === 'medium' ? 'bg-amber-200/50' : 'bg-sage/20'
                }`} style={{ fontFamily: "var(--font-body)" }}>
                  {risk.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps for Feb 25 BHD */}
      <div className="bg-cream/50 rounded-xl border border-border p-5">
        <h3 className="font-display text-base font-semibold mb-3">Next Steps (Before Feb 25 BHD)</h3>
        <div className="space-y-2">
          {opsNextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{step.task}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Due: {step.due}</span>
                  <span className="text-xs text-border">|</span>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{step.owner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Beautiful Version */}
      <div className="bg-gradient-to-r from-sage/10 to-gold/10 rounded-xl border border-sage/20 p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">The Beautiful Version of This</h3>
        <p className="text-sm text-foreground/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Sunshine goes to sea. She performs. She lives the thing CR8W preaches: creativity as a living practice, not just a brand. She posts "Notes from the Sea." The CR8W community holds each other. Monny runs the engine. Bingle documents the whole arc.
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed mt-2" style={{ fontFamily: "var(--font-body)" }}>
          And when she comes back, Create Well has proven it's bigger than one person.
        </p>
        <p className="text-sm font-medium text-sage mt-3" style={{ fontFamily: "var(--font-body)" }}>
          That's not a problem. That's the proof of concept.
        </p>
      </div>

      {/* Footer note */}
      <p className="text-[10px] text-muted-foreground/50 text-center italic" style={{ fontFamily: "var(--font-body)" }}>
        Written by Monny, ops tinkiewinkie side, February 22, 2026 &middot; For internal BHD eyes only until Sunshine says otherwise
      </p>
    </section>
  );
}
