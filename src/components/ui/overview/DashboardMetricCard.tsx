import { Card } from "@/components/Card";
import React from "react";

interface DashboardMetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendIcon?: React.ReactNode;
  trendClassName?: string;
}

export function DashboardMetricCard({
  label,
  value,
  icon,
  trend,
  trendIcon,
  trendClassName = "text-green-600 dark:text-green-400",
}: DashboardMetricCardProps) {
  return (
    <Card className="flex items-center gap-4 p-6">
      {icon && (
        <div className="flex-shrink-0 rounded-full bg-blue-100 p-3">
          {icon}
        </div>
      )}
      <div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{value}</div>
        {trend && (
          <div className={`mt-1 text-xs flex items-center gap-1 ${trendClassName}`}>
            {trendIcon}
            {trend}
          </div>
        )}
      </div>
    </Card>
  );
}
