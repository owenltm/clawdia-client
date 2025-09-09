"use client";
import { Button } from "@/components/Button";
import FinanceDataTable from "@/components/ui/finances/financeDataTable";
import { FinanceFormModal } from "@/components/ui/finances/FinanceFormModal";
import { Finance } from "@/types/finance.types";
import { RiAddLine } from "@remixicon/react";

type FinancePageProps = {
  finances: Finance[],
  onSubmit: (finance: Omit<Finance, "id">) => Promise<boolean>
}

export default function FinancePage({
  finances,
  onSubmit
}: FinancePageProps) {
  return <>
    <div className="mb-4 w-full flex items-center justify-end">
      <FinanceFormModal onSubmit={async values => {
        await onSubmit(values as Omit<Finance, "id">);
        return;
      }}>
        <Button className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
          <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
          Add finance
        </Button>
      </FinanceFormModal>
    </div>
    <FinanceDataTable finances={finances} />
  </>
}