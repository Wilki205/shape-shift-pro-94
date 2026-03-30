export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: "M" | "F";
  goal: string;
  status: "active" | "inactive";
  avatarUrl?: string;
  lastAssessment?: string;
  totalAssessments: number;
  createdAt: string;
}

export type AssessmentMethod = "skinfolds" | "bioimpedance" | "both";

export interface Assessment {
  id: string;
  studentId: string;
  assessorName: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  bodyFat: number;
  leanMass: number;
  muscleMass: number;
  activityLevel: string;
  goal: string;

  method?: AssessmentMethod;
  protocol?: string;

  notes?: {
    generalNotes?: string;
    restrictions?: string;
  };

  circumferences?: {
    rightArm?: number;
    leftArm?: number;
    chest?: number;
    waist?: number;
    abdomen?: number;
    hips?: number;
    rightThigh?: number;
    leftThigh?: number;
    rightCalf?: number;
    leftCalf?: number;
  };

  skinfolds?: {
    triceps?: number;
    biceps?: number;
    subscapular?: number;
    suprailiac?: number;
    abdominal?: number;
    thigh?: number;
    calf?: number;
  };

  bioimpedance?: {
    bodyFatPercentage?: number;
    muscleMass?: number;
    leanMass?: number;
    bodyWater?: number;
    visceralFat?: number;
    basalMetabolicRate?: number;
    metabolicAge?: number;
  };
}

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana Carolina Silva",
    email: "ana@email.com",
    phone: "(11) 99999-0001",
    birthDate: "1995-03-15",
    gender: "F",
    goal: "Emagrecimento",
    status: "active",
    lastAssessment: "2026-03-20",
    totalAssessments: 4,
    createdAt: "2025-10-01",
  },
  {
    id: "2",
    name: "Carlos Eduardo Santos",
    email: "carlos@email.com",
    phone: "(11) 99999-0002",
    birthDate: "1990-07-22",
    gender: "M",
    goal: "Hipertrofia",
    status: "active",
    lastAssessment: "2026-03-18",
    totalAssessments: 3,
    createdAt: "2025-11-15",
  },
  {
    id: "3",
    name: "Mariana Oliveira",
    email: "mari@email.com",
    phone: "(11) 99999-0003",
    birthDate: "1998-11-08",
    gender: "F",
    goal: "Condicionamento",
    status: "active",
    lastAssessment: "2026-03-10",
    totalAssessments: 2,
    createdAt: "2026-01-05",
  },
  {
    id: "4",
    name: "Rafael Mendes",
    email: "rafael@email.com",
    phone: "(11) 99999-0004",
    birthDate: "1988-05-30",
    gender: "M",
    goal: "Emagrecimento",
    status: "inactive",
    lastAssessment: "2026-01-15",
    totalAssessments: 5,
    createdAt: "2025-06-20",
  },
  {
    id: "5",
    name: "Beatriz Lima",
    email: "bia@email.com",
    phone: "(11) 99999-0005",
    birthDate: "2000-01-12",
    gender: "F",
    goal: "Hipertrofia",
    status: "active",
    lastAssessment: "2026-03-25",
    totalAssessments: 1,
    createdAt: "2026-03-01",
  },
  {
    id: "6",
    name: "Fernando Costa",
    email: "fernando@email.com",
    phone: "(11) 99999-0006",
    birthDate: "1992-09-18",
    gender: "M",
    goal: "Saúde geral",
    status: "active",
    lastAssessment: "2026-03-22",
    totalAssessments: 6,
    createdAt: "2025-05-10",
  },
];

export const mockAssessments: Assessment[] = [
  {
    id: "a1",
    studentId: "1",
    assessorName: "Dr. João Silva",
    date: "2026-03-20",
    weight: 62,
    height: 165,
    bmi: 22.8,
    bodyFat: 24.5,
    leanMass: 46.8,
    muscleMass: 25.1,
    activityLevel: "Moderado",
    goal: "Emagrecimento",
    method: "both",
    protocol: "pollock-7-bio",
    notes: {
      generalNotes: "Boa evolução. Manter dieta e progressão de treinos.",
      restrictions: "Sem restrições relevantes no momento.",
    },
    circumferences: {
      rightArm: 28,
      leftArm: 27.5,
      chest: 88,
      waist: 68,
      abdomen: 72,
      hips: 96,
      rightThigh: 54,
      leftThigh: 53.5,
      rightCalf: 35,
      leftCalf: 34.5,
    },
    skinfolds: {
      triceps: 18,
      biceps: 8,
      subscapular: 14,
      suprailiac: 16,
      abdominal: 22,
      thigh: 28,
      calf: 12,
    },
    bioimpedance: {
      bodyFatPercentage: 24.1,
      muscleMass: 24.8,
      leanMass: 46.8,
      bodyWater: 51.2,
      visceralFat: 5,
      basalMetabolicRate: 1340,
      metabolicAge: 29,
    },
  },
  {
    id: "a2",
    studentId: "1",
    assessorName: "Dr. João Silva",
    date: "2026-01-20",
    weight: 65,
    height: 165,
    bmi: 23.9,
    bodyFat: 27.0,
    leanMass: 47.5,
    muscleMass: 24.2,
    activityLevel: "Moderado",
    goal: "Emagrecimento",
    method: "skinfolds",
    protocol: "pollock-7",
    notes: {
      generalNotes: "Início do programa com foco em redução de gordura.",
      restrictions: "Leve desconforto em exercícios de impacto.",
    },
    circumferences: {
      rightArm: 29,
      leftArm: 28.5,
      chest: 90,
      waist: 72,
      abdomen: 76,
      hips: 99,
      rightThigh: 56,
      leftThigh: 55.5,
      rightCalf: 36,
      leftCalf: 35.5,
    },
    skinfolds: {
      triceps: 22,
      biceps: 10,
      subscapular: 18,
      suprailiac: 20,
      abdominal: 28,
      thigh: 32,
      calf: 14,
    },
  },
  {
    id: "a3",
    studentId: "2",
    assessorName: "Dr. João Silva",
    date: "2026-03-18",
    weight: 82,
    height: 178,
    bmi: 25.9,
    bodyFat: 16.2,
    leanMass: 68.7,
    muscleMass: 38.5,
    activityLevel: "Intenso",
    goal: "Hipertrofia",
    method: "skinfolds",
    protocol: "pollock-3",
    notes: {
      generalNotes: "Aumento de massa significativo.",
      restrictions: "Sem restrições registradas.",
    },
    circumferences: {
      rightArm: 36,
      leftArm: 35.5,
      chest: 102,
      waist: 82,
      abdomen: 84,
      hips: 100,
      rightThigh: 60,
      leftThigh: 59.5,
      rightCalf: 38,
      leftCalf: 37.5,
    },
    skinfolds: {
      triceps: 10,
      abdominal: 14,
      thigh: 16,
    },
  },
  {
    id: "a4",
    studentId: "3",
    assessorName: "Dr. João Silva",
    date: "2026-03-10",
    weight: 71,
    height: 164,
    bmi: 26.4,
    bodyFat: 28.4,
    leanMass: 50.8,
    muscleMass: 26.5,
    activityLevel: "Leve",
    goal: "Condicionamento",
    method: "bioimpedance",
    protocol: "bioimpedancia-padrao",
    notes: {
      generalNotes: "Necessário reforçar consistência alimentar e rotina.",
      restrictions: "Dor lombar ocasional.",
    },
    circumferences: {
      rightArm: 30,
      leftArm: 29.5,
      chest: 92,
      waist: 79,
      abdomen: 83,
      hips: 101,
      rightThigh: 57,
      leftThigh: 56.5,
      rightCalf: 36,
      leftCalf: 35.5,
    },
    bioimpedance: {
      bodyFatPercentage: 28.4,
      muscleMass: 26.5,
      leanMass: 50.8,
      bodyWater: 47.3,
      visceralFat: 8,
      basalMetabolicRate: 1490,
      metabolicAge: 36,
    },
  },
];

export const dashboardStats = {
  totalStudents: 48,
  assessmentsThisMonth: 23,
  pendingReassessments: 7,
  averageEvolution: 12.4,
};

export const recentActivity = [
  {
    id: "1",
    student: "Ana Carolina Silva",
    action: "Avaliação realizada",
    date: "2026-03-20",
    type: "assessment" as const,
  },
  {
    id: "2",
    student: "Beatriz Lima",
    action: "Cadastro realizado",
    date: "2026-03-25",
    type: "registration" as const,
  },
  {
    id: "3",
    student: "Fernando Costa",
    action: "Avaliação realizada",
    date: "2026-03-22",
    type: "assessment" as const,
  },
  {
    id: "4",
    student: "Carlos Eduardo Santos",
    action: "Reavaliação pendente",
    date: "2026-03-28",
    type: "pending" as const,
  },
  {
    id: "5",
    student: "Mariana Oliveira",
    action: "Fotos adicionadas",
    date: "2026-03-10",
    type: "photo" as const,
  },
];

export const monthlyData = [
  { month: "Out", assessments: 12, students: 35 },
  { month: "Nov", assessments: 18, students: 38 },
  { month: "Dez", assessments: 15, students: 40 },
  { month: "Jan", assessments: 20, students: 42 },
  { month: "Fev", assessments: 22, students: 45 },
  { month: "Mar", assessments: 23, students: 48 },
];