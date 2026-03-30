import { useMemo, useState } from "react";
import {
  UserPlus,
  Users,
  ClipboardList,
  CalendarClock,
  TrendingUp,
  ArrowRight,
  BellRing,
  FileBarChart2,
  CalendarPlus,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { dashboardStats, recentActivity, monthlyData, mockStudents, mockAssessments } from "@/lib/mock-data";
import { StatsCard } from "@/components/StatsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { toast } from "sonner";

type DashboardPeriod = "7d" | "30d" | "90d";

function getActivityDotColor(type: string) {
  switch (type) {
    case "assessment":
      return "bg-accent";
    case "registration":
      return "bg-primary";
    case "pending":
      return "bg-warning";
    default:
      return "bg-muted-foreground";
  }
}

function ChartCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-heading text-base font-semibold text-foreground">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<DashboardPeriod>("30d");
  const [showAllActivity, setShowAllActivity] = useState(false);

  const displayedActivity = useMemo(() => {
    return showAllActivity ? recentActivity : recentActivity.slice(0, 5);
  }, [showAllActivity]);

  const totalAssessments = mockAssessments.length;
  const totalStudents = mockStudents.length;

  const latestAssessment = useMemo(() => {
    return [...mockAssessments].sort((a, b) => b.date.localeCompare(a.date))[0];
  }, []);

  const topStudents = useMemo(() => {
    return [...mockStudents]
      .sort((a, b) => b.totalAssessments - a.totalAssessments)
      .slice(0, 4);
  }, []);

  const summary = useMemo(() => {
    if (period === "7d") {
      return {
        totalStudents,
        assessmentsThisPeriod: Math.max(3, Math.floor(totalAssessments * 0.2)),
        pendingReassessments: Math.max(2, Math.floor(dashboardStats.pendingReassessments * 0.5)),
        averageEvolution: 4.8,
      };
    }

    if (period === "90d") {
      return {
        totalStudents,
        assessmentsThisPeriod: Math.max(8, Math.floor(totalAssessments * 0.9)),
        pendingReassessments: dashboardStats.pendingReassessments + 3,
        averageEvolution: 14.2,
      };
    }

    return {
      totalStudents: dashboardStats.totalStudents || totalStudents,
      assessmentsThisPeriod: dashboardStats.assessmentsThisMonth || totalAssessments,
      pendingReassessments: dashboardStats.pendingReassessments,
      averageEvolution: dashboardStats.averageEvolution,
    };
  }, [period, totalStudents, totalAssessments]);

  const handleViewAllActivity = () => {
    setShowAllActivity((prev) => !prev);
  };

  const handleOpenNotifications = () => {
    toast.info("Você tem reavaliações pendentes para acompanhar.");
  };

  const periodLabel =
    period === "7d" ? "últimos 7 dias" : period === "90d" ? "últimos 90 dias" : "últimos 30 dias";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Bem-vindo, Dr. João 👋
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Aqui está o resumo do seu dia. Você tem {summary.pendingReassessments} reavaliações pendentes.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["7d", "30d", "90d"] as const).map((currentPeriod) => (
            <Button
              key={currentPeriod}
              variant={period === currentPeriod ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(currentPeriod)}
            >
              {currentPeriod === "7d"
                ? "7 dias"
                : currentPeriod === "30d"
                ? "30 dias"
                : "90 dias"}
            </Button>
          ))}

          <Button variant="outline" size="sm" onClick={() => navigate("/students")}>
            <Users className="mr-1.5 h-4 w-4" />
            Ver alunos
          </Button>

          <Button size="sm" onClick={() => navigate("/students/new")}>
            <UserPlus className="mr-1.5 h-4 w-4" />
            Novo aluno
          </Button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          onClick={() => navigate("/students/new")}
          className="rounded-xl border bg-card p-5 text-left shadow-card transition hover:shadow-elevated"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <UserPlus className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-foreground">Cadastrar aluno</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Inicie um novo cadastro rapidamente.
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate("/schedule")}
          className="rounded-xl border bg-card p-5 text-left shadow-card transition hover:shadow-elevated"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <CalendarPlus className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-foreground">Abrir agenda</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Gerencie os próximos atendimentos.
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate("/reports")}
          className="rounded-xl border bg-card p-5 text-left shadow-card transition hover:shadow-elevated"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
            <FileBarChart2 className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-foreground">Abrir relatórios</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Consulte e exporte relatórios.
          </p>
        </button>

        <button
          type="button"
          onClick={handleOpenNotifications}
          className="rounded-xl border bg-card p-5 text-left shadow-card transition hover:shadow-elevated"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
            <BellRing className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-foreground">Alertas do dia</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Veja avisos e reavaliações pendentes.
          </p>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Alunos"
          value={summary.totalStudents}
          icon={Users}
          variant="primary"
          trend={{ value: 6.5, positive: true }}
        />
        <StatsCard
          title={`Avaliações (${periodLabel})`}
          value={summary.assessmentsThisPeriod}
          icon={ClipboardList}
          variant="accent"
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Reavaliações Pendentes"
          value={summary.pendingReassessments}
          icon={CalendarClock}
          subtitle="Acompanhar nos próximos dias"
        />
        <StatsCard
          title="Evolução Média"
          value={`${summary.averageEvolution}%`}
          icon={TrendingUp}
          variant="accent"
          trend={{ value: 3.2, positive: true }}
        />
      </div>

      {/* Charts + ranking */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartCard title="Avaliações por Mês">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "hsl(215 15% 48%)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "hsl(215 15% 48%)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(214 20% 90%)",
                      fontSize: "13px",
                    }}
                  />
                  <Bar
                    dataKey="assessments"
                    fill="hsl(220 65% 18%)"
                    radius={[4, 4, 0, 0]}
                    name="Avaliações"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Evolução de Alunos">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "hsl(215 15% 48%)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "hsl(215 15% 48%)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(214 20% 90%)",
                      fontSize: "13px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(170 55% 42%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(170 55% 42%)", r: 4 }}
                    name="Alunos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <ChartCard
          title="Alunos em destaque"
          action={
            <Button variant="ghost" size="sm" onClick={() => navigate("/students")}>
              <Eye className="mr-1.5 h-4 w-4" />
              Ver todos
            </Button>
          }
        >
          <div className="space-y-3">
            {topStudents.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => navigate(`/students/${student.id}`)}
                className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition hover:bg-secondary/30"
              >
                <div className="gradient-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <span className="text-xs font-semibold text-primary-foreground">
                    {student.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {student.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {student.totalAssessments} avaliações
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Activity + summary */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-xl border bg-card shadow-card">
            <div className="flex items-center justify-between p-5 pb-3">
              <h3 className="font-heading text-base font-semibold text-foreground">
                Atividade Recente
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={handleViewAllActivity}
              >
                {showAllActivity ? "Ver menos" : "Ver tudo"}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="divide-y">
              {displayedActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-secondary/50"
                >
                  <div
                    className={`h-2 w-2 shrink-0 rounded-full ${getActivityDotColor(item.type)}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.student}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ChartCard title="Resumo rápido">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Última avaliação</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {latestAssessment
                  ? `${latestAssessment.assessorName} • ${latestAssessment.date}`
                  : "Nenhuma avaliação encontrada"}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Alunos cadastrados</p>
              <p className="mt-1 text-2xl font-heading font-bold text-foreground">
                {totalStudents}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Total de avaliações</p>
              <p className="mt-1 text-2xl font-heading font-bold text-foreground">
                {totalAssessments}
              </p>
            </div>

            <Button className="w-full" onClick={() => navigate("/reports")}>
              <FileBarChart2 className="mr-1.5 h-4 w-4" />
              Abrir relatórios
            </Button>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}