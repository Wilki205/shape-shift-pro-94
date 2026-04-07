import { useMemo, useState } from "react";
import {
  CalendarClock,
  Plus,
  Clock3,
  UserRound,
  BellRing,
  Search,
  CheckCircle2,
  Eye,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockStudents } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AppointmentStatus = "confirmed" | "pending";
type AppointmentFilter = "all" | "confirmed" | "pending";

type Appointment = {
  id: string;
  studentId: string;
  date: string;
  time: string;
  type: string;
  status: AppointmentStatus;
};

type NewAppointmentForm = {
  studentId: string;
  date: string;
  time: string;
  type: string;
  status: AppointmentStatus;
};

const initialAppointments: Appointment[] = [
  {
    id: "1",
    studentId: "1",
    date: "2026-03-31",
    time: "08:00",
    type: "Reavaliação",
    status: "confirmed",
  },
  {
    id: "2",
    studentId: "2",
    date: "2026-03-31",
    time: "10:30",
    type: "Avaliação inicial",
    status: "confirmed",
  },
  {
    id: "3",
    studentId: "3",
    date: "2026-04-01",
    time: "14:00",
    type: "Retorno",
    status: "pending",
  },
  {
    id: "4",
    studentId: "4",
    date: "2026-04-02",
    time: "16:00",
    type: "Reavaliação",
    status: "confirmed",
  },
];

function formatDate(date?: string) {
  if (!date) return "Não informado";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
}

function getStatusLabel(status: AppointmentStatus) {
  return status === "confirmed" ? "Confirmado" : "Pendente";
}

function getStatusClass(status: AppointmentStatus) {
  return status === "confirmed"
    ? "border-success/20 bg-success/10 text-success"
    : "border-warning/20 bg-warning/10 text-warning";
}

function sortAppointments(items: Appointment[]) {
  return [...items].sort((a, b) => {
    const aDate = `${a.date}T${a.time}`;
    const bDate = `${b.date}T${b.time}`;
    return aDate.localeCompare(bDate);
  });
}

function getEmptyAppointment(studentId = ""): NewAppointmentForm {
  return {
    studentId,
    date: "",
    time: "",
    type: "Reavaliação",
    status: "pending",
  };
}

export default function Schedule() {
  const navigate = useNavigate();
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AppointmentFilter>("all");
  const [isCreating, setIsCreating] = useState(false);

  const [newAppointment, setNewAppointment] = useState<NewAppointmentForm>(
    getEmptyAppointment(mockStudents[0]?.id || ""),
  );

  const orderedAppointments = useMemo(
    () => sortAppointments(appointments),
    [appointments],
  );

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orderedAppointments.filter((appointment) => {
      const student = mockStudents.find((s) => s.id === appointment.studentId);
      const studentName = student?.name.toLowerCase() || "";
      const typeName = appointment.type.toLowerCase();

      const matchesSearch =
        studentName.includes(normalizedSearch) ||
        typeName.includes(normalizedSearch);

      const matchesFilter =
        filter === "all" || appointment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orderedAppointments, search, filter]);

  const confirmedCount = appointments.filter(
    (item) => item.status === "confirmed",
  ).length;

  const pendingCount = appointments.filter(
    (item) => item.status === "pending",
  ).length;

  const nextAppointment = orderedAppointments[0];

  const handleOpenCreate = () => {
    setIsCreating((prev) => !prev);

    if (isCreating) {
      setNewAppointment(getEmptyAppointment(mockStudents[0]?.id || ""));
    }
  };

  const handleCloseCreate = () => {
    setIsCreating(false);
    setNewAppointment(getEmptyAppointment(mockStudents[0]?.id || ""));
  };

  const handleConfirmAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "confirmed" }
          : appointment,
      ),
    );

    toast.success("Agendamento confirmado com sucesso.");
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== appointmentId),
    );

    toast.success("Agendamento removido com sucesso.");
  };

  const handleViewStudent = (studentId: string) => {
    navigate(`/students/${studentId}`);
  };

  const handleCreateAppointment = () => {
    if (!newAppointment.studentId || !newAppointment.date || !newAppointment.time) {
      toast.error("Preencha aluno, data e horário.");
      return;
    }

    const appointmentDateTime = new Date(`${newAppointment.date}T${newAppointment.time}`);
    if (Number.isNaN(appointmentDateTime.getTime())) {
      toast.error("Informe uma data e horário válidos.");
      return;
    }

    const now = new Date();
    if (appointmentDateTime < now) {
      toast.error("Não é possível criar agendamento no passado.");
      return;
    }

    const hasConflict = appointments.some(
      (appointment) =>
        appointment.studentId === newAppointment.studentId &&
        appointment.date === newAppointment.date &&
        appointment.time === newAppointment.time,
    );

    if (hasConflict) {
      toast.error("Já existe um agendamento desse aluno nesse mesmo horário.");
      return;
    }

    const createdAppointment: Appointment = {
      id: String(Date.now()),
      studentId: newAppointment.studentId,
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      status: newAppointment.status,
    };

    setAppointments((prev) => sortAppointments([...prev, createdAppointment]));
    handleCloseCreate();
    toast.success("Novo agendamento criado com sucesso.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Agenda
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize avaliações, reavaliações e acompanhamentos dos seus alunos.
          </p>
        </div>

        <Button size="sm" onClick={handleOpenCreate}>
          <Plus className="mr-1.5 h-4 w-4" />
          {isCreating ? "Fechar agendamento" : "Novo agendamento"}
        </Button>
      </div>

      {isCreating && (
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="mb-4">
            <h3 className="font-heading text-base font-semibold text-foreground">
              Novo agendamento
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Cadastre um novo atendimento para um aluno.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="space-y-1.5">
              <Label>Aluno</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newAppointment.studentId}
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    studentId: e.target.value,
                  }))
                }
              >
                {mockStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label>Data</Label>
              <Input
                type="date"
                value={newAppointment.date}
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label>Horário</Label>
              <Input
                type="time"
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newAppointment.type}
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
              >
                <option value="Avaliação inicial">Avaliação inicial</option>
                <option value="Reavaliação">Reavaliação</option>
                <option value="Retorno">Retorno</option>
                <option value="Consulta">Consulta</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={newAppointment.status}
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    status: e.target.value as AppointmentStatus,
                  }))
                }
              >
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" onClick={handleCloseCreate}>
              Cancelar
            </Button>
            <Button onClick={handleCreateAppointment}>
              <Plus className="mr-1.5 h-4 w-4" />
              Salvar agendamento
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarClock className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Agendamentos</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {appointments.length}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
            <Clock3 className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Confirmados</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {confirmedCount}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
            <BellRing className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Pendentes</p>
          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <UserRound className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">Próximo atendimento</p>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">
            {nextAppointment
              ? `${formatDate(nextAppointment.date)} • ${nextAppointment.time}`
              : "Não informado"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por aluno ou tipo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["all", "confirmed", "pending"] as const).map((currentFilter) => (
            <Button
              key={currentFilter}
              variant={filter === currentFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(currentFilter)}
            >
              {currentFilter === "all"
                ? "Todos"
                : currentFilter === "confirmed"
                ? "Confirmados"
                : "Pendentes"}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Próximos atendimentos
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredAppointments.length} de {appointments.length} agendamentos exibidos
            </p>
          </div>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="divide-y">
            {filteredAppointments.map((appointment) => {
              const student = mockStudents.find((s) => s.id === appointment.studentId);

              return (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <CalendarClock className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {student?.name || "Aluno não encontrado"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground sm:gap-6">
                    <div>
                      <span className="font-medium text-foreground">
                        {formatDate(appointment.date)}
                      </span>{" "}
                      data
                    </div>
                    <div>
                      <span className="font-medium text-foreground">
                        {appointment.time}
                      </span>{" "}
                      horário
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={getStatusClass(appointment.status)}
                    >
                      {getStatusLabel(appointment.status)}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewStudent(appointment.studentId)}
                    >
                      <Eye className="mr-1.5 h-4 w-4" />
                      Ver aluno
                    </Button>

                    {appointment.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => handleConfirmAppointment(appointment.id)}
                      >
                        <CheckCircle2 className="mr-1.5 h-4 w-4" />
                        Confirmar
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      <XCircle className="mr-1.5 h-4 w-4" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <CalendarClock className="mb-3 h-10 w-10 opacity-30" />
            <p className="font-medium">Nenhum agendamento encontrado</p>
            <p className="text-sm">Tente ajustar a busca ou os filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  );
}