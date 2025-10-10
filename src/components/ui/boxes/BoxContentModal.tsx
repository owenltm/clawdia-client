import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { useBoxContext } from "@/contexts/BoxContext";
import { CrabStatus } from "@/types/crab.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type BoxContentFormValues = {
  "weight": number,
  "supplier": string,
  "notes"?: string,
  "status": CrabStatus,
  "checkInDate": string, // YYYY-MM-DD date string
  "boxId": number
}

export type BoxContentFormModalProps = {
  children: React.ReactNode;
  initialValues: Partial<BoxContentFormValues>;
  onSubmit?: (values: BoxContentFormValues) => Promise<void>;
  onSuccess?: () => void;
  title?: string;
  description?: string;
};

const suppliers: string[] = [
  "P",
  "J",
  "R",
  "D",
  "A"
];

export function BoxContentModal({
  children,
  initialValues,
  onSubmit = async () => { },
  title = "Add new content",
  description = "Fill in the details below to add or edit a content record.",
}: BoxContentFormModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BoxContentFormValues>({
    weight: initialValues.weight || 0,
    supplier: initialValues.supplier || "",
    status: initialValues.status || CrabStatus.IN,
    checkInDate: initialValues.checkInDate?.split("T")[0] || new Date().toISOString().split("T")[0],  // format to YYYY-MM-DD
    boxId: initialValues.boxId || 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { checkOutCrab } = useBoxContext();

  const resetForm = () => {
    setForm({
      weight: 0,
      supplier: "",
      status: CrabStatus.IN,
      checkInDate: new Date().toISOString().split("T")[0],  // format to YYYY-MM-DD
      boxId: 0
    })
  }

  useEffect(() => {
    // If box is selected, open modal
    if (initialValues.boxId) {
      setOpen(true);
    }

    if (initialValues.weight) {
      setForm({
        weight: initialValues.weight || 0,
        supplier: initialValues.supplier || "",
        status: initialValues.status || CrabStatus.IN,
        checkInDate: initialValues.checkInDate?.split("T")[0] || new Date().toISOString().split("T")[0],  // format to YYYY-MM-DD
        boxId: initialValues.boxId || 0
      });
    } else if (initialValues.weight !== 0) {
      resetForm();
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupplierChange = (value: string) => {
    setForm((prev) => ({ ...prev, supplier: value }));
  };

  const handleCheckOut = async (status: CrabStatus.DEAD | CrabStatus.SOLD) => {
    if (!form.boxId) return;

    setLoading(true);
    setError(null);
    try {
      await checkOutCrab(
        form.boxId,
        {
          status
        }
      );

      resetForm();
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({
        ...form
      });
      resetForm();
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="my-1 text-sm leading-6">
            {description}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="mb-2 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="supplier" className="block mb-1">Supplier</label>
              <Select value={form.supplier.toUpperCase()} onValueChange={handleSupplierChange}>
                <SelectTrigger id="supplier" name="supplier">
                  <SelectValue placeholder="Select supplier..." />
                </SelectTrigger>
                <SelectContent align="end">
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier.toUpperCase()}>
                      {supplier.charAt(0).toUpperCase() + supplier.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="weight" className="block mb-1">Weight</label>
              <Input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                min="0"
                step="any"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            {/* TODO: Add default value for editing */}
            <label htmlFor="checkInDate" className="block mb-1">Check-in Date</label>
            <Input
              type="date"
              name="checkInDate"
              value={form.checkInDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div>
            {/* FIX: typing here caused error */}
            <label htmlFor="notes" className="block mb-1">Notes</label>
            <Input
              type="text"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="notes" className="block mb-1">Other actions</label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="ghost"
                disabled={loading}
                onClick={() => handleCheckOut(CrabStatus.SOLD)}>
                Mark sold
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={loading}
                onClick={() => handleCheckOut(CrabStatus.DEAD)}>
                Mark dead
              </Button>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
        <DialogFooter className="mt-6">
          {/* Optionally add extra footer actions here */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}