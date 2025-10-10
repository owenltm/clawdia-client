"use client";

import BoxArrayLayout from "@/components/ui/boxes/BoxArrayLayout";
import { BoxProvider } from "@/contexts/BoxContext";
import { Inventory } from "@/types/box.types";

export default function BoxPage(
  { inventories }: { inventories: Inventory[] }
) {
  return <>
    <BoxProvider>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Inventory Details
      </h1>
      <div className="mt-4 sm:mt-6">
        <BoxArrayLayout boxes={inventories} />
      </div>
    </BoxProvider>
  </>
}