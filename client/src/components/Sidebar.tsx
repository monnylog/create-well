import {
  LayoutDashboard, Clock, Zap, Droplets, Film, CalendarDays, Users, MessageCircle
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'overview', label: 'At a Glance', icon: LayoutDashboard },
  { id: 'journey', label: 'Guest Journey', icon: Clock },
  { id: 'calendar', label: 'Team Calendar', icon: CalendarDays },
  { id: 'tasks', label: 'Team Tasks', icon: Users },
  { id: 'stations', label: 'Activation Stations', icon: Zap },
  { id: 'forum', label: 'Open Forum', icon: MessageCircle },
  { id: 'nebula', label: 'Nebula Integration', icon: Film },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 lg:w-56 bg-sidebar text-sidebar-foreground flex flex-col z-50 transition-all duration-300">
      {/* Logo area */}
      <div className="p-3 lg:p-4 flex items-center gap-2 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-lg bg-terracotta/20 flex items-center justify-center flex-shrink-0">
          <Droplets className="w-5 h-5 text-terracotta" />
        </div>
        <div className="hidden lg:block">
          <p className="font-display text-sm font-semibold text-sidebar-foreground leading-tight">CREATE WELL</p>
          <p className="text-[10px] text-sidebar-foreground/60 tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>Guest Experience</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group
                ${isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-terracotta' : 'text-sidebar-foreground/50'}`} />
              <span className="hidden lg:inline font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 lg:p-4 border-t border-sidebar-border">
        <div className="hidden lg:block text-[10px] text-sidebar-foreground/40 uppercase tracking-wider" style={{ fontFamily: "var(--font-body)" }}>
          Create Well 2026
        </div>
      </div>
    </aside>
  );
}
