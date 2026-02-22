import { geyserOverview, sponsorTiers, sponsors } from '@/lib/data';
import { DollarSign, Target, TrendingUp } from 'lucide-react';

export function SponsorshipTrackerSection() {
  const overview = geyserOverview;
  const confirmed = sponsors.filter(s => s.status === 'Closed').reduce((sum, s) => sum + s.amount, 0);
  const inConvo = sponsors.filter(s => ['In Conversation', 'Pitch Sent', 'Verbal Yes'].includes(s.status)).reduce((sum, s) => sum + s.amount, 0);
  const remaining = overview.revenueTarget - confirmed;
  const progressPct = Math.min(100, (confirmed / overview.revenueTarget) * 100);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Sponsorship Tracker</h2>
        <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
          Revenue pipeline from first contact to closed
        </p>
      </div>

      {/* Revenue Overview */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-terracotta" />
          <h3 className="font-display text-lg font-semibold">Revenue Goal: ${overview.revenueTarget.toLocaleString()}</h3>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
          <div className="h-full bg-gradient-to-r from-terracotta to-gold rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-display font-bold text-sage">${confirmed.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Confirmed</p>
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-gold">${inConvo.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>In Conversation</p>
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-terracotta">${remaining.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Remaining</p>
          </div>
        </div>
      </div>

      {/* Tier Cards */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Sponsorship Tiers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sponsorTiers.map(tier => (
            <div key={tier.name} className="bg-card rounded-xl border border-border shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <DollarSign className="w-4 h-4 text-terracotta/60" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 bg-muted rounded-full" style={{ fontFamily: "var(--font-body)" }}>
                  {tier.limit}
                </span>
              </div>
              <h4 className="font-display text-base font-semibold text-foreground">{tier.name}</h4>
              <p className="text-sm text-terracotta font-medium mt-1" style={{ fontFamily: "var(--font-body)" }}>{tier.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsor Pipeline */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Pipeline</h3>
        {sponsors.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
            <TrendingUp className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
              No sponsors added yet. Add your first sponsor to start tracking the pipeline.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2" style={{ fontFamily: "var(--font-body)" }}>
              Sponsors will appear here as rows with status tracking from Idea to Closed.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Table would go here when sponsors are added */}
          </div>
        )}
      </div>
    </section>
  );
}
