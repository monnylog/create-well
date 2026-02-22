import { guests, geyserOverview } from '@/lib/data';
import { Users, UserPlus } from 'lucide-react';

const guestCategories = [
  'Creatives / Artists / Makers',
  'Wellness Community',
  'Cultural Community Builders',
  'Burnt-Out Corporate Creatives',
  'Shadow Artists',
  'Aligned Entrepreneurs',
  'Venue Partners',
];

const categoryEmoji: Record<string, string> = {
  'Creatives / Artists / Makers': '🎨',
  'Wellness Community': '🧘',
  'Cultural Community Builders': '🌍',
  'Burnt-Out Corporate Creatives': '💼',
  'Shadow Artists': '🌑',
  'Aligned Entrepreneurs': '🚀',
  'Venue Partners': '🏠',
};

export function GuestCurationSection() {
  const totalInvited = guests.filter(g => g.inviteStatus !== 'Not Yet').length;
  const confirmed = guests.filter(g => g.inviteStatus === "RSVP'd Yes").length;
  const remaining = geyserOverview.capacityMin - confirmed;

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Invite List & Guest Curation</h2>
        <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
          Curated invitees and pipeline guests for the launch
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center">
          <p className="text-2xl font-display font-bold text-terracotta">{totalInvited}</p>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Total Invited</p>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center">
          <p className="text-2xl font-display font-bold text-sage">{confirmed}</p>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Confirmed</p>
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 text-center">
          <p className="text-2xl font-display font-bold text-gold">{Math.max(0, remaining)}</p>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>Remaining to {geyserOverview.capacityMin}</p>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Guest Categories</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {guestCategories.map(cat => {
            const count = guests.filter(g => g.category === cat).length;
            return (
              <div key={cat} className="bg-card rounded-xl border border-border shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                <span className="text-xl">{categoryEmoji[cat] || '👤'}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground" style={{ fontFamily: "var(--font-body)" }}>{cat}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>{count} guest{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guest List */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-3">Guest List</h3>
        {guests.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
            <UserPlus className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
              No guests added yet. The 33 curated invitees from the Master Doc will appear here.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2" style={{ fontFamily: "var(--font-body)" }}>
              Each guest will have name, handle, category, connection, invite status, and VIP flag.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Guest table would go here */}
          </div>
        )}
      </div>
    </section>
  );
}
