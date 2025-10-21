import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/Dialog";
import { useCrabContext } from "@/contexts/CrabContext";
import { createCrab, updateCrab } from "@/services/crabService";
import { NewCrab } from "@/types/crab.types";
import { useEffect, useState } from "react";
import CrabForm, { CrabFormValues } from "../boxes/CrabForm";

export type CrabFormModalProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export function CrabFormModal({
  children,
  title = "Add new crab data",
  description = "Fill in the details below to add or edit a crab record.",
}: CrabFormModalProps) {
  const { refreshData } = useCrabContext();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { focusedCrab, updateFocusedCrab } = useCrabContext();

  useEffect(() => {
    setOpen(!!focusedCrab?.id);
  }, [focusedCrab]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      updateFocusedCrab(null);
    }
    setOpen(open);
  }

  const handleSave = async (id: number | null, values: CrabFormValues) => {
    try {
      if (!id) {
        // TODO: NEED TO FIGURE OUT CRAB CREATION FLOW
        await createCrab(values as NewCrab);
      } else {
        console.log("Updating crab with ID:", id, "and values:", values);
        await updateCrab(id, values);
      }

      updateFocusedCrab(null);
      setError(null);
      refreshData();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6">
            {description}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="mb-2 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}
        <CrabForm
          initialValues={focusedCrab || {}}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
        <DialogFooter className="mt-6">
          {/* Optionally add extra footer actions here */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
