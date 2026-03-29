import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function NewStudent() {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("Aluno cadastrado com sucesso!");
    navigate("/students");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/students")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-heading text-xl font-bold text-foreground">Novo Aluno</h2>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
        <h3 className="font-heading text-base font-semibold text-foreground">Dados Pessoais</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Nome completo *</Label>
            <Input placeholder="Ex: Ana Carolina Silva" />
          </div>
          <div className="space-y-1.5">
            <Label>E-mail</Label>
            <Input type="email" placeholder="email@exemplo.com" />
          </div>
          <div className="space-y-1.5">
            <Label>Telefone</Label>
            <Input placeholder="(11) 99999-0000" />
          </div>
          <div className="space-y-1.5">
            <Label>Data de Nascimento</Label>
            <Input type="date" />
          </div>
          <div className="space-y-1.5">
            <Label>Sexo</Label>
            <Input placeholder="M / F" />
          </div>
        </div>

        <h3 className="font-heading text-base font-semibold text-foreground pt-3">Objetivo e Observações</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Objetivo principal</Label>
            <Input placeholder="Ex: Emagrecimento, Hipertrofia..." />
          </div>
          <div className="space-y-1.5">
            <Label>Nível de atividade</Label>
            <Input placeholder="Sedentário, Moderado, Intenso" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Observações</Label>
            <Textarea rows={3} placeholder="Lesões, restrições, informações adicionais..." />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1.5" /> Cadastrar Aluno
          </Button>
        </div>
      </div>
    </div>
  );
}
