import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  ClipboardList,
  Filter,
  Eye,
  FileBarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockAssessments, mockStudents } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

type AssessmentFilter = "all" | "recent" | "older";

function formatDate(date?: string) {
  if (!date) return "Não informado";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

function formatValue(value?: string | number | null, fallback = "Não informado") {
  return value !== undefined && value !== null && value !== "" ? String(value) : fallback;
}

function getMethodLabel(method?: string) {
  if (method === "skinfolds") return "Dobras";
  if (method === "bioimpedance") return "Bioimpedância";
  if (method === "both") return "Dobras + Bio";
  return "Padrão";
}

function getSexLabel(sex?: string) {
  if (sex === "M") return "Masculino";
  if (sex === "F") return "Feminino";
  return "Não informado";
}

function getCategoryLabel(category?: string) {
  return category === "runner" ? "Corredores" : "Geral";
}

function AvailabilityCard({
  title,
  available,
}: {
  title: string;
  available: boolean;
}) {
  return (
    <div className="rounded-lg border bg-secondary/20 p-3">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 text-sm text-foreground">
        {available ? "Disponível no detalhe do relatório" : "Não informado"}
      </p>
    </div>
  );
}

export default function Assessments() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AssessmentFilter>("all");
  const navigate = useNavigate();

  const totalAssessments = mockAssessments.length;

  const assessments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...mockAssessments]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((assessment) => {
        const student = mockStudents.find((s) => s.id === assessment.studentId);
        const studentName = student?.name.toLowerCase() || "";
        const protocol = assessment.protocol?.toLowerCase() || "";
        const method = getMethodLabel(assessment.method).toLowerCase();
        const sex = getSexLabel(assessment.biologicalSex).toLowerCase();
        const category = getCategoryLabel(assessment.category).toLowerCase();

        const matchesSearch =
          studentName.includes(normalizedSearch) ||
          assessment.assessorName.toLowerCase().includes(normalizedSearch) ||
          protocol.includes(normalizedSearch) ||
          method.includes(normalizedSearch) ||
          sex.includes(normalizedSearch) ||
          category.includes(normalizedSearch);

        if (filter === "all") return matchesSearch;
        if (filter === "recent") return matchesSearch && assessment.date >= "2026-01-01";
        if (filter === "older") return matchesSearch && assessment.date < "2026-01-01";

        return matchesSearch;
      });
  }, [search, filter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Avaliações
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {assessments.length} de {totalAssessments} avaliações
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/reports")}>
            <FileBarChart2 className="mr-1.5 h-4 w-4" />
            Ver relatórios
          </Button>

          <Button size="sm" onClick={() => navigate("/students")}>
            <Plus className="mr-1.5 h-4 w-4" />
            Selecionar aluno
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative max-w-xl flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por aluno, avaliador, método, protocolo, sexo ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["all", "recent", "older"] as const).map((currentFilter) => (
            <Button
              key={currentFilter}
              variant={filter === currentFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(currentFilter)}
            >
              {currentFilter === "all"
                ? "Todas"
                : currentFilter === "recent"
                ? "Recentes"
                : "Anteriores"}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        {assessments.length > 0 ? (
          <div className="divide-y">
            {assessments.map((assessment) => {
              const student = mockStudents.find((s) => s.id === assessment.studentId);

              return (
                <div key={assessment.id} className="space-y-4 px-5 py-4">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <ClipboardList className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {student?.name || "Aluno não encontrado"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Avaliador: {formatValue(assessment.assessorName)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground sm:grid-cols-4 xl:min-w-[520px]">
                      <div className="rounded-lg border bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">Data</p>
                        <p className="mt-1 font-medium text-foreground">
                          {formatDate(assessment.date)}
                        </p>
                      </div>

                      <div className="rounded-lg border bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">Peso</p>
                        <p className="mt-1 font-medium text-foreground">
                          {formatValue(assessment.weight)}kg
                        </p>
                      </div>

                      <div className="rounded-lg border bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">% Gordura</p>
                        <p className="mt-1 font-medium text-foreground">
                          {formatValue(assessment.bodyFat)}%
                        </p>
                      </div>

                      <div className="rounded-lg border bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">IMC</p>
                        <p className="mt-1 font-medium text-foreground">
                          {formatValue(assessment.bmi)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="w-fit">
                        {getMethodLabel(assessment.method)}
                      </Badge>

                      {assessment.protocol && (
                        <Badge variant="outline" className="w-fit">
                          {assessment.protocol}
                        </Badge>
                      )}

                      <Badge variant="outline" className="w-fit">
                        {getSexLabel(assessment.biologicalSex)}
                      </Badge>

                      <Badge variant="outline" className="w-fit">
                        {getCategoryLabel(assessment.category)}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/reports/${assessment.id}`)}
                      >
                        <Eye className="mr-1.5 h-4 w-4" />
                        Ver detalhes
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <AvailabilityCard
                      title="Circunferências"
                      available={!!assessment.circumferences}
                    />
                    <AvailabilityCard
                      title="Dobras cutâneas"
                      available={!!assessment.skinfolds}
                    />
                    <AvailabilityCard
                      title="Bioimpedância"
                      available={!!assessment.bioimpedance}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Filter className="mb-3 h-10 w-10 opacity-30" />
            <p className="font-medium">Nenhuma avaliação encontrada</p>
            <p className="text-sm">
              Tente ajustar a busca ou os filtros aplicados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}