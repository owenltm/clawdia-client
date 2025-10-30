import { Button } from "@/components/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/Dialog";
import { useState } from "react";

type useConfirmModalProps = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function useConfirmModal(params?: useConfirmModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState<() => Promise<void> | void>(() => { });

  const {
    title = "Confirm Action",
    description = "Are you sure you want to proceed with this action? This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = params || {};

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await callback();
      setIsOpen(false);
    } catch (error) {
      console.error("Error in confirm callback:", error);
    }

    setLoading(false);
  };

  const modal = () => {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              {description}
            </DialogDescription>
          </DialogHeader>
          {/* {error && (
            <div className="mb-2 text-sm text-red-600 dark:text-red-400">{error}</div>
          )} */}
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
    )
  }

  return {
    modal,
    open: (callback: () => void | Promise<void>) => {
      setIsOpen(true);
      setCallback(() => callback);
    },
    close: () => setIsOpen(false),
  }
}