/*
 * Create Well Dashboard — Home Page
 * Design: Desert Dusk Command — Southwestern Minimalism meets Dashboard Precision
 * Content: Guest Experience Journey from Sunshine's POV video
 */
import { useState, useRef, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { GeyserOverviewSection } from '@/components/sections/GeyserOverview';
import GuestJourney from '@/components/sections/GuestJourney';
import ActivationStationsDetail from '@/components/sections/ActivationStationsDetail';
import { GoogleCalendarSection } from '@/components/sections/GoogleCalendarSection';
import { TeamTasksSection } from '@/components/sections/TeamTasksSection';
import { OpenForumSection } from '@/components/sections/OpenForumSection';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: 'overview', label: 'At a Glance', component: GeyserOverviewSection },
  { id: 'journey', label: 'Guest Journey', component: GuestJourney },
  { id: 'stations', label: 'Activation Stations', component: ActivationStationsDetail },
  { id: 'calendar', label: 'Team Calendar', component: GoogleCalendarSection },
  { id: 'tasks', label: 'Team Tasks', component: TeamTasksSection },
  { id: 'forum', label: 'Open Forum', component: OpenForumSection },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeSection={activeSection} onSectionChange={scrollToSection} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar text-sidebar-foreground px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">⛲</span>
          <span className="font-display text-sm font-semibold">CREATE WELL</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-sidebar/95 backdrop-blur-sm pt-14">
          <nav className="p-4 space-y-1">
            {sections.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="md:ml-16 lg:ml-56 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-16">
          {sections.map(({ id, label, component: Component }) => (
            <div
              key={id}
              id={id}
              ref={el => { sectionRefs.current[id] = el; }}
              className="scroll-mt-16 md:scroll-mt-8"
            >
              <Component />
            </div>
          ))}

          {/* Footer */}
          <footer className="border-t border-border pt-8 pb-12 text-center">
            <p className="font-display text-lg text-muted-foreground">
              ⛲ The Well is tended.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2" style={{ fontFamily: "var(--font-body)" }}>
              Create Well Dashboard · Guest Experience Design · 2026
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
