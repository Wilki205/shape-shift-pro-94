import { Mail, Phone, Briefcase, Award, CalendarDays, UserCircle2, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const professional = {
    name: "Dr. João Silva",
    role: "Personal Trainer",
    email: "joao.silva@physiqpro.com",
    phone: "(81) 99999-0000",
    cref: "CREF 123456-G/PE",
    specialty: "Avaliação física e acompanhamento corporal",
    since: "2024-01-10",
    bio: "Profissional focado em avaliação física, evolução corporal e prescrição orientada por dados.",
  };

  function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    if (!year || !month || !day) return date;
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Perfil
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie suas informações profissionais e dados de exibição no sistema.
          </p>
        </div>

        <Button size="sm">
          <PencilLine className="mr-1.5 h-4 w-4" />
          Editar perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-card xl:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="gradient-primary flex h-24 w-24 items-center justify-center rounded-full">
              <span className="text-2xl font-bold text-primary-foreground">JS</span>
            </div>

            <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
              {professional.name}
            </h3>
            <p className="text-sm text-muted-foreground">{professional.role}</p>

            <Badge className="mt-3 bg-accent/10 text-accent hover:bg-accent/10">
              Profissional ativo
            </Badge>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {professional.bio}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card xl:col-span-2">
          <h3 className="font-heading text-base font-semibold text-foreground">
            Informações profissionais
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="h-4 w-4 text-muted-foreground" />
                E-mail
              </div>
              <p className="text-sm text-muted-foreground">{professional.email}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Telefone
              </div>
              <p className="text-sm text-muted-foreground">{professional.phone}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Award className="h-4 w-4 text-muted-foreground" />
                Registro profissional
              </div>
              <p className="text-sm text-muted-foreground">{professional.cref}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                Especialidade
              </div>
              <p className="text-sm text-muted-foreground">{professional.specialty}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                Ativo desde
              </div>
              <p className="text-sm text-muted-foreground">{formatDate(professional.since)}</p>
            </div>

            <div className="rounded-lg border bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <UserCircle2 className="h-4 w-4 text-muted-foreground" />
                Perfil de acesso
              </div>
              <p className="text-sm text-muted-foreground">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}