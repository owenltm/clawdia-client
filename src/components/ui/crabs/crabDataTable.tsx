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

  const onDeleteActionClicked = (id: number) => {
    // TODO: Implement delete action
    console.log("Delete action clicked for crab with ID:", id);
  }

  return (
    <DataTable columns={getCrabColumns({
      onEditActionClicked,
      onDeleteActionClicked
    })} data={crabs} />
  );
}