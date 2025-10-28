"use client";

import { Button } from "@/components/Button";
import FinanceDataTable from "@/components/ui/finances/financeDataTable";
import { FinanceFormModal } from "@/components/ui/finances/FinanceFormModal";
import { Finance, FinanceFormValues } from "@/types/finance.types";
import { RiAddLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FinancePageProps = {
  finances: Finance[],
  onSubmit: (finance: Omit<Finance, "id">) => Promise<boolean>,
  onEdit: (id: number, finance: Omit<Finance, "id">) => Promise<boolean>,
  onDelete: (id: number) => Promise<boolean>,
}

export default function FinancePage({
  finances,
  onEdit,
  onDelete,
  onSubmit
}: FinancePageProps) {
  const router = useRouter();
  const [focusedFinance, setFocusedFinance] = useState<FinanceFormValues | {}>({});

  const onFocusFinance = (id: number) => {
    const finance = finances.find(f => f.id === id);
    if (!finance) { return };

    setFocusedFinance(finance);
  }

  const deleteFinance = async (id: number) => {
    await onDelete(id);
    router.refresh();
  }

  const submitForm = async (values: FinanceFormValues) => {
    if (values.id) {
      // Edit existing finance
      await onEdit(values.id, values as Omit<Finance, "id">);
    } else {
      await onSubmit(values as Omit<Finance, "id">);
    }
  }

  return <>
    <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
      Finance Details
    </h1>
    <div className="mt-4 sm:mt-6 lg:mt-10">
      <div className="mb-4 w-full flex items-center justify-end">
        <FinanceFormModal
          initialValues={focusedFinance}
          onSubmit={async values => {
            await submitForm(values);
          }}
          title={focusedFinance && (focusedFinance as Finance).id ? "Edit finance" : "Add finance"}
          description="Use the form below to manage your finances."
        >
          <Button onClick={() => { setFocusedFinance({}); }} className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
            <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
            Add finance
          </Button>
        </FinanceFormModal>
      </div>
      <FinanceDataTable onDeleteFinanceAction={deleteFinance} onFocusFinanceAction={onFocusFinance} finances={finances} />
    </div>
  </>
}