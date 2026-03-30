import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const pageTitleRoutes = [
  { pattern: /^\/dashboard\/?$/, title: "Dashboard" },
  { pattern: /^\/students\/new\/?$/, title: "Novo aluno" },
  { pattern: /^\/students\/[^/]+\/assessment\/new\/?$/, title: "Nova avaliação" },
  { pattern: /^\/students(?:\/.*)?$/, title: "Alunos" },
  { pattern: /^\/assessments\/?$/, title: "Avaliações" },
  { pattern: /^\/reports\/?$/, title: "Relatórios" },
  { pattern: /^\/schedule\/?$/, title: "Agenda" },
  { pattern: /^\/profile\/?$/, title: "Perfil" },
  { pattern: /^\/settings\/?$/, title: "Configurações" },
];

function getPageTitle(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const match = pageTitleRoutes.find((route) => route.pattern.test(normalized));

  return match?.title ?? "PhysiQ Pro";
}

export function AppLayout() {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  const handleNotificationsClick = () => {
    toast.info("Você não possui novas notificações no momento.");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground" />
              <h1 className="font-heading text-lg font-semibold text-foreground">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground"
                onClick={handleNotificationsClick}
                aria-label="Notificações"
                title="Notificações"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}