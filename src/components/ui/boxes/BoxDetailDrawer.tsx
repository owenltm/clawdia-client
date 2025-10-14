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
import { fetchInventoryByBoxId } from "@/services/inventoryService";
import { Box, Inventory } from "@/types/box.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BoxForm from "./BoxForm";
import CrabForm from "./CrabForm";

export type BoxFormValues = {
  label: string;
  status: "filled" | "empty";
  maxFill: number;
}

export type BoxDetailDrawerProps = {
  children: React.ReactNode;
  initialValues?: Partial<Inventory>;
  title?: string;
  description?: string;
};

export function BoxDetailDrawer({
  children,
  initialValues,
  title,
  description,
}: BoxDetailDrawerProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { updateFocusedBox } = useBoxContext();

  const isEditMode = !!initialValues;
  const drawerTitle = title || (isEditMode ? "Edit Inventory Box" : "Create New Inventory Box");
  const drawerDescription = description || (isEditMode
    ? "Update the inventory details below."
    : "Fill in the details to create a new Inventory Box.");

  useEffect(() => {
    // TODO: Maybe can check the context directly instead of using effect
    // If box is selected, open drawer
    if (initialValues?.id) {
      setOpen(true);
    }
  }, [initialValues]);

  useEffect(() => {
    if (!open) {
      updateFocusedBox(null);
    }
  }, [open, updateFocusedBox]);

  const onSave = async () => {
    router.refresh();

    const refreshed = await fetchInventoryByBoxId(initialValues?.id!);
    if (refreshed) {
      updateFocusedBox(refreshed);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <DrawerDescription>{drawerDescription}</DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <div className="space-y-6">
            {/* Section 1: Box Details */}
            <BoxSection initialValues={initialValues as Box} onSave={onSave} />

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-800"></div>

            {/* Section 2: Crab Data */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Crab Content
                </h3>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    // TODO: Implement add crab functionality
                    console.log("Add crab clicked");
                  }}
                >
                  Add Crab
                </Button>
              </div>

              {/* Crab List Placeholder */}
              <div className="space-y-2">
                {isEditMode ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {initialValues?.content && initialValues?.content.length > 0 &&
                      initialValues?.content.map((crab) => (
                        <div key={crab.id} className="mb-4">
                          <CrabForm initialValues={crab} onSaveCallback={onSave} />
                        </div>
                      ))
                    }
                    {initialValues?.content && initialValues?.content.length === 0 &&
                      <p>No crabs in this box.</p>
                    }
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No crabs added yet
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Click Add Crab to add content
                    </p>
                  </div>
                )}
              </div>
            </div>
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
      onSave: () => Promise<void> | void
    }
) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFormSubmit = async () => {
    await onSave();
    setIsEditing(false);
  }

  return <>
    {isEditing ? (
      <BoxForm
        initialValues={initialValues}
        onSaveCallback={handleFormSubmit}
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
