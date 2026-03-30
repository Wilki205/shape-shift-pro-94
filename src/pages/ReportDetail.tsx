import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileBarChart2,
  UserRound,
  CalendarDays,
  Activity,
  TrendingUp,
  ClipboardList,
  Ruler,
  Scale,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockAssessments, mockStudents } from "@/lib/mock-data";
import { toast } from "sonner";

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

function SummaryCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 font-heading text-2xl font-bold text-foreground">
        {value}
      </p>
      {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-card">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          {icon}
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function DataGrid({
  items,
}: {
  items: Array<{ label: string; value?: string | number | null; unit?: string }>;
}) {
  const visibleItems = items.filter(
    (item) => item.value !== undefined && item.value !== null && item.value !== "",
  );

  if (visibleItems.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum dado disponível.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {visibleItems.map((item) => (
        <div key={item.label} className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className="mt-1 font-medium text-foreground">
            {item.value}
            {item.unit ? item.unit : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ReportDetail() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();

  const reportData = useMemo(() => {
    const orderedAssessments = [...mockAssessments].sort((a, b) =>
      b.date.localeCompare(a.date),
    );

    const assessmentIndex = orderedAssessments.findIndex(
      (item) => item.id === assessmentId,
    );

    const assessment =
      assessmentIndex >= 0 ? orderedAssessments[assessmentIndex] : null;

    const previousAssessment =
      assessmentIndex >= 0 ? orderedAssessments[assessmentIndex + 1] : null;

    const student = mockStudents.find((item) => item.id === assessment?.studentId);

    if (!assessment || !student) return null;

    return { assessment, student, previousAssessment };
  }, [assessmentId]);

  if (!reportData) {
    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Relatório não encontrado
        </h2>
        <Button variant="outline" onClick={() => navigate("/reports")}>
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  const { assessment, student, previousAssessment } = reportData;

  const comparison = previousAssessment
    ? {
        weightDiff:
          Number(assessment.weight) - Number(previousAssessment.weight),
        bodyFatDiff:
          Number(assessment.bodyFat) - Number(previousAssessment.bodyFat),
        bmiDiff: Number(assessment.bmi) - Number(previousAssessment.bmi),
      }
    : null;

  const handleExport = () => {
    toast.success("Preparando relatório para exportação...");
    window.print();
  };

  const methodLabel =
    assessment.method === "skinfolds"
      ? "Dobras cutâneas"
      : assessment.method === "bioimpedance"
      ? "Bioimpedância"
      : assessment.method === "both"
      ? "Dobras + Bioimpedância"
      : "Não informado";

  return (
    <div className="space-y-6 animate-fade-in print:space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/reports")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Relatório de Avaliação
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {student.name} • {formatDate(assessment.date)}
            </p>
          </div>
        </div>

        <Button onClick={handleExport}>
          <Download className="mr-1.5 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      <div className="hidden print:block">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Relatório de Avaliação Física
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {student.name} • {formatDate(assessment.date)}
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-card">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="gradient-primary flex h-14 w-14 items-center justify-center rounded-xl">
              <span className="text-lg font-bold text-primary-foreground">
                {student.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {student.name}
              </h3>
              <p className="text-sm text-muted-foreground">{student.goal}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard title="Peso" value={`${assessment.weight}kg`} />
            <SummaryCard title="% Gordura" value={`${assessment.bodyFat}%`} />
            <SummaryCard title="IMC" value={`${assessment.bmi}`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <SummaryCard
          title="Aluno"
          value={student.name}
          subtitle={student.email}
        />
        <SummaryCard
          title="Data da avaliação"
          value={formatDate(assessment.date)}
          subtitle="Registro da avaliação"
        />
        <SummaryCard
          title="Avaliador"
          value={assessment.assessorName}
          subtitle="Responsável pelo atendimento"
        />
        <SummaryCard
          title="Método / Protocolo"
          value={methodLabel}
          subtitle={assessment.protocol || "Não informado"}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard
          title="Dados do aluno"
          icon={<UserRound className="h-5 w-5 text-muted-foreground" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-secondary/20 p-4">
              <p className="text-xs text-muted-foreground">Nome</p>
              <p className="mt-1 font-medium text-foreground">{student.name}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <p className="text-xs text-muted-foreground">Contato</p>
              <p className="mt-1 font-medium text-foreground">{student.phone}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <p className="text-xs text-muted-foreground">Nascimento</p>
              <p className="mt-1 font-medium text-foreground">{student.birthDate}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <p className="text-xs text-muted-foreground">Objetivo</p>
              <p className="mt-1 font-medium text-foreground">{student.goal}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Resumo corporal"
          icon={<Activity className="h-5 w-5 text-muted-foreground" />}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Peso</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">
                {assessment.weight}kg
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">% Gordura</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">
                {assessment.bodyFat}%
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">IMC</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">
                {assessment.bmi}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="mt-1 font-heading text-2xl font-bold text-foreground">
                Concluída
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Comparação com anterior"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
        >
          {comparison ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <span className="text-sm text-muted-foreground">Peso</span>
                <span
                  className={`text-sm font-medium ${
                    comparison.weightDiff <= 0 ? "text-success" : "text-warning"
                  }`}
                >
                  {comparison.weightDiff > 0 ? "+" : ""}
                  {comparison.weightDiff.toFixed(1)}kg
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <span className="text-sm text-muted-foreground">% Gordura</span>
                <span
                  className={`text-sm font-medium ${
                    comparison.bodyFatDiff <= 0 ? "text-success" : "text-warning"
                  }`}
                >
                  {comparison.bodyFatDiff > 0 ? "+" : ""}
                  {comparison.bodyFatDiff.toFixed(1)}%
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <span className="text-sm text-muted-foreground">IMC</span>
                <span className="text-sm font-medium text-foreground">
                  {comparison.bmiDiff > 0 ? "+" : ""}
                  {comparison.bmiDiff.toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Ainda não há avaliação anterior para comparar.
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      <SectionCard
        title="Circunferências"
        icon={<Ruler className="h-5 w-5 text-muted-foreground" />}
      >
        <DataGrid
          items={[
            { label: "Braço Direito", value: assessment.circumferences?.rightArm, unit: " cm" },
            { label: "Braço Esquerdo", value: assessment.circumferences?.leftArm, unit: " cm" },
            { label: "Peitoral", value: assessment.circumferences?.chest, unit: " cm" },
            { label: "Cintura", value: assessment.circumferences?.waist, unit: " cm" },
            { label: "Abdômen", value: assessment.circumferences?.abdomen, unit: " cm" },
            { label: "Quadril", value: assessment.circumferences?.hips, unit: " cm" },
            { label: "Coxa Direita", value: assessment.circumferences?.rightThigh, unit: " cm" },
            { label: "Coxa Esquerda", value: assessment.circumferences?.leftThigh, unit: " cm" },
            { label: "Panturrilha Direita", value: assessment.circumferences?.rightCalf, unit: " cm" },
            { label: "Panturrilha Esquerda", value: assessment.circumferences?.leftCalf, unit: " cm" },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="Dobras Cutâneas"
        icon={<Scale className="h-5 w-5 text-muted-foreground" />}
      >
        <DataGrid
          items={[
            { label: "Tríceps", value: assessment.skinfolds?.triceps, unit: " mm" },
            { label: "Bíceps", value: assessment.skinfolds?.biceps, unit: " mm" },
            { label: "Subescapular", value: assessment.skinfolds?.subscapular, unit: " mm" },
            { label: "Suprailíaca", value: assessment.skinfolds?.suprailiac, unit: " mm" },
            { label: "Abdominal", value: assessment.skinfolds?.abdominal, unit: " mm" },
            { label: "Coxa", value: assessment.skinfolds?.thigh, unit: " mm" },
            { label: "Panturrilha", value: assessment.skinfolds?.calf, unit: " mm" },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="Bioimpedância"
        icon={<Waves className="h-5 w-5 text-muted-foreground" />}
      >
        <DataGrid
          items={[
            { label: "% Gordura", value: assessment.bioimpedance?.bodyFatPercentage, unit: "%" },
            { label: "Massa Muscular", value: assessment.bioimpedance?.muscleMass, unit: " kg" },
            { label: "Massa Magra", value: assessment.bioimpedance?.leanMass, unit: " kg" },
            { label: "Água Corporal", value: assessment.bioimpedance?.bodyWater, unit: "%" },
            { label: "Gordura Visceral", value: assessment.bioimpedance?.visceralFat },
            { label: "Metabolismo Basal", value: assessment.bioimpedance?.basalMetabolicRate, unit: " kcal" },
            { label: "Idade Metabólica", value: assessment.bioimpedance?.metabolicAge, unit: " anos" },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="Observações do relatório"
        icon={<ClipboardList className="h-5 w-5 text-muted-foreground" />}
      >
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Observações gerais</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {assessment.notes?.generalNotes || "Nenhuma observação geral registrada."}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Restrições / observações importantes</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {assessment.notes?.restrictions || "Nenhuma restrição registrada."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Data da avaliação
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(assessment.date)}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <FileBarChart2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Relatório gerado
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Pronto para impressão e exportação.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}