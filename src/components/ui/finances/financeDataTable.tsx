"use client";

import { DataTable } from "@/components/ui/data-table/DataTable";
import { Finance } from "@/types/finance.types";
import { getFinanceColumns } from "./financeColumns";

interface FinanceTableProps {
  finances: Finance[];
  onFocusFinanceAction?: (id: number) => void;
  onDeleteFinanceAction?: (id: number) => void;
}

export default function FinanceDataTable({ finances, onFocusFinanceAction, onDeleteFinanceAction }: FinanceTableProps) {
  return (
    <DataTable columns={getFinanceColumns({ onFocusFinanceAction, onDeleteFinanceAction })} data={finances} />
  );
}