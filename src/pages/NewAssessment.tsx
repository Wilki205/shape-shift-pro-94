import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockStudents } from "@/lib/mock-data";
import { toast } from "sonner";

const steps = [
  "Dados Gerais",
  "Composição Corporal",
  "Circunferências",
  "Método de Avaliação",
  "Observações",
] as const;

type AssessmentMethod = "skinfolds" | "bioimpedance" | "both";

type AssessmentFormData = {
  general: {
    date: string;
    evaluator: string;
    goal: string;
    activityLevel: string;
    assessmentMethod: AssessmentMethod;
    protocol: string;
  };
  bodyComposition: {
    weight: string;
    height: string;
    bmi: string;
    bodyFatPercentage: string;
    leanMass: string;
    muscleMass: string;
  };
  circumferences: {
    rightArm: string;
    leftArm: string;
    chest: string;
    waist: string;
    abdomen: string;
    hips: string;
    rightThigh: string;
    leftThigh: string;
    rightCalf: string;
    leftCalf: string;
  };
  skinfolds: {
    triceps: string;
    biceps: string;
    subscapular: string;
    suprailiac: string;
    abdominal: string;
    thigh: string;
    calf: string;
  };
  bioimpedance: {
    bodyFatPercentage: string;
    muscleMass: string;
    leanMass: string;
    bodyWater: string;
    visceralFat: string;
    basalMetabolicRate: string;
    metabolicAge: string;
  };
  notes: {
    generalNotes: string;
    restrictions: string;
  };
};

const skinfoldFieldConfig = {
  "pollock-3": [
    { key: "triceps", label: "Tríceps" },
    { key: "abdominal", label: "Abdominal" },
    { key: "thigh", label: "Coxa" },
  ],
  "pollock-7": [
    { key: "triceps", label: "Tríceps" },
    { key: "biceps", label: "Bíceps" },
    { key: "subscapular", label: "Subescapular" },
    { key: "suprailiac", label: "Suprailíaca" },
    { key: "abdominal", label: "Abdominal" },
    { key: "thigh", label: "Coxa" },
    { key: "calf", label: "Panturrilha" },
  ],
  faulkner: [
    { key: "triceps", label: "Tríceps" },
    { key: "subscapular", label: "Subescapular" },
    { key: "suprailiac", label: "Suprailíaca" },
    { key: "abdominal", label: "Abdominal" },
  ],
  "jackson-pollock": [
    { key: "triceps", label: "Tríceps" },
    { key: "biceps", label: "Bíceps" },
    { key: "subscapular", label: "Subescapular" },
    { key: "suprailiac", label: "Suprailíaca" },
    { key: "abdominal", label: "Abdominal" },
    { key: "thigh", label: "Coxa" },
    { key: "calf", label: "Panturrilha" },
  ],
  "pollock-7-bio": [
    { key: "triceps", label: "Tríceps" },
    { key: "biceps", label: "Bíceps" },
    { key: "subscapular", label: "Subescapular" },
    { key: "suprailiac", label: "Suprailíaca" },
    { key: "abdominal", label: "Abdominal" },
    { key: "thigh", label: "Coxa" },
    { key: "calf", label: "Panturrilha" },
  ],
  "faulkner-bio": [
    { key: "triceps", label: "Tríceps" },
    { key: "subscapular", label: "Subescapular" },
    { key: "suprailiac", label: "Suprailíaca" },
    { key: "abdominal", label: "Abdominal" },
  ],
  personalizado: [
    { key: "triceps", label: "Tríceps" },
    { key: "biceps", label: "Bíceps" },
    { key: "subscapular", label: "Subescapular" },
    { key: "suprailiac", label: "Suprailíaca" },
    { key: "abdominal", label: "Abdominal" },
    { key: "thigh", label: "Coxa" },
    { key: "calf", label: "Panturrilha" },
  ],
} as const;

type SkinfoldKey = keyof AssessmentFormData["skinfolds"];

const emptySkinfolds: AssessmentFormData["skinfolds"] = {
  triceps: "",
  biceps: "",
  subscapular: "",
  suprailiac: "",
  abdominal: "",
  thigh: "",
  calf: "",
};

function AssessmentField({
  label,
  unit,
  placeholder,
  value,
  onChange,
  readOnly = false,
}: {
  label: string;
  unit?: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          placeholder={placeholder || "0"}
          className="pr-10"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function StudentNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-muted-foreground">
      <p className="font-heading text-lg font-semibold">Aluno não encontrado</p>
      <Button variant="outline" className="mt-4" onClick={onBack}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Voltar
      </Button>
    </div>
  );
}

export default function NewAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = mockStudents.find((s) => s.id === id);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<AssessmentFormData>({
    general: {
      date: new Date().toISOString().slice(0, 10),
      evaluator: "Dr. João Silva",
      goal: student?.goal || "",
      activityLevel: "",
      assessmentMethod: "both",
      protocol: "personalizado",
    },
    bodyComposition: {
      weight: "",
      height: "",
      bmi: "",
      bodyFatPercentage: "",
      leanMass: "",
      muscleMass: "",
    },
    circumferences: {
      rightArm: "",
      leftArm: "",
      chest: "",
      waist: "",
      abdomen: "",
      hips: "",
      rightThigh: "",
      leftThigh: "",
      rightCalf: "",
      leftCalf: "",
    },
    skinfolds: {
      triceps: "",
      biceps: "",
      subscapular: "",
      suprailiac: "",
      abdominal: "",
      thigh: "",
      calf: "",
    },
    bioimpedance: {
      bodyFatPercentage: "",
      muscleMass: "",
      leanMass: "",
      bodyWater: "",
      visceralFat: "",
      basalMetabolicRate: "",
      metabolicAge: "",
    },
    notes: {
      generalNotes: "",
      restrictions: "",
    },
  });

  const updateGeneralField = <K extends keyof AssessmentFormData["general"]>(
    field: K,
    value: AssessmentFormData["general"][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value,
      },
    }));
  };

  const updateBodyCompositionField = <
    K extends keyof AssessmentFormData["bodyComposition"]
  >(
    field: K,
    value: AssessmentFormData["bodyComposition"][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      bodyComposition: {
        ...prev.bodyComposition,
        [field]: value,
      },
    }));
  };

  const updateCircumferenceField = <
    K extends keyof AssessmentFormData["circumferences"]
  >(
    field: K,
    value: AssessmentFormData["circumferences"][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      circumferences: {
        ...prev.circumferences,
        [field]: value,
      },
    }));
  };

  const updateSkinfoldField = <K extends keyof AssessmentFormData["skinfolds"]>(
    field: K,
    value: AssessmentFormData["skinfolds"][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      skinfolds: {
        ...prev.skinfolds,
        [field]: value,
      },
    }));
  };

  const updateBioimpedanceField = <
    K extends keyof AssessmentFormData["bioimpedance"]
  >(
    field: K,
    value: AssessmentFormData["bioimpedance"][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      bioimpedance: {
        ...prev.bioimpedance,
        [field]: value,
      },
    }));
  };

  const updateNotesField = <K extends keyof AssessmentFormData["notes"]>(
    field: K,
    value: AssessmentFormData["notes"][K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [field]: value,
      },
    }));
  };

  const calculatedBmi = useMemo(() => {
    const weight = Number(formData.bodyComposition.weight);
    const heightCm = Number(formData.bodyComposition.height);

    if (!weight || !heightCm) return "";

    const heightM = heightCm / 100;
    if (!heightM) return "";

    const bmi = weight / (heightM * heightM);
    return bmi.toFixed(2);
  }, [formData.bodyComposition.weight, formData.bodyComposition.height]);

  const method = formData.general.assessmentMethod;
  const showSkinfolds = method === "skinfolds" || method === "both";
  const showBioimpedance = method === "bioimpedance" || method === "both";

  const activeSkinfoldFields =
    skinfoldFieldConfig[
      (formData.general.protocol || "personalizado") as keyof typeof skinfoldFieldConfig
    ] || skinfoldFieldConfig.personalizado;

  if (!student) {
    return <StudentNotFound onBack={() => navigate("/students")} />;
  }

  const handleSave = () => {
    const payload = {
      ...formData,
      bodyComposition: {
        ...formData.bodyComposition,
        bmi: calculatedBmi,
      },
    };

    console.log("Assessment payload:", payload);
    toast.success("Avaliação salva com sucesso!");
    navigate(`/students/${id}`);
  };

  const goToPreviousStep = () => {
    setStep((current) => current - 1);
  };

  const goToNextStep = () => {
    setStep((current) => current + 1);
  };

  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/students/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Nova Avaliação Física
          </h2>
          <p className="text-sm text-muted-foreground">{student.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              index === step
                ? "bg-primary text-primary-foreground"
                : index < step
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px] font-bold">
                {index + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-5 rounded-xl border bg-card p-6 shadow-card">
        {step === 0 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Dados Gerais
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Data da Avaliação</Label>
                <Input
                  type="date"
                  value={formData.general.date}
                  onChange={(e) => updateGeneralField("date", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Avaliador</Label>
                <Input
                  value={formData.general.evaluator}
                  onChange={(e) => updateGeneralField("evaluator", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Objetivo do Aluno</Label>
                <Input
                  value={formData.general.goal}
                  onChange={(e) => updateGeneralField("goal", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Nível de Atividade</Label>
                <Input
                  placeholder="Sedentário, Leve, Moderado, Intenso"
                  value={formData.general.activityLevel}
                  onChange={(e) => updateGeneralField("activityLevel", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Método de Avaliação</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.general.assessmentMethod}
                  onChange={(e) => {
                    const newMethod = e.target.value as AssessmentMethod;

                    setFormData((prev) => ({
                      ...prev,
                      general: {
                        ...prev.general,
                        assessmentMethod: newMethod,
                        protocol:
                          newMethod === "skinfolds"
                            ? "pollock-3"
                            : newMethod === "bioimpedance"
                            ? "bioimpedancia-padrao"
                            : "personalizado",
                      },
                      skinfolds: emptySkinfolds,
                    }));
                  }}
                >
                  <option value="skinfolds">Dobras cutâneas</option>
                  <option value="bioimpedance">Bioimpedância</option>
                  <option value="both">Dobras + Bioimpedância</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Protocolo</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.general.protocol}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      general: {
                        ...prev.general,
                        protocol: e.target.value,
                      },
                      skinfolds: emptySkinfolds,
                    }))
                  }
                >
                  {method === "skinfolds" && (
                    <>
                      <option value="pollock-3">Pollock 3 dobras</option>
                      <option value="pollock-7">Pollock 7 dobras</option>
                      <option value="faulkner">Faulkner</option>
                      <option value="jackson-pollock">Jackson & Pollock</option>
                    </>
                  )}

                  {method === "bioimpedance" && (
                    <>
                      <option value="bioimpedancia-padrao">Bioimpedância padrão</option>
                      <option value="tanita">Bioimpedância Tanita</option>
                      <option value="inbody">Bioimpedância InBody</option>
                    </>
                  )}

                  {method === "both" && (
                    <>
                      <option value="personalizado">Protocolo combinado personalizado</option>
                      <option value="pollock-7-bio">Pollock 7 + Bioimpedância</option>
                      <option value="faulkner-bio">Faulkner + Bioimpedância</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Composição Corporal
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AssessmentField
                label="Peso"
                unit="kg"
                value={formData.bodyComposition.weight}
                onChange={(value) => updateBodyCompositionField("weight", value)}
              />
              <AssessmentField
                label="Altura"
                unit="cm"
                value={formData.bodyComposition.height}
                onChange={(value) => updateBodyCompositionField("height", value)}
              />
              <AssessmentField
                label="IMC"
                unit="kg/m²"
                value={calculatedBmi}
                readOnly
              />
              <AssessmentField
                label="Percentual de Gordura"
                unit="%"
                value={formData.bodyComposition.bodyFatPercentage}
                onChange={(value) =>
                  updateBodyCompositionField("bodyFatPercentage", value)
                }
              />
              <AssessmentField
                label="Massa Magra"
                unit="kg"
                value={formData.bodyComposition.leanMass}
                onChange={(value) => updateBodyCompositionField("leanMass", value)}
              />
              <AssessmentField
                label="Massa Muscular"
                unit="kg"
                value={formData.bodyComposition.muscleMass}
                onChange={(value) => updateBodyCompositionField("muscleMass", value)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Circunferências Corporais
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AssessmentField label="Braço Direito" unit="cm" value={formData.circumferences.rightArm} onChange={(value) => updateCircumferenceField("rightArm", value)} />
              <AssessmentField label="Braço Esquerdo" unit="cm" value={formData.circumferences.leftArm} onChange={(value) => updateCircumferenceField("leftArm", value)} />
              <AssessmentField label="Peitoral" unit="cm" value={formData.circumferences.chest} onChange={(value) => updateCircumferenceField("chest", value)} />
              <AssessmentField label="Cintura" unit="cm" value={formData.circumferences.waist} onChange={(value) => updateCircumferenceField("waist", value)} />
              <AssessmentField label="Abdômen" unit="cm" value={formData.circumferences.abdomen} onChange={(value) => updateCircumferenceField("abdomen", value)} />
              <AssessmentField label="Quadril" unit="cm" value={formData.circumferences.hips} onChange={(value) => updateCircumferenceField("hips", value)} />
              <AssessmentField label="Coxa Direita" unit="cm" value={formData.circumferences.rightThigh} onChange={(value) => updateCircumferenceField("rightThigh", value)} />
              <AssessmentField label="Coxa Esquerda" unit="cm" value={formData.circumferences.leftThigh} onChange={(value) => updateCircumferenceField("leftThigh", value)} />
              <AssessmentField label="Panturrilha Direita" unit="cm" value={formData.circumferences.rightCalf} onChange={(value) => updateCircumferenceField("rightCalf", value)} />
              <AssessmentField label="Panturrilha Esquerda" unit="cm" value={formData.circumferences.leftCalf} onChange={(value) => updateCircumferenceField("leftCalf", value)} />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Coleta e Protocolo
            </h3>

            {showSkinfolds && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">
                  Dobras Cutâneas
                </h4>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {activeSkinfoldFields.map((field) => (
                    <AssessmentField
                      key={field.key}
                      label={field.label}
                      unit="mm"
                      value={formData.skinfolds[field.key as SkinfoldKey]}
                      onChange={(value) =>
                        updateSkinfoldField(field.key as SkinfoldKey, value)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {showBioimpedance && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Bioimpedância</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <AssessmentField label="Percentual de Gordura" unit="%" value={formData.bioimpedance.bodyFatPercentage} onChange={(value) => updateBioimpedanceField("bodyFatPercentage", value)} />
                  <AssessmentField label="Massa Muscular" unit="kg" value={formData.bioimpedance.muscleMass} onChange={(value) => updateBioimpedanceField("muscleMass", value)} />
                  <AssessmentField label="Massa Magra" unit="kg" value={formData.bioimpedance.leanMass} onChange={(value) => updateBioimpedanceField("leanMass", value)} />
                  <AssessmentField label="Água Corporal" unit="%" value={formData.bioimpedance.bodyWater} onChange={(value) => updateBioimpedanceField("bodyWater", value)} />
                  <AssessmentField label="Gordura Visceral" value={formData.bioimpedance.visceralFat} onChange={(value) => updateBioimpedanceField("visceralFat", value)} />
                  <AssessmentField label="Metabolismo Basal" unit="kcal" value={formData.bioimpedance.basalMetabolicRate} onChange={(value) => updateBioimpedanceField("basalMetabolicRate", value)} />
                  <AssessmentField label="Idade Metabólica" unit="anos" value={formData.bioimpedance.metabolicAge} onChange={(value) => updateBioimpedanceField("metabolicAge", value)} />
                </div>
              </div>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="font-heading text-base font-semibold text-foreground">
              Observações
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Observações Gerais</Label>
                <Textarea
                  rows={4}
                  placeholder="Anotações sobre o aluno, restrições, recomendações..."
                  value={formData.notes.generalNotes}
                  onChange={(e) => updateNotesField("generalNotes", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Restrições / Observações Importantes</Label>
                <Textarea
                  rows={3}
                  placeholder="Lesões, limitações, alergias..."
                  value={formData.notes.restrictions}
                  onChange={(e) => updateNotesField("restrictions", e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-between border-t pt-4">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={goToPreviousStep}>
            Anterior
          </Button>

          <span className="text-xs text-muted-foreground">
            Etapa {step + 1} de {steps.length}
          </span>

          {step < steps.length - 1 ? (
            <Button size="sm" onClick={goToNextStep}>
              Próxima
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleSave}>
              <Save className="mr-1.5 h-4 w-4" />
              Salvar Avaliação
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}