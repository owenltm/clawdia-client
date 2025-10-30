"use client";

import { DataTable } from "@/components/ui/data-table/DataTable";
import { useCrabContext } from "@/contexts/CrabContext";
import useConfirmModal from "@/hooks/useConfirmModal";
import { deleteCrab } from "@/services/crabService";
import { Crab } from "@/types/crab.types";
import { getCrabColumns } from "./crabColumns";

interface CrabTableProps {
  crabs: Crab[];
}

export default function CrabTable({ crabs }: CrabTableProps) {
  const { updateFocusedCrab } = useCrabContext();
  const { modal, open } = useConfirmModal();

  const onEditActionClicked = (id: number) => {
    const crabToEdit = crabs.find((crab) => crab.id === id) || null;
    updateFocusedCrab(crabToEdit);
  }

  const onDeleteActionClicked = (id: number) => {
    open(async () => {
      await deleteCrab(id);
    });
  }

  return (
    <>
      {modal()}
      <DataTable columns={getCrabColumns({
        onEditActionClicked,
        onDeleteActionClicked
      })} data={crabs} />
    </>
  );
}