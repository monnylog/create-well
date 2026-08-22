import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { Sidebar } from "./components/Sidebar";
import GuestJourney from "@/components/sections/GuestJourney";
import ActivationStationsDetail from "@/components/sections/ActivationStationsDetail";
import { GoogleCalendarSection } from "@/components/sections/GoogleCalendarSection";
import { TeamTasksSection } from "@/components/sections/TeamTasksSection";
import { OpenForumSection } from "@/components/sections/OpenForumSection";
import WcagResults from "./pages/WcagResults";

/* Detail page wrapper — adds padding + scroll for each section */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="lg:ml-56 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </main>
  );
}

function Router() {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/journey">
          <PageShell><GuestJourney /></PageShell>
        </Route>
        <Route path="/stations">
          <PageShell><ActivationStationsDetail /></PageShell>
        </Route>
        <Route path="/calendar">
          <PageShell><GoogleCalendarSection /></PageShell>
        </Route>
        <Route path="/tasks">
          <PageShell><TeamTasksSection /></PageShell>
        </Route>
        <Route path="/forum">
          <PageShell><OpenForumSection /></PageShell>
        </Route>
        <Route path="/wcag-results">
          <WcagResults />
        </Route>
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
