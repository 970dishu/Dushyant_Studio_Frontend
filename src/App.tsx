import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Index = lazy(() => import("./pages/Index"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const MyStory = lazy(() => import("./pages/MyStory"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppRoutes = () => {
  useSmoothScroll();

  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-story" element={<MyStory />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;
