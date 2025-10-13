"use client";

import { Button } from "@/components/Button";
import { DrawerTrigger } from "@/components/Drawer";
import BoxArrayLayout from "@/components/ui/boxes/BoxArrayLayout";
import { BoxDetailDrawer } from "@/components/ui/boxes/BoxDetailDrawer";
import { BoxProvider } from "@/contexts/BoxContext";
import { Inventory } from "@/types/box.types";
import { RiAddLine } from "@remixicon/react";

export default function BoxPage(
  { inventories }: { inventories: Inventory[] }
) {
  return <>
    <BoxProvider>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Inventory Details
      </h1>
      <div className="mt-4 sm:mt-6">
        <div className="mb-4 w-full flex items-center justify-end">
          <BoxDetailDrawer>
            <DrawerTrigger asChild>
              <Button onClick={() => { }} className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
                <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
                Add Box
              </Button>
            </DrawerTrigger>
          </BoxDetailDrawer>
        </div>
        <div className="overflow-x-auto pb-4">
          <BoxArrayLayout boxes={inventories} />
        </div>
      </div>
    </BoxProvider>
  </>
}