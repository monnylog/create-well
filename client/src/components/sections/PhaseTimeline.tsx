import { phases } from '@/lib/data';
import { StatusBadge, OwnerBadge } from '@/components/StatusBadge';

const DIVIDER_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/nxMGea7pgW3xmsbDD1R7VJ/sandbox/sjyNPk13WJTYw0qFVZyewV-img-4_1771799301000_na1fn_Z2V5c2VyLXNlY3Rpb24tZGl2aWRlcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbnhNR2VhN3BnVzN4bXNiREQxUjdWSi9zYW5kYm94L3NqeU5QazEzV0pUWXcwcUZWWnlld1YtaW1nLTRfMTc3MTc5OTMwMTAwMF9uYTFmbl9aMlY1YzJWeUxYTmxZM1JwYjI0dFpHbDJhV1JsY2cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Shxg72DmK6la7Vh3aYPg535x42Z~zjddceLV9sStJXvfDMxkL8fxzyi6ljaSQK3eitUlVxnkVnjU7PJvI5GbOmshukif2wFJkeobRdWgbRGC4JBLFYK0csFNRpep9Yb8PXX6uuZ2FubK8bbjqe1oazOGf3xEmo3cY5zxnkVJAbfF-2fAhSiRDupWkarUCDjMndJai333cNRs04x8KXygqfE7WcrE3jJxhXyoKFLk-NzHNakKLxQGlep0FTmNvK1pP5P91MeYB5bA1lqnheEQ2LY0-g~xUKKJjwBjqdq-FHM7LVfzSbBTtOD2P3bTsyq1gTB-7ZBNVjuRhJ4jfPjX~g__";

const phaseIcons: Record<string, string> = {
  'ARRIVE': '🌿',
  'WELCOME': '🕯️',
  'TASTING MENU': '🍽️',
  'CONNECT': '🤝',
  'FROM THE WELL': '💧',
  'CLOSING RITUAL': '✨',
};

export function PhaseTimelineSection() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="relative rounded-xl overflow-hidden h-24">
        <img src={DIVIDER_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        <div className="relative z-10 h-full flex items-center px-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">The Well — Phase Timeline</h2>
            <p className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "var(--font-body)" }}>
              The evening arc from arrival to closing
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-terracotta/40 via-sage/40 to-gold/40 hidden md:block" />

        <div className="space-y-4">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="relative flex gap-4 md:gap-6">
              {/* Timeline dot */}
              <div className="hidden md:flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 flex-shrink-0
                  ${phase.status === 'Flowing' ? 'border-sage bg-sage/10' : 
                    phase.status === 'Locked' ? 'border-terracotta bg-terracotta/10' : 
                    'border-gold bg-gold/10'}`}>
                  {phaseIcons[phase.name] || '⛲'}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 bg-card rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="md:hidden text-lg">{phaseIcons[phase.name] || '⛲'}</span>
                    <h3 className="font-display text-lg font-bold text-foreground">{phase.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={phase.status} />
                  </div>
                </div>

                <p className="text-sm text-foreground/80 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                  {phase.goal}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-foreground/70">Timing:</span> {phase.timing}
                  </span>
                  <span className="text-border">|</span>
                  <OwnerBadge owner={phase.owner} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
