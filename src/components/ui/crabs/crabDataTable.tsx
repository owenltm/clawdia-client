"use client";

import { DataTable } from "@/components/ui/data-table/DataTable";
import { Crab } from "@/types/crab.types";
import { crabColumns } from "./crabColumns";

interface CrabTableProps {
  crabs: Crab[];
}

export default function CrabTable({ crabs }: CrabTableProps) {
  return (
    <DataTable columns={crabColumns} data={crabs} />
  );
}