import {
  Mail,
  Phone,
  Briefcase,
  Award,
  CalendarDays,
  UserCircle2,
  PencilLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

function formatDate(date?: string) {
  if (!date) return "Não informado";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

function formatValue(value?: string, fallback = "Não informado") {
  return value && value.trim() ? value : fallback;
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-secondary/20 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}
        {label}
      </div>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  );
}

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
    accessProfile: "Administrador",
    status: "active",
  };

  const initials = professional.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const handleEditProfile = () => {
    toast.info("A edição de perfil será conectada em seguida.");
  };

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

        <Button size="sm" onClick={handleEditProfile}>
          <PencilLine className="mr-1.5 h-4 w-4" />
          Editar perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-card xl:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="gradient-primary flex h-24 w-24 items-center justify-center rounded-full">
              <span className="text-2xl font-bold text-primary-foreground">
                {initials || "PP"}
              </span>
            </div>

            <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
              {formatValue(professional.name)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatValue(professional.role)}
            </p>

            <Badge
              className={
                professional.status === "active"
                  ? "mt-3 bg-accent/10 text-accent hover:bg-accent/10"
                  : "mt-3"
              }
            >
              {professional.status === "active" ? "Profissional ativo" : "Perfil inativo"}
            </Badge>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {formatValue(professional.bio)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card xl:col-span-2">
          <h3 className="font-heading text-base font-semibold text-foreground">
            Informações profissionais
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoBox
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              label="E-mail"
              value={formatValue(professional.email)}
            />

            <InfoBox
              icon={<Phone className="h-4 w-4 text-muted-foreground" />}
              label="Telefone"
              value={formatValue(professional.phone)}
            />

            <InfoBox
              icon={<Award className="h-4 w-4 text-muted-foreground" />}
              label="Registro profissional"
              value={formatValue(professional.cref)}
            />

            <InfoBox
              icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
              label="Especialidade"
              value={formatValue(professional.specialty)}
            />

            <InfoBox
              icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
              label="Ativo desde"
              value={formatDate(professional.since)}
            />

            <InfoBox
              icon={<UserCircle2 className="h-4 w-4 text-muted-foreground" />}
              label="Perfil de acesso"
              value={formatValue(professional.accessProfile)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}