import { Activity, ArrowRight, BarChart3, ClipboardList, Shield, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: ClipboardList, title: "Avaliações Completas", desc: "Registre peso, medidas, dobras cutâneas, composição corporal e fotos de progresso." },
  { icon: BarChart3, title: "Relatórios Visuais", desc: "Gráficos de evolução, comparações entre avaliações e exportação em PDF." },
  { icon: Users, title: "Gestão de Alunos", desc: "Cadastro completo, histórico organizado e busca rápida por qualquer aluno." },
  { icon: Smartphone, title: "Mobile-First", desc: "Experiência otimizada para uso no atendimento presencial, em qualquer dispositivo." },
  { icon: Shield, title: "Seguro e Privado", desc: "Controle de acesso por perfil, dados protegidos e conformidade com boas práticas." },
  { icon: Activity, title: "Evolução em Tempo Real", desc: "Acompanhe o progresso dos seus alunos com dashboards inteligentes." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
              <Activity className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground tracking-tight">PhysiQ Pro</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>Entrar</Button>
            <Button size="sm" onClick={() => navigate("/dashboard")}>
              Começar agora <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block mb-4 px-3 py-1 rounded-full border text-xs font-medium text-muted-foreground bg-secondary">
              Plataforma profissional de avaliação física
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Avaliações físicas{" "}
              <span className="text-accent">profissionais</span>{" "}
              de forma simples
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Organize seus alunos, registre avaliações completas, acompanhe a evolução corporal e gere relatórios visuais — tudo em um só lugar.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" onClick={() => navigate("/dashboard")}>
                Acessar plataforma <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button size="lg" variant="outline">Saiba mais</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 lg:px-8 bg-secondary/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground">Tudo que você precisa</h2>
            <p className="mt-2 text-muted-foreground">Ferramentas profissionais para elevar seu atendimento</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Pronto para profissionalizar suas avaliações?
          </h2>
          <p className="text-muted-foreground mb-8">
            Comece gratuitamente e descubra como o PhysiQ Pro pode transformar seu atendimento.
          </p>
          <Button size="lg" onClick={() => navigate("/dashboard")}>
            Começar agora — é grátis <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" />
            <span className="font-heading font-semibold text-foreground">PhysiQ Pro</span>
          </div>
          <p>© 2026 PhysiQ Pro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
