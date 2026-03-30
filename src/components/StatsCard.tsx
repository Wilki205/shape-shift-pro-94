import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "default" | "accent" | "primary";
}

function getIconContainerClass(variant: StatsCardProps["variant"]) {
  switch (variant) {
    case "accent":
      return "bg-accent/10 text-accent";
    case "primary":
      return "gradient-primary text-primary-foreground";
    case "default":
    default:
      return "bg-secondary text-muted-foreground";
  }
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="font-heading text-2xl font-bold text-foreground">
            {value}
          </p>

          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}

          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-success" : "text-destructive",
              )}
            >
              {trend.positive ? "+" : ""}
              {trend.value}% vs mês anterior
            </p>
          )}
        </div>

        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            getIconContainerClass(variant),
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}