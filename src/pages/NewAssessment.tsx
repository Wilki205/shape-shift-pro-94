import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockStudents } from "@/lib/mock-data";
import { toast } from "sonner";

const steps = ["Dados Gerais", "Composição Corporal", "Circunferências", "Dobras Cutâneas", "Observações"];

export default function NewAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = mockStudents.find((s) => s.id === id);
  const [step, setStep] = useState(0);

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

  const handleSave = () => {
    toast.success("Avaliação salva com sucesso!");
    navigate(`/students/${id}`);
  };

  const Field = ({ label, unit, placeholder }: { label: string; unit?: string; placeholder?: string }) => (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="relative">
        <Input type="number" placeholder={placeholder || "0"} className="pr-10" />
        {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/students/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Nova Avaliação Física</h2>
          <p className="text-sm text-muted-foreground">{student.name}</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold border-current">
              {i + 1}
            </span>
            <span className="hidden sm:inline">{s}</span>
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
        {step === 0 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">Dados Gerais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Data da Avaliação</Label>
                <Input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
              </div>
              <div className="space-y-1.5">
                <Label>Avaliador</Label>
                <Input defaultValue="Dr. João Silva" />
              </div>
              <div className="space-y-1.5">
                <Label>Objetivo do Aluno</Label>
                <Input defaultValue={student.goal} />
              </div>
              <div className="space-y-1.5">
                <Label>Nível de Atividade</Label>
                <Input placeholder="Sedentário, Leve, Moderado, Intenso" />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">Composição Corporal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Peso" unit="kg" />
              <Field label="Altura" unit="cm" />
              <Field label="IMC" unit="kg/m²" />
              <Field label="Percentual de Gordura" unit="%" />
              <Field label="Massa Magra" unit="kg" />
              <Field label="Massa Muscular" unit="kg" />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">Circunferências Corporais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Braço Direito" unit="cm" />
              <Field label="Braço Esquerdo" unit="cm" />
              <Field label="Peitoral" unit="cm" />
              <Field label="Cintura" unit="cm" />
              <Field label="Abdômen" unit="cm" />
              <Field label="Quadril" unit="cm" />
              <Field label="Coxa Direita" unit="cm" />
              <Field label="Coxa Esquerda" unit="cm" />
              <Field label="Panturrilha Direita" unit="cm" />
              <Field label="Panturrilha Esquerda" unit="cm" />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">Dobras Cutâneas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Tríceps" unit="mm" />
              <Field label="Bíceps" unit="mm" />
              <Field label="Subescapular" unit="mm" />
              <Field label="Suprailíaca" unit="mm" />
              <Field label="Abdominal" unit="mm" />
              <Field label="Coxa" unit="mm" />
              <Field label="Panturrilha" unit="mm" />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">Observações</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Observações Gerais</Label>
                <Textarea rows={4} placeholder="Anotações sobre o aluno, restrições, recomendações..." />
              </div>
              <div className="space-y-1.5">
                <Label>Restrições / Observações Importantes</Label>
                <Textarea rows={3} placeholder="Lesões, limitações, alergias..." />
              </div>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(s => s - 1)}>
            Anterior
          </Button>
          <span className="text-xs text-muted-foreground">
            Etapa {step + 1} de {steps.length}
          </span>
          {step < steps.length - 1 ? (
            <Button size="sm" onClick={() => setStep(s => s + 1)}>
              Próxima <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1.5" /> Salvar Avaliação
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
