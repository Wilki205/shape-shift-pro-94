import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import StudentDetail from "@/pages/StudentDetail";
import NewStudent from "@/pages/NewStudent";
import NewAssessment from "@/pages/NewAssessment";
import NotFound from "@/pages/NotFound";
import { AppLayout } from "@/components/AppLayout";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="animate-fade-in space-y-2">
      <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">
        Esta página ainda está em construção.
      </p>
    </div>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/students/new" element={<NewStudent />} />
          <Route path="/assessments/new" element={<NewAssessment />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}