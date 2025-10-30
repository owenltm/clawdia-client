"use client";

import { Button } from "@/components/Button";
import { FinanceFormModal } from "@/components/ui/finances/FinanceFormModal";
import FinanceDataTable from "@/components/ui/finances/financeDataTable";
import useConfirmModal from "@/hooks/useConfirmModal";
import { createFinance, deleteFinance, fetchAllFinances, updateFinance } from "@/services/financeService";
import { Finance, FinanceFormValues } from "@/types/finance.types";
import { RiAddLine } from "@remixicon/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [finances, setFinances] = useState<Finance[] | null>(null);
  const [focusedFinance, setFocusedFinance] = useState<FinanceFormValues | {}>({});

  const { modal, open } = useConfirmModal();

  const onFocusFinance = (id: number) => {
    const finance = finances?.find(f => f.id === id);
    if (!finance) { return };

    setFocusedFinance(finance);
  }

  const onDeleteFinance = async (id: number) => {
    open(async () => {
      await deleteFinance(id);
      console.log("Finance deleted");

      fetchFinanceData();
    });
  }

  const submitForm = async (values: FinanceFormValues) => {
    if (values.id) {
      // Edit existing finance
      await updateFinance(values.id, values as Omit<Finance, "id">);
    } else {
      await createFinance(values as Omit<Finance, "id">);
    }

    fetchFinanceData();
  }

  const fetchFinanceData = async () => {
    const data = await fetchAllFinances();
    setFinances(data);
  }

  useEffect(() => {
    fetchFinanceData();
  }, []);

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
        {modal()}
      </div>
      <FinanceDataTable onDeleteFinanceAction={onDeleteFinance} onFocusFinanceAction={onFocusFinance} finances={finances || []} />
    </div>
  </>
}