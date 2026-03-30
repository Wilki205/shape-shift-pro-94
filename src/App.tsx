import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import NewStudent from "./pages/NewStudent";
import NewAssessment from "./pages/NewAssessment";
import Assessments from "./pages/Assessments";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/new" element={<NewStudent />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route
              path="/students/:id/assessment/new"
              element={<NewAssessment />}
            />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:assessmentId" element={<ReportDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;