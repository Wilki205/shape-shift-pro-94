import { useParams, useNavigate } from "react-router-dom";
import { mockStudents, mockAssessments } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Mail, Phone, Calendar, Target, ClipboardList } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = mockStudents.find((s) => s.id === id);
  const assessments = mockAssessments.filter((a) => a.studentId === id).sort((a, b) => b.date.localeCompare(a.date));

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-fade-in">
        <p className="font-heading text-lg font-semibold">Aluno não encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/students")}>
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Voltar
        </Button>
      </div>
    );
  }

  const weightData = assessments.map(a => ({ date: a.date.slice(5), weight: a.weight, fat: a.bodyFat })).reverse();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/students")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-2xl font-bold text-foreground">{student.name}</h2>
            <Badge variant={student.status === "active" ? "default" : "secondary"}
              className={student.status === "active" ? "bg-success/10 text-success border-success/20" : ""}>
              {student.status === "active" ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </div>
        <Button size="sm" onClick={() => navigate(`/students/${id}/assessment/new`)}>
          <Plus className="h-4 w-4 mr-1.5" /> Nova Avaliação
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-5 shadow-card space-y-3">
          <h3 className="font-heading text-sm font-semibold text-foreground">Dados Pessoais</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />{student.email}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{student.phone}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />{student.birthDate}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Target className="h-4 w-4" />{student.goal}</div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card space-y-3">
          <h3 className="font-heading text-sm font-semibold text-foreground">Resumo</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Avaliações</p>
              <p className="font-heading text-xl font-bold text-foreground">{student.totalAssessments}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Última</p>
              <p className="font-heading text-xl font-bold text-foreground">{student.lastAssessment?.slice(5) || "—"}</p>
            </div>
            {assessments[0] && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">Peso Atual</p>
                  <p className="font-heading text-xl font-bold text-foreground">{assessments[0].weight}kg</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">% Gordura</p>
                  <p className="font-heading text-xl font-bold text-foreground">{assessments[0].bodyFat}%</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mini chart */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Evolução de Peso</h3>
          {weightData.length > 1 ? (
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={weightData}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215 15% 48%)' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214 20% 90%)', fontSize: '12px' }} />
                <Line type="monotone" dataKey="weight" stroke="hsl(220 65% 18%)" strokeWidth={2} dot={{ r: 3 }} name="Peso (kg)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-xs text-muted-foreground">Dados insuficientes</p>
          )}
        </div>
      </div>

      {/* Assessments History */}
      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="font-heading text-base font-semibold text-foreground">Histórico de Avaliações</h3>
        </div>
        {assessments.length > 0 ? (
          <div className="divide-y">
            {assessments.map((a) => (
              <div key={a.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-secondary/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary shrink-0">
                    <ClipboardList className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Avaliação — {a.date}</p>
                    <p className="text-xs text-muted-foreground">Avaliador: {a.assessorName}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground sm:gap-6">
                  <div><span className="font-medium text-foreground">{a.weight}kg</span> peso</div>
                  <div><span className="font-medium text-foreground">{a.bodyFat}%</span> gordura</div>
                  <div><span className="font-medium text-foreground">{a.bmi}</span> IMC</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-12 text-muted-foreground">
            <ClipboardList className="h-10 w-10 mb-3 opacity-30" />
            <p className="font-medium">Nenhuma avaliação registrada</p>
            <Button size="sm" className="mt-3" onClick={() => navigate(`/students/${id}/assessment/new`)}>
              <Plus className="h-4 w-4 mr-1.5" /> Primeira Avaliação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
