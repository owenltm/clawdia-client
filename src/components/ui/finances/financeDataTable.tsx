"use client";

import { DataTable } from "@/components/ui/data-table/DataTable";
import { Finance } from "@/types/finance.types";
import { financeColumns } from "./financeColumns";

interface FinanceTableProps {
  finances: Finance[];
}

export default function FinanceDataTable({ finances }: FinanceTableProps) {
  return (
    <DataTable columns={financeColumns} data={finances} />
  );
}