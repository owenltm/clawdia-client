import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { useState } from "react";

export type ConfirmModalProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmModal({
  children,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this action? This action cannot be undone.",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      // Placeholder for delete function
      await onConfirm();
      setOpen(false);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6">
            {description}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="mb-2 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}
        <DialogFooter className="mt-6 flex gap-4 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={loading}>
              {cancelText}
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? "Deleting..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
