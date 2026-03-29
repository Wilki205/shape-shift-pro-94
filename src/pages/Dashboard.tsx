import { Users, ClipboardList, CalendarClock, TrendingUp, ArrowRight, UserPlus } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { dashboardStats, recentActivity, monthlyData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Bem-vindo, Dr. João 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aqui está o resumo do seu dia. Você tem {dashboardStats.pendingReassessments} reavaliações pendentes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/students")}>
            <Users className="h-4 w-4 mr-1.5" />
            Ver alunos
          </Button>
          <Button size="sm" onClick={() => navigate("/students/new")}>
            <UserPlus className="h-4 w-4 mr-1.5" />
            Novo aluno
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total de Alunos" value={dashboardStats.totalStudents} icon={Users} variant="primary" trend={{ value: 6.5, positive: true }} />
        <StatsCard title="Avaliações este Mês" value={dashboardStats.assessmentsThisMonth} icon={ClipboardList} variant="accent" trend={{ value: 12, positive: true }} />
        <StatsCard title="Reavaliações Pendentes" value={dashboardStats.pendingReassessments} icon={CalendarClock} subtitle="Próximos 7 dias" />
        <StatsCard title="Evolução Média" value={`${dashboardStats.averageEvolution}%`} icon={TrendingUp} variant="accent" trend={{ value: 3.2, positive: true }} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-heading text-base font-semibold text-foreground mb-4">Avaliações por Mês</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(215 15% 48%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(215 15% 48%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214 20% 90%)', fontSize: '13px' }} />
              <Bar dataKey="assessments" fill="hsl(220 65% 18%)" radius={[4, 4, 0, 0]} name="Avaliações" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-heading text-base font-semibold text-foreground mb-4">Evolução de Alunos</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(215 15% 48%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(215 15% 48%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214 20% 90%)', fontSize: '13px' }} />
              <Line type="monotone" dataKey="students" stroke="hsl(170 55% 42%)" strokeWidth={2} dot={{ fill: 'hsl(170 55% 42%)', r: 4 }} name="Alunos" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="font-heading text-base font-semibold text-foreground">Atividade Recente</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
            Ver tudo <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="divide-y">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/50 transition-colors">
              <div className={`h-2 w-2 rounded-full shrink-0 ${
                item.type === 'assessment' ? 'bg-accent' :
                item.type === 'registration' ? 'bg-primary' :
                item.type === 'pending' ? 'bg-warning' : 'bg-muted-foreground'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.student}</p>
                <p className="text-xs text-muted-foreground">{item.action}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
