import { geyserOverview, getDaysUntilLaunch, getBlockingItems, getFlaggedItems, deliverables } from '@/lib/data';
import { StatusBadge } from '@/components/StatusBadge';
import { MapPin, Calendar, Clock, Users, Target, AlertTriangle, TrendingUp } from 'lucide-react';

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/nxMGea7pgW3xmsbDD1R7VJ/sandbox/sjyNPk13WJTYw0qFVZyewV-img-1_1771799298000_na1fn_Z2V5c2VyLWhlcm8tYmFubmVy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbnhNR2VhN3BnVzN4bXNiREQxUjdWSi9zYW5kYm94L3NqeU5QazEzV0pUWXcwcUZWWnlld1YtaW1nLTFfMTc3MTc5OTI5ODAwMF9uYTFmbl9aMlY1YzJWeUxXaGxjbTh0WW1GdWJtVnkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GKxU9OshFw-ETdDNTsjcgiNrdKCLRbJiwXezY75rO~LkTl~u-mIgx~aKk7LFjdakycteOGMDyq7DfCeuU6NxzC86341pQzpGT-5LN-7I7YuMEbxdegIZFXkU28tCDw3HKa9M3k3Q3cBfgNZ9y9G6uDwqrG8ICWVEIyeGGRmaq3etZWhYHZC~jV-WoOuWv8eJQsEsh~Qc57CVtU-vCYGywBoAU~bNA4k0ErLCrgtFtZAKMB70eAzvjeJxe0irKnJhrLLYdY~OopR8kay4VpcS3DoX8blrpxShFfFLQQ08NQ8KLEvW-1Rd~ZJv7hxLRZdFo~vr8~-PYodqkGh4mP~Mng__";

export function GeyserOverviewSection() {
  const daysLeft = getDaysUntilLaunch();
  const blocking = getBlockingItems();
  const flagged = getFlaggedItems();
  const overview = geyserOverview;
  const remaining = overview.revenueTarget - overview.sponsorshipConfirmed;
  const progressPct = Math.min(100, (overview.sponsorshipConfirmed / overview.revenueTarget) * 100);

  // Count deliverables by status
  const flowingCount = deliverables.filter(d => d.status === 'Flowing').length;
  const needsClarityCount = deliverables.filter(d => d.status === 'Needs Clarity' || d.status === 'Open' || d.status === 'Not Started').length;

  return (
    <section className="space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden h-56 md:h-64">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-umber/80 via-umber/50 to-transparent" />
        <div className="relative z-10 h-full flex items-center p-6 md:p-10">
          <div className="flex-1">
            <p className="text-cream/70 text-xs uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "var(--font-body)" }}>
              April 15, 2026
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight">
              {overview.eventName}
            </h1>
            <p className="text-cream/60 text-sm mt-2 max-w-md" style={{ fontFamily: "var(--font-body)" }}>
              Taverna Costera Rooftop &middot; {overview.timeRange}
            </p>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <div className="text-7xl font-display font-bold text-gold leading-none">
              {daysLeft}
            </div>
            <p className="text-cream/60 text-xs uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-body)" }}>
              days until launch
            </p>
          </div>
        </div>
      </div>

      {/* Pull Quote */}
      <div className="bg-cream rounded-lg px-6 py-4 border-l-4 border-terracotta">
        <p className="font-display text-lg md:text-xl italic text-umber/80">
          "{overview.pullQuote}"
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Countdown (mobile) */}
        <div className="md:hidden col-span-2 bg-card rounded-xl p-5 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "var(--font-body)" }}>Days Until Launch</p>
              <p className="font-display text-5xl font-bold text-terracotta mt-1">{daysLeft}</p>
            </div>
            <Calendar className="w-8 h-8 text-terracotta/30" />
          </div>
        </div>

        {/* Venue */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <MapPin className="w-4 h-4 text-terracotta/60" />
            <StatusBadge status={overview.venueStatus === 'Confirmed' ? 'Locked' : 'Needs Clarity'} />
          </div>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Venue</p>
          <p className="text-sm font-semibold text-foreground mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{overview.venue}</p>
        </div>

        {/* Capacity */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <Users className="w-4 h-4 text-sage/60" />
          </div>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Capacity</p>
          <p className="text-sm font-semibold text-foreground mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{overview.capacityMin}–{overview.capacityMax} guests</p>
          <p className="text-[10px] text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>Curated invite list</p>
        </div>

        {/* Revenue Target */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <Target className="w-4 h-4 text-gold/60" />
          </div>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Revenue Target</p>
          <p className="text-sm font-semibold text-foreground mt-0.5" style={{ fontFamily: "var(--font-body)" }}>${overview.revenueTarget.toLocaleString()}</p>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-terracotta rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
            ${overview.sponsorshipConfirmed.toLocaleString()} confirmed &middot; ${remaining.toLocaleString()} remaining
          </p>
        </div>

        {/* Deliverables Pulse */}
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <TrendingUp className="w-4 h-4 text-terracotta/60" />
          </div>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Deliverables</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-sm font-semibold text-sage" style={{ fontFamily: "var(--font-body)" }}>{flowingCount} flowing</span>
            <span className="text-xs text-muted-foreground">&middot;</span>
            <span className="text-sm font-semibold text-gold" style={{ fontFamily: "var(--font-body)" }}>{needsClarityCount} open</span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(blocking.length > 0 || flagged.length > 0) && (
        <div className="space-y-2">
          {flagged.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800" style={{ fontFamily: "var(--font-body)" }}>{item.task}</p>
                <p className="text-xs text-red-600" style={{ fontFamily: "var(--font-body)" }}>{item.notes}</p>
              </div>
              <StatusBadge status="FLAGGED" />
            </div>
          ))}
          {blocking.filter(b => b.status !== 'FLAGGED').map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800" style={{ fontFamily: "var(--font-body)" }}>Blocking: {item.task}</p>
                <p className="text-xs text-amber-600" style={{ fontFamily: "var(--font-body)" }}>Owner: {item.owner}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
