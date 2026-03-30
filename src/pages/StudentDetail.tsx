import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockStudents, mockAssessments } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Mail,
  Phone,
  Calendar,
  Target,
  ClipboardList,
  FileBarChart2,
  TrendingUp,
  Activity,
  Eye,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

function formatShortDate(date: string) {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}`;
}

function formatDisplayDate(date: string) {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

function StudentNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center py-20 text-muted-foreground">
      <p className="font-heading text-lg font-semibold">Aluno não encontrado</p>
      <Button variant="outline" className="mt-4" onClick={onBack}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Voltar
      </Button>
    </div>
  );
}

function InfoCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-xl border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-sm font-semibold text-foreground">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = mockStudents.find((s) => s.id === id);

  const assessments = useMemo(() => {
    return mockAssessments
      .filter((assessment) => assessment.studentId === id)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [id]);

  const latestAssessment = assessments[0];
  const previousAssessment = assessments[1];

  const weightData = useMemo(() => {
    return [...assessments]
      .reverse()
      .map((assessment) => ({
        date: formatShortDate(assessment.date),
        weight: assessment.weight,
        fat: assessment.bodyFat,
      }));
  }, [assessments]);

  const bodyFatData = useMemo(() => {
    return [...assessments]
      .reverse()
      .map((assessment) => ({
        date: formatShortDate(assessment.date),
        fat: assessment.bodyFat,
      }));
  }, [assessments]);

  const comparison = useMemo(() => {
    if (!latestAssessment || !previousAssessment) return null;

    const weightDiff = Number(latestAssessment.weight) - Number(previousAssessment.weight);
    const fatDiff = Number(latestAssessment.bodyFat) - Number(previousAssessment.bodyFat);
    const bmiDiff = Number(latestAssessment.bmi) - Number(previousAssessment.bmi);

    return {
      weightDiff,
      fatDiff,
      bmiDiff,
    };
  }, [latestAssessment, previousAssessment]);

  if (!student) {
    return <StudentNotFound onBack={() => navigate("/students")} />;
  }

  const handleViewReport = (assessmentId: string) => {
    navigate(`/reports/${assessmentId}`);
  };

  const handleEditStudent = () => {
    toast.info(`Edição de ${student.name} será conectada em seguida.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/students")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {student.name}
              </h2>

              <Badge
                variant={student.status === "active" ? "default" : "secondary"}
                className={
                  student.status === "active"
                    ? "border-success/20 bg-success/10 text-success"
                    : ""
                }
              >
                {student.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Histórico completo de avaliações e evolução corporal.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 xl:ml-auto">
          <Button variant="outline" size="sm" onClick={handleEditStudent}>
            <Eye className="mr-1.5 h-4 w-4" />
            Editar aluno
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              latestAssessment
                ? handleViewReport(latestAssessment.id)
                : toast.info("Nenhum relatório disponível ainda.")
            }
          >
            <FileBarChart2 className="mr-1.5 h-4 w-4" />
            Abrir relatório
          </Button>

          <Button size="sm" onClick={() => navigate(`/students/${id}/assessment/new`)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Nova Avaliação
          </Button>
        </div>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Peso atual">
          <p className="font-heading text-3xl font-bold text-foreground">
            {latestAssessment ? `${latestAssessment.weight}kg` : "—"}
          </p>
          {comparison && (
            <p className={`text-xs font-medium ${comparison.weightDiff <= 0 ? "text-success" : "text-warning"}`}>
              {comparison.weightDiff > 0 ? "+" : ""}
              {comparison.weightDiff.toFixed(1)}kg vs anterior
            </p>
          )}
        </InfoCard>

        <InfoCard title="% de gordura">
          <p className="font-heading text-3xl font-bold text-foreground">
            {latestAssessment ? `${latestAssessment.bodyFat}%` : "—"}
          </p>
          {comparison && (
            <p className={`text-xs font-medium ${comparison.fatDiff <= 0 ? "text-success" : "text-warning"}`}>
              {comparison.fatDiff > 0 ? "+" : ""}
              {comparison.fatDiff.toFixed(1)}% vs anterior
            </p>
          )}
        </InfoCard>

        <InfoCard title="IMC">
          <p className="font-heading text-3xl font-bold text-foreground">
            {latestAssessment ? latestAssessment.bmi : "—"}
          </p>
          {comparison && (
            <p className="text-xs font-medium text-muted-foreground">
              {comparison.bmiDiff > 0 ? "+" : ""}
              {comparison.bmiDiff.toFixed(2)} vs anterior
            </p>
          )}
        </InfoCard>

        <InfoCard title="Total de avaliações">
          <p className="font-heading text-3xl font-bold text-foreground">
            {assessments.length}
          </p>
          <p className="text-xs text-muted-foreground">
            {latestAssessment
              ? `Última em ${formatDisplayDate(latestAssessment.date)}`
              : "Nenhuma avaliação registrada"}
          </p>
        </InfoCard>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InfoCard title="Dados Pessoais">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              {student.email || "Não informado"}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              {student.phone || "Não informado"}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {student.birthDate || "Não informado"}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="h-4 w-4" />
              {student.goal || "Não informado"}
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Resumo">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Avaliações</p>
              <p className="font-heading text-xl font-bold text-foreground">
                {assessments.length}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Última</p>
              <p className="font-heading text-xl font-bold text-foreground">
                {latestAssessment ? formatShortDate(latestAssessment.date) : "—"}
              </p>
            </div>

            {latestAssessment && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">Peso Atual</p>
                  <p className="font-heading text-xl font-bold text-foreground">
                    {latestAssessment.weight}kg
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">% Gordura</p>
                  <p className="font-heading text-xl font-bold text-foreground">
                    {latestAssessment.bodyFat}%
                  </p>
                </div>
              </>
            )}
          </div>
        </InfoCard>

        <InfoCard title="Evolução rápida">
          {comparison ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-muted-foreground">Peso</span>
                <span className={comparison.weightDiff <= 0 ? "font-medium text-success" : "font-medium text-warning"}>
                  {comparison.weightDiff > 0 ? "+" : ""}
                  {comparison.weightDiff.toFixed(1)}kg
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-muted-foreground">Gordura</span>
                <span className={comparison.fatDiff <= 0 ? "font-medium text-success" : "font-medium text-warning"}>
                  {comparison.fatDiff > 0 ? "+" : ""}
                  {comparison.fatDiff.toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-muted-foreground">IMC</span>
                <span className="font-medium text-foreground">
                  {comparison.bmiDiff > 0 ? "+" : ""}
                  {comparison.bmiDiff.toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              É preciso ter pelo menos duas avaliações para comparar a evolução.
            </p>
          )}
        </InfoCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <InfoCard title="Evolução de Peso">
          {weightData.length > 1 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weightData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "hsl(215 15% 48%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(214 20% 90%)",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(220 65% 18%)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Peso (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-xs text-muted-foreground">Dados insuficientes</p>
          )}
        </InfoCard>

        <InfoCard title="Evolução de Gordura Corporal">
          {bodyFatData.length > 1 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={bodyFatData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "hsl(215 15% 48%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(214 20% 90%)",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="fat"
                  stroke="hsl(170 55% 42%)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="% Gordura"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-xs text-muted-foreground">Dados insuficientes</p>
          )}
        </InfoCard>
      </div>

      {/* Assessments history */}
      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="font-heading text-base font-semibold text-foreground">
            Histórico de Avaliações
          </h3>

          {latestAssessment && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewReport(latestAssessment.id)}
            >
              <FileBarChart2 className="mr-1.5 h-4 w-4" />
              Último relatório
            </Button>
          )}
        </div>

        {assessments.length > 0 ? (
          <div className="divide-y">
            {assessments.map((assessment) => (
              <button
                key={assessment.id}
                type="button"
                onClick={() => handleViewReport(assessment.id)}
                className="flex w-full flex-col gap-3 px-5 py-4 text-left transition-colors hover:bg-secondary/30 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <ClipboardList className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Avaliação — {formatDisplayDate(assessment.date)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Avaliador: {assessment.assessorName}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 text-xs text-muted-foreground sm:gap-6">
                  <div>
                    <span className="font-medium text-foreground">
                      {assessment.weight}kg
                    </span>{" "}
                    peso
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {assessment.bodyFat}%
                    </span>{" "}
                    gordura
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {assessment.bmi}
                    </span>{" "}
                    IMC
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs font-medium">Abrir relatório</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-12 text-muted-foreground">
            <ClipboardList className="mb-3 h-10 w-10 opacity-30" />
            <p className="font-medium">Nenhuma avaliação registrada</p>
            <Button
              size="sm"
              className="mt-3"
              onClick={() => navigate(`/students/${id}/assessment/new`)}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Primeira Avaliação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}