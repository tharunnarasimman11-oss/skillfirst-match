import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Landing from "./pages/Landing";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateProfile from "./pages/CandidateProfile";
import CandidateAssessment from "./pages/CandidateAssessment";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import BiasDemo from "./pages/BiasDemo";
import EmployerBadge from "./pages/EmployerBadge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/candidate/login" element={<CandidateLogin />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/assessment" element={<CandidateAssessment />} />
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/recruiter/login" element={<RecruiterLogin />} />
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/bias-demo" element={<BiasDemo />} />
            <Route path="/employer/badge" element={<EmployerBadge />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
