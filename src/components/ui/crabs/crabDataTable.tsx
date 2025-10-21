"use client";

import { DataTable } from "@/components/ui/data-table/DataTable";
import { useCrabContext } from "@/contexts/CrabContext";
import { Crab } from "@/types/crab.types";
import { getCrabColumns } from "./crabColumns";

interface CrabTableProps {
  crabs: Crab[];
}

export default function CrabTable({ crabs }: CrabTableProps) {
  const { updateFocusedCrab } = useCrabContext();

  const onEditActionClicked = (id: number) => {
    const crabToEdit = crabs.find((crab) => crab.id === id) || null;
    updateFocusedCrab(crabToEdit);
  }

  return (
    <DataTable columns={getCrabColumns({
      onEditActionClicked,
      onDeleteActionClicked: (id: number) => { },
    })} data={crabs} />
  );
}