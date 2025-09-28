import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: "good" | "warning" | "danger" | "neutral";
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
}

const statusClasses = {
  good: "border-l-success bg-success/5 text-success-foreground",
  warning: "border-l-warning bg-warning/5 text-warning-foreground", 
  danger: "border-l-destructive bg-destructive/5 text-destructive-foreground",
  neutral: "border-l-muted-foreground bg-muted/30"
};

const trendClasses = {
  up: "text-success",
  down: "text-destructive", 
  stable: "text-muted-foreground"
};

export function StatCard({
  title,
  value,
  unit,
  status = "neutral",
  trend,
  trendValue,
  icon,
  className
}: StatCardProps) {
  return (
    <Card className={cn(
      "border-l-4 transition-all duration-300 hover:shadow-card-soft",
      statusClasses[status],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold">
                {value}
              </span>
              {unit && (
                <span className="text-sm text-muted-foreground">
                  {unit}
                </span>
              )}
            </div>
            {trend && trendValue && (
              <div className={cn(
                "flex items-center text-sm",
                trendClasses[trend]
              )}>
                <span className="font-medium">{trendValue}</span>
                <span className="ml-1 text-muted-foreground">
                  vs last week
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}