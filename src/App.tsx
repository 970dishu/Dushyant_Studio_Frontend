import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import MyStory from "./pages/MyStory";
import NotFound from "./pages/NotFound";
import GlobalCursor from "./components/GlobalCursor";
import ScrollToTop from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

const queryClient = new QueryClient();

const App = () => (
  <><QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background cursor-none relative">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        <GlobalCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/my-story" element={<MyStory />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
  <Analytics />
  <SpeedInsights /></>
);

export default App;
