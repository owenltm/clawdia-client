"use client";

import { Button } from "@/components/Button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/Drawer";
import { useBoxContext } from "@/contexts/BoxContext";
import { checkInCrab } from "@/services/boxService";
import { updateCrab } from "@/services/crabService";
import { fetchInventoryByBoxId } from "@/services/inventoryService";
import { Box } from "@/types/box.types";
import { Crab, CrabStatus } from "@/types/crab.types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BoxForm from "./BoxForm";
import CrabForm, { CrabFormValues } from "./CrabForm";

export type BoxFormValues = {
  label: string;
  status: "filled" | "empty";
  maxFill: number;
}

export type BoxDetailDrawerProps = {
  children: React.ReactNode;
  // initialValues?: Partial<Inventory>;
  title?: string;
  description?: string;
};

export function BoxDetailDrawer({
  children,
  title,
  description,
}: BoxDetailDrawerProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { focusedBox, updateFocusedBox } = useBoxContext();

  const isEditMode = !!focusedBox?.id;
  const drawerTitle = title || (isEditMode ? "Edit Inventory Box" : "Create New Inventory Box");
  const drawerDescription = description || (isEditMode
    ? "Update the inventory details below."
    : "Fill in the details to create a new Inventory Box.");

  useEffect(() => {
    setOpen(!!focusedBox?.id);
  }, [focusedBox]);

  const onSave = async (id: number | null) => {
    router.refresh();

    if (!id && !focusedBox?.id) {
      return;
    }

    const refreshed = await fetchInventoryByBoxId(id || focusedBox!.id);
    if (refreshed) {
      // Update with fresh data, drawer stays open
      updateFocusedBox(refreshed);
    }
  }

  const onOpenChange = (open: boolean) => {
    // On Close, clear focused box
    if (!open) {
      updateFocusedBox(null);
    }
    setOpen(open);
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <DrawerDescription>{drawerDescription}</DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <div className="space-y-6">
            {/* Section 1: Box Details */}
            <BoxSection initialValues={focusedBox as any || {}} onSave={onSave} />

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-800"></div>

            {/* Section 2: Crab Data */}
            {focusedBox?.id && (
              <CrabSection initialValues={focusedBox?.content || []} boxId={focusedBox?.id!} onSave={onSave} />
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export const BoxSection = (
  {
    initialValues,
    onSave
  }:
    {
      initialValues: Box,
      onSave: (boxId: number | null) => Promise<void> | void
    }
) => {
  const { createBox, updateBox } = useBoxContext();
  const [isEditing, setIsEditing] = useState(initialValues.label ? false : true);

  const handleFormSubmit = async (values: any) => {
    let boxId = null;
    if (initialValues.id) {
      await updateBox(initialValues.id!, values);
      boxId = initialValues.id!;
    } else {
      const { data } = await createBox({ ...values, status: "empty" });

      boxId = data.id;
    }

    await onSave(boxId);

    if (!initialValues.label) {
      setIsEditing(false);
    }
  }

  return <>
    {isEditing ? (
      <BoxForm
        initialValues={initialValues}
        onSave={handleFormSubmit}
        onCancel={() => { setIsEditing(false) }}
      />
    ) : (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Box Details
          </h3>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Label
          </div>
          <div>{initialValues.label}</div>
        </div>
        <div className="mb-4">
          <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Fill
          </div>
          <div>{initialValues.maxFill}</div>
        </div>
      </div>
    )}
  </>
}

export const CrabSection = (
  {
    initialValues,
    boxId,
    onSave
  }: {
    initialValues: Crab[]
    boxId: number
    onSave: (boxId: number | null) => Promise<void> | void
  }
) => {
  const { checkOutCrab } = useBoxContext();
  const [crabForms, setCrabForms] = useState<Partial<Crab>[]>(initialValues || []);
  const [isEditing, setIsEditing] = useState<boolean[]>(initialValues.map((c) => c.weight ? false : true));
  const crabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCrabForms(initialValues || []);
  }, [initialValues]);

  const handleFormSubmit = async (id: number | null, values: CrabFormValues) => {
    if (!id) {
      await checkInCrab(boxId, { ...values, status: "in" } as any);
    } else {
      await updateCrab(id, values);
    }
  }

  const handleCrabCheckout = async (boxId: number | null, values: { status: CrabStatus, checkOutDate: string }) => {
    if (!boxId) {
      return;
    }

    // console.log("Checking out crab from box:", boxId, values);

    const response = await checkOutCrab(boxId, values);
    console.log("Check out response:", response);
    onSave(boxId);
  }

  const toggleIsEditing = (index: number, value: boolean) => {
    setIsEditing((prev) => {
      const newEditing = [...prev];
      newEditing[index] = value;
      return newEditing;
    });
  }

  return <div>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
        Crab Content
      </h3>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          setCrabForms((prev) => ([{ boxId: boxId }, ...prev]));
          toggleIsEditing(0, true);
        }}
      >
        Add Crab
      </Button>
    </div>

    <div className="space-y-2">
      <div ref={crabListRef} className="text-sm text-gray-500 dark:text-gray-400">
        {crabForms.length > 0 &&
          crabForms.map((crab, index) => (
            <div
              key={crab.id || `crab-${index}`}
              className="mb-4"
            >
              {isEditing[index] ? (
                <CrabForm
                  initialValues={crab}
                  onSave={async (crabId, values) => {
                    handleFormSubmit(crabId, values);

                    onSave(null);
                    toggleIsEditing(index, false);
                  }}
                  onCheckout={handleCrabCheckout}
                  onCancel={() => toggleIsEditing(index, false)}

                />
              ) : (
                <div className="mb-4 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <div className="w-full flex gap-4 mb-4">
                    <div className="flex-1">
                      <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight
                      </div>
                      <div>{crab.weight}</div>
                    </div>
                    <div className="flex-1">
                      <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Supplier
                      </div>
                      <div>{crab.supplier}</div>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        toggleIsEditing(index, true);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="mb-4">
                    <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Check In Date
                    </div>
                    <div>{crab.checkInDate ? new Date(crab.checkInDate).toLocaleDateString() : ''}</div>
                  </div>
                  <div className="mb-4">
                    <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Notes
                    </div>
                    <div>{crab.notes}</div>
                  </div>
                </div>
              )}
            </div>
          ))
        }
        {crabForms.length === 0 &&
          <p>No crabs in this box.</p>
        }
      </div>
    </div>
  </div>
}