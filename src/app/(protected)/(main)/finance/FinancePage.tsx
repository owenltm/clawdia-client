"use client";

import { Finance } from "@/types/finance.types";

type FinancePageProps = {
  finances: Finance[],
  onSubmit: (finance: Omit<Finance, "id">) => Promise<boolean>,
  onEdit: (id: number, finance: Omit<Finance, "id">) => Promise<boolean>,
  onDelete: (id: number) => Promise<boolean>,
}

export default function FinancePage(_params: FinancePageProps) {

}