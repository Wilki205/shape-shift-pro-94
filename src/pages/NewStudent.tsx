import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type NewStudentFormData = {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  sex: string;
  goal: string;
  activityLevel: string;
  notes: string;
};

function FormField({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function NewStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewStudentFormData>({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    sex: "",
    goal: "",
    activityLevel: "",
    notes: "",
  });

  const updateField = <K extends keyof NewStudentFormData>(
    field: K,
    value: NewStudentFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.fullName.trim()) {
      toast.error("Informe o nome completo do aluno.");
      return;
    }

    console.log("New student payload:", formData);

    toast.success("Aluno cadastrado com sucesso!");
    navigate("/students");
  };

  return (
    <div className="animate-fade-in mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/students")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h2 className="font-heading text-xl font-bold text-foreground">
          Novo Aluno
        </h2>
      </div>

      <div className="space-y-5 rounded-xl border bg-card p-6 shadow-card">
        <h3 className="font-heading text-base font-semibold text-foreground">
          Dados Pessoais
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Nome completo" required className="sm:col-span-2">
            <Input
              placeholder="Ex: Ana Carolina Silva"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
          </FormField>

          <FormField label="E-mail">
            <Input
              type="email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </FormField>

          <FormField label="Telefone">
            <Input
              placeholder="(11) 99999-0000"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </FormField>

          <FormField label="Data de Nascimento">
            <Input
              type="date"
              value={formData.birthDate}
              onChange={(e) => updateField("birthDate", e.target.value)}
            />
          </FormField>

          <FormField label="Sexo">
            <Input
              placeholder="Masculino, Feminino ou Outro"
              value={formData.sex}
              onChange={(e) => updateField("sex", e.target.value)}
            />
          </FormField>
        </div>

        <h3 className="pt-3 font-heading text-base font-semibold text-foreground">
          Objetivo e Observações
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Objetivo principal">
            <Input
              placeholder="Ex: Emagrecimento, Hipertrofia..."
              value={formData.goal}
              onChange={(e) => updateField("goal", e.target.value)}
            />
          </FormField>

          <FormField label="Nível de atividade">
            <Input
              placeholder="Sedentário, Moderado, Intenso"
              value={formData.activityLevel}
              onChange={(e) => updateField("activityLevel", e.target.value)}
            />
          </FormField>

          <FormField label="Observações" className="sm:col-span-2">
            <Textarea
              rows={3}
              placeholder="Lesões, restrições, informações adicionais..."
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </FormField>
        </div>

        <div className="flex justify-end border-t pt-3">
          <Button onClick={handleSave}>
            <Save className="mr-1.5 h-4 w-4" />
            Cadastrar Aluno
          </Button>
        </div>
      </div>
    </div>
  );
}