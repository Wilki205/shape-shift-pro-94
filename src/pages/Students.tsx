import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  Power,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockStudents } from "@/lib/mock-data";
import { toast } from "sonner";

type StudentFilter = "all" | "active" | "inactive";

type Student = (typeof mockStudents)[number];

function getStudentInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatShortDate(date?: string) {
  if (!date) return "—";

  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;

  return `${day}/${month}/${year}`;
}

function getStatusLabel(status: "active" | "inactive") {
  return status === "active" ? "Ativo" : "Inativo";
}

function getStatusBadgeClass(status: "active" | "inactive") {
  return status === "active"
    ? "border-success/20 bg-success/10 text-success hover:bg-success/20"
    : "";
}

export default function Students() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StudentFilter>("all");
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.email.toLowerCase().includes(normalizedSearch) ||
        student.phone.toLowerCase().includes(normalizedSearch);

      const matchesFilter = filter === "all" || student.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [students, search, filter]);

  const activeCount = students.filter((student) => student.status === "active").length;
  const inactiveCount = students.filter((student) => student.status === "inactive").length;

  const handleView = (studentId: string) => {
    navigate(`/students/${studentId}`);
  };

  const handleEdit = (studentName: string) => {
    toast.info(`Edição de ${studentName} será conectada em seguida.`);
  };

  const handleToggleStatus = (studentId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status: student.status === "active" ? "inactive" : "active",
            }
          : student,
      ),
    );

    toast.success("Status do aluno atualizado com sucesso.");
  };

  const handleDelete = (studentId: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
    toast.success("Aluno removido com sucesso.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Alunos
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {students.length} alunos cadastrados • {filteredStudents.length} exibidos
          </p>
        </div>

        <Button size="sm" onClick={() => navigate("/students/new")}>
          <UserPlus className="mr-1.5 h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Total de alunos</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {students.length}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Ativos</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {activeCount}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Inativos</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {inactiveCount}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-1.5">
          {(["all", "active", "inactive"] as const).map((currentFilter) => (
            <Button
              key={currentFilter}
              variant={filter === currentFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(currentFilter)}
            >
              {currentFilter === "all"
                ? "Todos"
                : currentFilter === "active"
                ? "Ativos"
                : "Inativos"}
            </Button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border bg-card shadow-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Aluno
                </th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Objetivo
                </th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Última Avaliação
                </th>
                <th className="px-5 py-3 text-center font-medium text-muted-foreground">
                  Avaliações
                </th>
                <th className="px-5 py-3 text-center font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b transition-colors last:border-0 hover:bg-secondary/30"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="gradient-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                        <span className="text-xs font-semibold text-primary-foreground">
                          {getStudentInitials(student.name)}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-muted-foreground">
                    {student.goal}
                  </td>

                  <td className="px-5 py-3.5 text-muted-foreground">
                    {formatShortDate(student.lastAssessment)}
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    {student.totalAssessments}
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <Badge
                      variant={student.status === "active" ? "default" : "secondary"}
                      className={getStatusBadgeClass(student.status)}
                    >
                      {getStatusLabel(student.status)}
                    </Badge>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(student.id)}
                      >
                        <Eye className="mr-1.5 h-4 w-4" />
                        Ver
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(student.name)}
                      >
                        <Pencil className="mr-1.5 h-4 w-4" />
                        Editar
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(student.id)}
                      >
                        <Power className="mr-1.5 h-4 w-4" />
                        {student.status === "active" ? "Desativar" : "Ativar"}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" />
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Search className="mb-3 h-10 w-10 opacity-30" />
            <p className="font-medium">Nenhum aluno encontrado</p>
            <p className="text-sm">Tente ajustar os filtros ou buscar por outro nome</p>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="rounded-xl border bg-card p-5 shadow-card"
            >
              <div className="flex items-start gap-3">
                <div className="gradient-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <span className="text-xs font-semibold text-primary-foreground">
                    {getStudentInitials(student.name)}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{student.name}</p>

                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5" />
                      {student.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      {student.phone}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={student.status === "active" ? "default" : "secondary"}
                  className={getStatusBadgeClass(student.status)}
                >
                  {getStatusLabel(student.status)}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Objetivo</p>
                  <p className="mt-1 font-medium text-foreground">{student.goal}</p>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Última avaliação</p>
                  <p className="mt-1 font-medium text-foreground">
                    {formatShortDate(student.lastAssessment)}
                  </p>
                </div>

                <div className="rounded-lg border p-3 col-span-2">
                  <p className="text-xs text-muted-foreground">Avaliações</p>
                  <p className="mt-1 font-medium text-foreground">
                    {student.totalAssessments}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => handleView(student.id)}>
                  <Eye className="mr-1.5 h-4 w-4" />
                  Ver
                </Button>

                <Button variant="outline" size="sm" onClick={() => handleEdit(student.name)}>
                  <Pencil className="mr-1.5 h-4 w-4" />
                  Editar
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(student.id)}
                >
                  <Power className="mr-1.5 h-4 w-4" />
                  {student.status === "active" ? "Desativar" : "Ativar"}
                </Button>

                <Button variant="outline" size="sm" onClick={() => handleDelete(student.id)}>
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16 text-muted-foreground shadow-card">
            <Search className="mb-3 h-10 w-10 opacity-30" />
            <p className="font-medium">Nenhum aluno encontrado</p>
            <p className="text-sm">Tente ajustar os filtros ou buscar por outro nome</p>
          </div>
        )}
      </div>
    </div>
  );
}