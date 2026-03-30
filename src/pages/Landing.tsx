import {
  Activity,
  ArrowRight,
  BarChart3,
  ClipboardList,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    icon: ClipboardList,
    title: "Avaliações Completas",
    desc: "Registre peso, medidas, dobras cutâneas, composição corporal e fotos de progresso.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Visuais",
    desc: "Gráficos de evolução, comparações entre avaliações e exportação em PDF.",
  },
  {
    icon: Users,
    title: "Gestão de Alunos",
    desc: "Cadastro completo, histórico organizado e busca rápida por qualquer aluno.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    desc: "Experiência otimizada para uso no atendimento presencial, em qualquer dispositivo.",
  },
  {
    icon: Shield,
    title: "Seguro e Privado",
    desc: "Controle de acesso por perfil, dados protegidos e conformidade com boas práticas.",
  },
  {
    icon: Activity,
    title: "Evolução em Tempo Real",
    desc: "Acompanhe o progresso dos seus alunos com dashboards inteligentes.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
};

function LandingNavbar({ onStart }: { onStart: () => void }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="gradient-accent flex h-8 w-8 items-center justify-center rounded-lg">
            <Activity className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            PhysiQ Pro
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onStart}>
            Entrar
          </Button>
          <Button size="sm" onClick={onStart}>
            Começar agora
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({
  onStart,
  onLearnMore,
}: {
  onStart: () => void;
  onLearnMore: () => void;
}) {
  return (
    <section className="px-4 pb-20 pt-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            Plataforma profissional de avaliação física
          </span>

          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Avaliações físicas{" "}
            <span className="text-accent">profissionais</span>{" "}
            de forma simples
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Organize seus alunos, registre avaliações completas, acompanhe a
            evolução corporal e gere relatórios visuais — tudo em um só lugar.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={onStart}>
              Acessar plataforma
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            <Button size="lg" variant="outline" onClick={onLearnMore}>
              Saiba mais
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="rounded-xl border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1.5 font-heading text-base font-semibold text-foreground">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feature.desc}
      </p>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-secondary/40 px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Tudo que você precisa
          </h2>
          <p className="mt-2 text-muted-foreground">
            Ferramentas profissionais para elevar seu atendimento
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">
          Pronto para profissionalizar suas avaliações?
        </h2>
        <p className="mb-8 text-muted-foreground">
          Comece gratuitamente e descubra como o PhysiQ Pro pode transformar seu
          atendimento.
        </p>
        <Button size="lg" onClick={onStart}>
          Começar agora — é grátis
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t px-4 py-8 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          <span className="font-heading font-semibold text-foreground">
            PhysiQ Pro
          </span>
        </div>
        <p>© 2026 PhysiQ Pro. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/dashboard");
  };

  const handleLearnMore = () => {
    const section = document.getElementById("features");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar onStart={handleStart} />
      <HeroSection onStart={handleStart} onLearnMore={handleLearnMore} />
      <FeaturesSection />
      <CtaSection onStart={handleStart} />
      <LandingFooter />
    </div>
  );
}