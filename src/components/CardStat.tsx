"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardStatProps {
  title: string;
  value: string | number;
  isLoading?: boolean;
  icon?: React.ReactNode;
  trend?: {
    direction: "up" | "down";
    percent: number;
  };
}

export function CardStat({
  title,
  value,
  isLoading,
  icon,
  trend,
}: CardStatProps) {
  return (
    <Card className="p-4">
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{title}</span>
          {icon}
        </div>
        <div className="text-2xl font-semibold">
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : value}
        </div>
        {trend && (
          <div
            className={cn(
              "text-sm font-medium flex items-center",
              trend.direction === "up" ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            {trend.percent}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}
