import {
  ShieldCheck,
  BellRing,
  Palette,
  FileLock2,
  Building2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 rounded-xl border bg-card p-6 shadow-card">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-heading text-base font-semibold text-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} defaultValue={defaultValue} />
    </div>
  );
}

function ToggleItem({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

export default function Settings() {
  const handleSave = () => {
    toast.success("Configurações salvas com sucesso.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Configurações
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajuste preferências do sistema, notificações e dados da organização.
          </p>
        </div>

        <Button size="sm" onClick={handleSave}>
          <Save className="mr-1.5 h-4 w-4" />
          Salvar alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard
          icon={<Building2 className="h-5 w-5 text-muted-foreground" />}
          title="Dados da organização"
        >
          <div className="space-y-4">
            <Field
              label="Nome da clínica / consultoria"
              defaultValue="PhysiQ Pro Studio"
            />
            <Field
              label="E-mail principal"
              defaultValue="contato@physiqpro.com"
              type="email"
            />
            <Field
              label="Telefone"
              defaultValue="(81) 99999-0000"
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<Palette className="h-5 w-5 text-muted-foreground" />}
          title="Preferências visuais"
        >
          <div className="space-y-4">
            <Field
              label="Nome exibido no sistema"
              defaultValue="PhysiQ Pro"
            />
            <Field
              label="Cor principal"
              defaultValue="Azul escuro"
            />
            <Field
              label="Idioma"
              defaultValue="Português (Brasil)"
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<BellRing className="h-5 w-5 text-muted-foreground" />}
          title="Notificações"
        >
          <div className="space-y-4">
            <ToggleItem
              title="Lembretes de reavaliação"
              description="Receba avisos sobre alunos com nova avaliação pendente."
              defaultChecked
            />

            <ToggleItem
              title="Notificações por e-mail"
              description="Enviar alertas e resumos para o e-mail principal."
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<ShieldCheck className="h-5 w-5 text-muted-foreground" />}
          title="Privacidade e segurança"
        >
          <div className="space-y-4">
            <ToggleItem
              title="Sessão protegida"
              description="Exigir nova autenticação em ações sensíveis."
              defaultChecked
            />

            <ToggleItem
              title="Ocultar dados sensíveis"
              description="Reduzir exposição de informações pessoais em listagens."
            />

            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2">
                <FileLock2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Status de proteção
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Configurações básicas de segurança estão ativas neste ambiente.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}