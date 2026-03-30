import { useMemo, useState } from "react";
import {
  FileBarChart2,
  Download,
  CalendarRange,
  TrendingUp,
  Users,
  ClipboardList,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockStudents, mockAssessments } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ReportFilter = "all" | "recent" | "older";

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

export default function Reports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ReportFilter>("all");

  const totalStudents = mockStudents.length;
  const totalAssessments = mockAssessments.length;
  const latestAssessment = [...mockAssessments].sort((a, b) =>
    b.date.localeCompare(a.date),
  )[0];

  const recentReports = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...mockAssessments]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((assessment) => {
        const student = mockStudents.find((s) => s.id === assessment.studentId);

        return {
          id: assessment.id,
          studentName: student?.name || "Aluno não encontrado",
          assessorName: assessment.assessorName,
          date: assessment.date,
          weight: assessment.weight,
          bodyFat: assessment.bodyFat,
          studentId: assessment.studentId,
        };
      })
      .filter((report) => {
        const matchesSearch =
          report.studentName.toLowerCase().includes(normalizedSearch) ||
          report.assessorName.toLowerCase().includes(normalizedSearch);

        if (filter === "all") return matchesSearch;
        if (filter === "recent") return matchesSearch && report.date >= "2026-01-01";
        if (filter === "older") return matchesSearch && report.date < "2026-01-01";

        return matchesSearch;
      });
  }, [search, filter]);

  const handleExportAll = () => {
    toast.success("Preparando exportação dos relatórios...");
    window.print();
  };

  const handleExportSingle = (studentName: string) => {
    toast.success(`Exportando relatório de ${studentName}...`);
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Relatórios
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Visualize, consulte e exporte relatórios das avaliações físicas.
          </p>
        </div>

        <Button size="sm" onClick={handleExportAll}>
          <Download className="mr-1.5 h-4 w-4" />
          Exportar relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Total de alunos</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {totalStudents}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <ClipboardList className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Avaliações registradas</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {totalAssessments}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
            <CalendarRange className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Última avaliação</p>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">
            {latestAssessment ? formatDate(latestAssessment.date) : "—"}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Evolução média</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            12.4%
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por aluno ou avaliador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-1.5">
          {(["all", "recent", "older"] as const).map((currentFilter) => (
            <Button
              key={currentFilter}
              variant={filter === currentFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(currentFilter)}
            >
              {currentFilter === "all"
                ? "Todos"
                : currentFilter === "recent"
                ? "Recentes"
                : "Anteriores"}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Relatórios recentes
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Últimas avaliações disponíveis para exportação e consulta.
            </p>
          </div>
        </div>

        {recentReports.length > 0 ? (
          <div className="divide-y">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <FileBarChart2 className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      Relatório de {report.studentName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Avaliador: {report.assessorName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground sm:gap-6">
                  <div>
                    <span className="font-medium text-foreground">
                      {formatDate(report.date)}
                    </span>{" "}
                    data
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {report.weight}kg
                    </span>{" "}
                    peso
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {report.bodyFat}%
                    </span>{" "}
                    gordura
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/reports/${report.id}`)}
                  >
                    <Eye className="mr-1.5 h-4 w-4" />
                    Ver
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportSingle(report.studentName)}
                  >
                    <Download className="mr-1.5 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Filter className="mb-3 h-10 w-10 opacity-30" />
            <p className="font-medium">Nenhum relatório encontrado</p>
            <p className="text-sm">Tente ajustar a busca ou os filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  );
}