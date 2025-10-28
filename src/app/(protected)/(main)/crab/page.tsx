"use client"

import { Button } from "@/components/Button";
import CrabDataTable from "@/components/ui/crabs/crabDataTable";
import { CrabFormModal } from "@/components/ui/crabs/CrabFormModal";
import { CrabProvider } from "@/contexts/CrabContext";
import { fetchAllCrabs } from "@/services/crabService";
import { Crab } from "@/types/crab.types";
import { RiAddLine } from "@remixicon/react";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  const [crabs, setCrabs] = useState<Crab[] | null>(null);
  // const crabs = await fetchAllCrabs();

  const loadCrabs = async () => {
    const data = await fetchAllCrabs();
    setCrabs(data);
  }

  useEffect(() => {
    loadCrabs();
  }, []);

  return <CrabProvider onRefresh={loadCrabs}>
    <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
      Details
    </h1>
    <div className="mt-4 sm:mt-6 lg:mt-10">
      <div className="mb-4 w-full flex items-center justify-end">
        <CrabFormModal>
          <Button onClick={() => { }} className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
            <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
            Add crab
          </Button>
        </CrabFormModal>
      </div>
      {!crabs && <p>Loading crab data...</p>}
      {crabs && <>
        <CrabDataTable crabs={crabs} />
      </>}
    </div>
  </CrabProvider>
}