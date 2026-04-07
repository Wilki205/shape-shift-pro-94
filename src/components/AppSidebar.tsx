import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  CalendarClock,
  Settings,
  UserCircle,
  Activity,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Alunos", url: "/students", icon: Users },
  { title: "Avaliações", url: "/assessments", icon: ClipboardList },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Agenda", url: "/schedule", icon: CalendarClock },
];

const secondaryNav = [
  { title: "Perfil", url: "/profile", icon: UserCircle },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    toast.success("Sessão encerrada com sucesso.");
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="gradient-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <Activity className="h-5 w-5 text-accent-foreground" />
          </div>

          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold tracking-tight text-sidebar-accent-foreground">
                PhysiQ Pro
              </span>
              <span className="text-[11px] text-sidebar-foreground/60">
                Avaliação Física
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
            Menu principal
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="h-10 rounded-lg transition-colors"
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      activeClassName="bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
            Sistema
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="h-10 rounded-lg"
                  >
                    <NavLink
                      to={item.url}
                      activeClassName="bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-xs font-semibold text-primary-foreground">JS</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-sidebar-accent-foreground">
                Dr. João Silva
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/50">
                Personal Trainer
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-sidebar-foreground/40 transition-colors hover:text-sidebar-foreground"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}