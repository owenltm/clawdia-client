"use client";

import { Button } from "@/components/Button";
import { DrawerTrigger } from "@/components/Drawer";
import { RiAddLine } from "@remixicon/react";
import { BoxDetailDrawer } from "./BoxDetailDrawer";

export const BoxArrayHeader = () => {
  return (
    <div className="mb-4 w-full flex items-center justify-end">
      <BoxDetailDrawer>
        <DrawerTrigger asChild>
          <Button className="mt-4 w-full gap-2 sm:mt-0 sm:w-fit">
            <RiAddLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
            Add Box
          </Button>
        </DrawerTrigger>
      </BoxDetailDrawer>
    </div>
  );
}