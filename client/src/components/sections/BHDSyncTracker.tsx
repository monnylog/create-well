import { bhdSyncs, getUpcomingSyncs, getPastSyncs } from '@/lib/data';
import { StatusBadge } from '@/components/StatusBadge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Calendar, MapPin, Users, ExternalLink, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const WELL_TEXTURE = "https://private-us-east-1.manuscdn.com/sessionFile/nxMGea7pgW3xmsbDD1R7VJ/sandbox/sjyNPk13WJTYw0qFVZyewV-img-2_1771799302000_na1fn_Z2V5c2VyLXdlbGwtdGV4dHVyZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbnhNR2VhN3BnVzN4bXNiREQxUjdWSi9zYW5kYm94L3NqeU5QazEzV0pUWXcwcUZWWnlld1YtaW1nLTJfMTc3MTc5OTMwMjAwMF9uYTFmbl9aMlY1YzJWeUxYZGxiR3d0ZEdWNGRIVnlaUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IWZzj90QTym-uv9aXRQk96OaodySaPubV15jc85tuS9jIRZpZZC2LUJ3BeC1K9maMGTyQtOBcMGv4JQ9bdTYa51FVC9YU-os07EaS4b-fu7WHrQFEdeP26R37DJpCZyzF-A7kqkOfORYjCHBNFZhBcRONmCM6HBiATZHXCbBb70hq3KXPP01Lhej5qKxmMld7Pd4d3NwcvbYCPyeqBOUf52d0Dl4D4sYe7BruBoeB4VxH3mDwvXY6QBj5oaHpBp9OBUIl~v-DFEm~Pb9Zm5S9VUfDFIYNH~kUoEMVG1S481VI9fPw0aAgtmu2QTDBsyAyka4n0dlsKSX4SjMqEiheg__";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function isUpcoming(dateStr: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return dateStr >= today;
}

export function BHDSyncTrackerSection() {
  const [openSyncs, setOpenSyncs] = useState<Set<string>>(new Set());
  const upcoming = getUpcomingSyncs();
  const past = getPastSyncs();

  const toggleSync = (id: string) => {
    setOpenSyncs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="space-y-6">
      {/* Section Header with texture */}
      <div className="relative rounded-xl overflow-hidden h-24">
        <img src={WELL_TEXTURE} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        <div className="relative z-10 h-full flex items-center px-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">BHD Sync Tracker</h2>
            <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
              Business Hoe Development syncs — from Google Calendar
            </p>
          </div>
        </div>
      </div>

      {/* BHD Format Reference */}
      <div className="bg-cream/50 rounded-xl border border-border p-5">
        <h3 className="font-display text-base font-semibold text-foreground mb-2">BHD Sync Format</h3>
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/80" style={{ fontFamily: "var(--font-body)" }}>
          <div className="flex items-start gap-2">
            <span className="text-terracotta">1.</span>
            <span>"How are you arriving?" — individuwell check-in</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-terracotta">2.</span>
            <span>What's filling your well / what drops do you need?</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-terracotta">3.</span>
            <span>Project-specific updates (Bingle / Sunshine tracks)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-terracotta">4.</span>
            <span>Momentum items (open buckets)</span>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <span className="text-terracotta">5.</span>
            <span>Closing: "Is the water still murky anywhere?"</span>
          </div>
        </div>
      </div>

      {/* Upcoming Syncs */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            Upcoming
          </h3>
          <div className="space-y-3">
            {upcoming.map(sync => (
              <SyncCard key={sync.id} sync={sync} isOpen={openSyncs.has(sync.id)} onToggle={() => toggleSync(sync.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Past Syncs */}
      {past.length > 0 && (
        <div>
          <h3 className="font-display text-lg font-semibold mb-3 text-muted-foreground">Past Syncs</h3>
          <div className="space-y-3">
            {past.map(sync => (
              <SyncCard key={sync.id} sync={sync} isOpen={openSyncs.has(sync.id)} onToggle={() => toggleSync(sync.id)} isPast />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

interface SyncCardProps {
  sync: typeof bhdSyncs[0];
  isOpen: boolean;
  onToggle: () => void;
  isPast?: boolean;
}

function SyncCard({ sync, isOpen, onToggle, isPast }: SyncCardProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className={`bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 ${isPast ? 'border-border/60 opacity-90' : 'border-terracotta/20'}`}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center gap-4 p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isPast ? 'bg-muted' : 'bg-terracotta/10'}`}>
              <Calendar className={`w-5 h-5 ${isPast ? 'text-muted-foreground' : 'text-terracotta'}`} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-display text-base font-semibold text-foreground">{sync.title}</h4>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                  {formatDate(sync.date)}
                </span>
                <span className="text-xs text-border">|</span>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                  {sync.format}
                </span>
                {sync.murkyWater && (
                  <span className="flex items-center gap-1 text-xs text-amber-600">
                    <AlertCircle className="w-3 h-3" /> Murky water
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isPast && <StatusBadge status="Flowing" />}
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-0 border-t border-border/50">
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {/* Attendees */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-body)" }}>
                  <Users className="w-3 h-3 inline mr-1" />Attendees
                </p>
                <div className="flex flex-wrap gap-1">
                  {sync.attendees.map(a => (
                    <span key={a} className="text-xs bg-muted px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-body)" }}>{a}</span>
                  ))}
                </div>
              </div>

              {/* Location */}
              {sync.location && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-body)" }}>
                    <MapPin className="w-3 h-3 inline mr-1" />Location
                  </p>
                  <p className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>{sync.location}</p>
                </div>
              )}

              {/* Momentum Items */}
              {sync.momentumItems.length > 0 && (
                <div className="md:col-span-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-body)" }}>
                    Momentum Items
                  </p>
                  <ul className="space-y-1">
                    {sync.momentumItems.map((item, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="text-terracotta mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buckets Opened */}
              {sync.bucketsOpened.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-body)" }}>
                    Buckets Opened
                  </p>
                  <ul className="space-y-1">
                    {sync.bucketsOpened.map((item, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="text-gold mt-1">◦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buckets Closed */}
              {sync.bucketsClosed.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-body)" }}>
                    Buckets Closed
                  </p>
                  <ul className="space-y-1">
                    {sync.bucketsClosed.map((item, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="text-sage mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              {sync.description && (
                <div className="md:col-span-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-body)" }}>
                    From the Well
                  </p>
                  <p className="text-sm text-foreground/80 italic" style={{ fontFamily: "var(--font-body)" }}>{sync.description}</p>
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
