import { Link } from 'wouter';
import { ArrowLeft, CheckCircle2, CircleAlert, Keyboard, Volume2 } from 'lucide-react';

/*
 * CR8W dashboard accessibility record.
 * Keep statuses evidence-based: implementation and keyboard checks are recorded as passes;
 * native screen-reader verification remains explicitly pending until completed on the deployed dashboard.
 */

const keyboardChecks = [
  ['Skip link', 'Pass', 'Focus reaches the skip link and moves to the main dashboard content.'],
  ['Sequential focus', 'Pass', 'Tab order reaches navigation, page controls, forms, and footer links without an unexpected trap.'],
  ['Dashboard navigation', 'Pass', 'Sidebar destinations are reachable by keyboard and the active route is visually identified.'],
  ['Escape behavior', 'Pass', 'Open overlays and dialogs close with Escape and restore focus to their invoking control.'],
  ['Dialog containment', 'Pass', 'Tab and Shift+Tab remain within an open dialog or drawer.'],
  ['Interactive states', 'Pass', 'Buttons expose usable names and state changes are visible without relying on color alone.'],
];

const screenReaderChecks = [
  ['Landmarks and headings', 'Pass', 'The dashboard exposes navigation, main content, section headings, and footer structure.'],
  ['Accessible names', 'Pass', 'Icon-only actions have labels and decorative icons are hidden from the accessibility tree.'],
  ['Forms and errors', 'Pass', 'Form fields have associated labels and validation or status messages have an announcement path.'],
  ['Active navigation', 'Pass', 'The current dashboard destination is communicated visually and through route-aware navigation state.'],
  ['Native screen-reader session', 'Pending', 'Run VoiceOver, NVDA, or Narrator on the deployed CR8W dashboard to confirm spoken order, verbosity, and announcement timing.'],
];

function StatusBadge({ status }: { status: string }) {
  const passing = status === 'Pass';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${passing ? 'bg-sage/20 text-sage' : 'bg-yellow-100 text-yellow-800'}`}>
      {passing ? <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> : <CircleAlert className="h-3 w-3" aria-hidden="true" />}
      {status}
    </span>
  );
}

function EvidenceTable({ rows, caption }: { rows: string[][]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-muted/60 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <tr><th scope="col" className="px-4 py-3">Check</th><th scope="col" className="px-4 py-3">Status</th><th scope="col" className="px-4 py-3">Evidence</th></tr>
        </thead>
        <tbody>
          {rows.map(([check, status, evidence]) => (
            <tr key={check} className="border-t border-border align-top">
              <th scope="row" className="px-4 py-4 font-semibold text-foreground">{check}</th>
              <td className="px-4 py-4"><StatusBadge status={status} /></td>
              <td className="px-4 py-4 text-muted-foreground">{evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WcagResults() {
  return (
    <main className="lg:ml-56 min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to dashboard
            </a>
          </Link>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">CR8W / test record</span>
        </div>

        <header className="mb-10 grid gap-8 border-b border-border pb-10 md:grid-cols-[1fr_280px] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Evidence log · 2026</p>
            <h1 className="font-display text-4xl text-foreground md:text-6xl">WCAG test results</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">A source-of-truth record for the accessibility behaviors reviewed in the CR8W dashboard, with clear evidence and an explicit boundary around what still requires native assistive-technology testing.</p>
          </div>
          <aside className="rounded-2xl bg-sidebar p-6 text-sidebar-foreground shadow-lg" aria-label="Test summary">
            <p className="font-display text-5xl text-terracotta">11</p>
            <p className="mt-2 text-sm font-semibold">checks recorded</p>
            <p className="mt-1 text-xs text-sidebar-foreground/60">10 implementation passes · 1 pending native screen-reader session</p>
            <dl className="mt-5 space-y-2 border-t border-sidebar-border pt-4 text-[11px]">
              <div className="flex justify-between gap-3"><dt className="text-sidebar-foreground/50">Scope</dt><dd>CR8W dashboard</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-sidebar-foreground/50">Target</dt><dd>WCAG 2.2 AA review</dd></div>
            </dl>
          </aside>
        </header>

        <section className="mb-12 flex gap-4 border-l-4 border-terracotta bg-terracotta/5 p-5" aria-labelledby="scope-title">
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
          <div><h2 id="scope-title" className="font-display text-xl text-foreground">Read the status honestly.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">This page documents implementation behavior and manual smoke-test evidence. It is not a formal conformance certificate. Browser accessibility-tree inspection supports the implementation review, but the native screen-reader session remains a release follow-up.</p></div>
        </section>

        <section className="mb-12" aria-labelledby="keyboard-title">
          <div className="mb-5 flex items-start gap-4"><div className="rounded-lg bg-terracotta p-2 text-white"><Keyboard className="h-5 w-5" aria-hidden="true" /></div><div className="flex-1"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">01 · direct manipulation</p><h2 id="keyboard-title" className="mt-1 font-display text-3xl text-foreground">Keyboard verification</h2><p className="mt-2 text-sm text-muted-foreground">Verified with Tab, Shift+Tab, Enter, Space, and Escape across the dashboard shell and overlays.</p></div><StatusBadge status="Pass" /></div>
          <EvidenceTable rows={keyboardChecks} caption="Keyboard verification results" />
        </section>

        <section className="mb-12" aria-labelledby="screen-reader-title">
          <div className="mb-5 flex items-start gap-4"><div className="rounded-lg bg-sage p-2 text-white"><Volume2 className="h-5 w-5" aria-hidden="true" /></div><div className="flex-1"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">02 · spoken structure</p><h2 id="screen-reader-title" className="mt-1 font-display text-3xl text-foreground">Screen-reader readiness</h2><p className="mt-2 text-sm text-muted-foreground">Semantic structure and browser-exposed names are recorded here; one native assistive-technology pass remains open.</p></div><StatusBadge status="Pending" /></div>
          <EvidenceTable rows={screenReaderChecks} caption="Screen-reader readiness results" />
        </section>

        <section className="mb-12 grid gap-8 border-t border-border pt-8 md:grid-cols-[.8fr_1.2fr]" aria-labelledby="repeat-title">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">03 · reproducible method</p><h2 id="repeat-title" className="mt-2 font-display text-3xl text-foreground">How to repeat the review</h2></div>
          <ol className="space-y-3 pl-5 text-sm leading-6 text-muted-foreground"><li>Open the dashboard and activate the skip link.</li><li>Move through the sidebar and main content with Tab.</li><li>Open each available overlay and verify initial focus, containment, Escape, and restoration.</li><li>Use a native screen reader on the deployed site and record the browser, operating system, assistive technology, and date.</li></ol>
        </section>

        <section className="mb-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-muted/70 p-6" aria-labelledby="release-title"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Release note</p><h2 id="release-title" className="mt-2 font-display text-2xl text-foreground">Good accessibility work leaves a trail.</h2><p className="mt-2 max-w-xl text-sm text-muted-foreground">Update this record when dashboard behavior changes. Keep evidence attached to the source, not in memory.</p></div><Link href="/"><a className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta">Return to dashboard <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" /></a></Link></section>
      </div>
    </main>
  );
}
