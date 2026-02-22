import { getStatusColor } from '@/lib/data';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const colors = getStatusColor(status);
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span className={`inline-flex items-center rounded-full border font-body font-medium ${colors} ${sizeClasses}`}
      style={{ fontFamily: "var(--font-body)" }}>
      {status}
    </span>
  );
}

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const colorMap: Record<string, string> = {
    'Create': 'bg-terracotta/15 text-terracotta',
    'Play!': 'bg-amber-100 text-amber-800',
    'Dive': 'bg-purple-100 text-purple-800',
    'Ground': 'bg-sage/15 text-sage',
    'Express': 'bg-rose-100 text-rose-800',
    'Connect': 'bg-orange-100 text-orange-800',
  };

  return (
    <span className={`inline-flex items-center rounded-full text-xs px-2 py-0.5 font-medium ${colorMap[category] || 'bg-muted text-muted-foreground'}`}
      style={{ fontFamily: "var(--font-body)" }}>
      {category}
    </span>
  );
}

interface OwnerBadgeProps {
  owner: string;
}

export function OwnerBadge({ owner }: OwnerBadgeProps) {
  const getInitial = (name: string) => {
    if (name.includes('Sunshine')) return 'S';
    if (name.includes('Bingle')) return 'B';
    if (name.includes('Monny')) return 'M';
    if (name.includes('CR8W')) return 'C';
    return name[0] || '?';
  };

  const getColor = (name: string) => {
    if (name.includes('Sunshine')) return 'bg-terracotta/20 text-terracotta border-terracotta/30';
    if (name.includes('Bingle')) return 'bg-plum/15 text-plum border-plum/25';
    if (name.includes('Monny')) return 'bg-sage/15 text-sage border-sage/25';
    if (name.includes('CR8W')) return 'bg-umber/10 text-umber border-umber/20';
    return 'bg-muted text-muted-foreground border-border';
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full text-xs px-2 py-0.5 border font-medium ${getColor(owner)}`}
      style={{ fontFamily: "var(--font-body)" }}>
      <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] font-bold">
        {getInitial(owner)}
      </span>
      {owner}
    </span>
  );
}
