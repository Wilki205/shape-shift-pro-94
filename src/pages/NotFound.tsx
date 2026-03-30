import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.warn("Rota não encontrada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <SearchX className="h-7 w-7" />
        </div>

        <p className="text-sm font-medium text-accent">Erro 404</p>

        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Página não encontrada
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A rota <span className="font-medium text-foreground">{location.pathname}</span> não existe
          ou foi removida.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/dashboard">
              <Home className="mr-1.5 h-4 w-4" />
              Ir para o dashboard
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Voltar ao início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}