import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockStudents } from "@/lib/mock-data";

export default function Students() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const navigate = useNavigate();

  const filtered = mockStudents.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Alunos</h2>
          <p className="text-sm text-muted-foreground mt-1">{mockStudents.length} alunos cadastrados</p>
        </div>
        <Button size="sm" onClick={() => navigate("/students/new")}>
          <UserPlus className="h-4 w-4 mr-1.5" />
          Novo Aluno
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar aluno..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1.5">
          {(["all", "active", "inactive"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f === "all" ? "Todos" : f === "active" ? "Ativos" : "Inativos"}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Aluno</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3 hidden md:table-cell">Objetivo</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3 hidden lg:table-cell">Última Avaliação</th>
                <th className="text-center font-medium text-muted-foreground px-5 py-3 hidden sm:table-cell">Avaliações</th>
                <th className="text-center font-medium text-muted-foreground px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => navigate(`/students/${student.id}`)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary shrink-0">
                        <span className="text-xs font-semibold text-primary-foreground">
                          {student.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{student.goal}</td>
                  <td className="px-5 py-3.5 text-muted-foreground hidden lg:table-cell">{student.lastAssessment || "—"}</td>
                  <td className="px-5 py-3.5 text-center hidden sm:table-cell">{student.totalAssessments}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={student.status === "active" ? "default" : "secondary"}
                      className={student.status === "active" ? "bg-success/10 text-success border-success/20 hover:bg-success/20" : ""}>
                      {student.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">Ver</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Search className="h-10 w-10 mb-3 opacity-30" />
            <p className="font-medium">Nenhum aluno encontrado</p>
            <p className="text-sm">Tente ajustar os filtros ou buscar por outro nome</p>
          </div>
        )}
      </div>
    </div>
  );
}
