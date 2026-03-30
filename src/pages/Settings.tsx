import { ShieldCheck, BellRing, Palette, FileLock2, Building2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
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

        <Button size="sm">
          <Save className="mr-1.5 h-4 w-4" />
          Salvar alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-heading text-base font-semibold text-foreground">
              Dados da organização
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome da clínica / consultoria</Label>
              <Input defaultValue="PhysiQ Pro Studio" />
            </div>

            <div className="space-y-1.5">
              <Label>E-mail principal</Label>
              <Input defaultValue="contato@physiqpro.com" />
            </div>

            <div className="space-y-1.5">
              <Label>Telefone</Label>
              <Input defaultValue="(81) 99999-0000" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-heading text-base font-semibold text-foreground">
              Preferências visuais
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome exibido no sistema</Label>
              <Input defaultValue="PhysiQ Pro" />
            </div>

            <div className="space-y-1.5">
              <Label>Cor principal</Label>
              <Input defaultValue="Azul escuro" />
            </div>

            <div className="space-y-1.5">
              <Label>Idioma</Label>
              <Input defaultValue="Português (Brasil)" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-heading text-base font-semibold text-foreground">
              Notificações
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Lembretes de reavaliação</p>
                <p className="text-xs text-muted-foreground">
                  Receba avisos sobre alunos com nova avaliação pendente.
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Notificações por e-mail</p>
                <p className="text-xs text-muted-foreground">
                  Enviar alertas e resumos para o e-mail principal.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-heading text-base font-semibold text-foreground">
              Privacidade e segurança
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Sessão protegida</p>
                <p className="text-xs text-muted-foreground">
                  Exigir nova autenticação em ações sensíveis.
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Ocultar dados sensíveis</p>
                <p className="text-xs text-muted-foreground">
                  Reduzir exposição de informações pessoais em listagens.
                </p>
              </div>
              <Switch />
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2">
                <FileLock2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Status de proteção</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Configurações básicas de segurança estão ativas neste ambiente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}