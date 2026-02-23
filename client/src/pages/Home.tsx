/*
 * Create Well Dashboard — Home
 * ADHD-friendly: Only what matters RIGHT NOW
 * Clean, breathable, supportive
 */
import { useState } from 'react';
import { Link } from 'wouter';
import { CalendarDays, CheckCircle2, Clock, MapPin, ChevronRight, Sparkles, Users, Zap, MessageCircle } from 'lucide-react';
import { geyserOverview, getDaysUntilLaunch } from '@/lib/data';
import { GoogleCalendarSection } from '@/components/sections/GoogleCalendarSection';
import { TeamTasksSection } from '@/components/sections/TeamTasksSection';

const detailPages = [
  { href: '/journey', label: 'Guest Journey', icon: Clock, description: 'The evening flow, step by step' },
  { href: '/stations', label: 'Activation Stations', icon: Zap, description: 'Every station, every detail' },
  { href: '/forum', label: 'Open Forum', icon: MessageCircle, description: 'Team threads & decisions' },
];

export default function Home() {
  const daysLeft = getDaysUntilLaunch();
  const overview = geyserOverview;

  return (
    <div className="lg:ml-56 min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-6 md:pt-8 pb-16">

        {/* === BREATHING ROOM HEADER === */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-terracotta/60" />
            <span className="text-xs font-semibold tracking-[0.2em] text-terracotta/60 uppercase" style={{ fontFamily: 'var(--font-body)' }}>Create Well Dashboard</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">Good morning \u2728</h1>
          <p className="text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            {daysLeft} days until CR8W Hard Launch \u00B7 {overview.venue} \u00B7 {overview.eventTime}
          </p>
        </div>

        {/* === COUNTDOWN CARD === */}
        <div className="rounded-2xl bg-gradient-to-br from-terracotta/10 via-background to-sage/10 border border-terracotta/20 p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-terracotta/70 uppercase mb-1" style={{ fontFamily: 'var(--font-body)' }}>April 15, 2026</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">CR8W Hard Launch</h2>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {overview.venue}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {overview.eventTime}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {overview.capacityRange}</span>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <span className="font-display text-5xl text-terracotta">{daysLeft}</span>
              <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'var(--font-body)' }}>days left</p>
            </div>
          </div>
        </div>

        {/* === TEAM TASKS (The core actionable section) === */}
        <div className="mb-10">
          <TeamTasksSection />
        </div>

        {/* === CALENDAR (What's coming up) === */}
        <div className="mb-10">
          <GoogleCalendarSection />
        </div>

        {/* === EXPLORE MORE (Links to detail pages) === */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase" style={{ fontFamily: 'var(--font-body)' }}>Explore</span>
          </div>
          <div className="grid gap-3">
            {detailPages.map(item => (
              <Link key={item.href} href={item.href}>
                <a className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-terracotta/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta/20 transition-colors">
                    <item.icon className="w-5 h-5 text-terracotta/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-terracotta/60 transition-colors" />
                </a>
              </Link>
            ))}
          </div>
        </div>

        {/* === FOOTER === */}
        <footer className="border-t border-border pt-6 pb-8 text-center">
          <p className="font-display text-base text-muted-foreground">\u26F2 The Well is tended.</p>
          <p className="text-xs text-muted-foreground/50 mt-1" style={{ fontFamily: 'var(--font-body)' }}>Create Well Dashboard \u00B7 2026</p>
        </footer>
      </main>
    </div>
  );
}
