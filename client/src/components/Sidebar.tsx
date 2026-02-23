import { Link, useLocation } from 'wouter';
import {
  Droplets,
  Home,
  Clock,
  Zap,
  MessageCircle,
  CalendarDays,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/journey', label: 'Guest Journey', icon: Clock },
  { href: '/stations', label: 'Activation Stations', icon: Zap },
  { href: '/calendar', label: 'Team Calendar', icon: CalendarDays },
  { href: '/tasks', label: 'Team Tasks', icon: Users },
  { href: '/forum', label: 'Open Forum', icon: MessageCircle },
];

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-[60] lg:hidden w-10 h-10 rounded-lg bg-sidebar flex items-center justify-center text-sidebar-foreground shadow-lg"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col z-50 transition-all duration-300 border-r border-sidebar-border ${
          collapsed ? 'w-16' : 'w-56'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo area */}
        <div className="p-3 lg:p-4 flex items-center gap-2 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-lg bg-terracotta/20 flex items-center justify-center flex-shrink-0">
            <Droplets className="w-5 h-5 text-terracotta" />
          </div>
          {!collapsed && (
            <div className="hidden lg:block">
              <p className="font-display text-sm font-semibold text-sidebar-foreground leading-tight">CREATE WELL</p>
              <p className="text-[10px] text-sidebar-foreground/60 tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>Guest Experience</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-terracotta/15 text-terracotta font-semibold'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? 'text-terracotta' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70'
                  }`} />
                  {!collapsed && (
                    <span className="hidden lg:inline truncate" style={{ fontFamily: 'var(--font-body)' }}>
                      {item.label}
                    </span>
                  )}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle - desktop only */}
        <div className="hidden lg:flex p-3 border-t border-sidebar-border justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 rounded-md flex items-center justify-center text-sidebar-foreground/40 hover:text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Footer */}
        <div className={`p-3 border-t border-sidebar-border text-center ${collapsed ? 'hidden' : ''}`}>
          <p className="text-[10px] text-sidebar-foreground/40" style={{ fontFamily: 'var(--font-body)' }}>
                        ⛲ The Well is tended.
          </p>
        </div>
      </aside>
    </>
  );
}
