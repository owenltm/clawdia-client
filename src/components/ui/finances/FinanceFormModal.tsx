import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { FinanceCategory, FinanceFormValues, FinanceType } from "@/types/finance.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type FinanceFormModalProps = {
  children: React.ReactNode;
  initialValues?: Partial<FinanceFormValues>;
  onSubmit: (values: FinanceFormValues) => Promise<void>;
  onSuccess?: () => void;
  title?: string;
  description?: string;
};

export function FinanceFormModal({
  children,
  initialValues = {},
  onSubmit,
  title = "Add new finance data",
  description = "Fill in the details below to add or edit a finance record.",
}: FinanceFormModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(initialValues.type ? true : false);
  const [form, setForm] = useState<FinanceFormValues>({
    type: initialValues.type || "expense",
    amount: initialValues.amount || "",
    category: initialValues.category || "bills",
    description: initialValues.description || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const financeTypes: FinanceType[] = ["expense", "revenue"];
  const financeCategories: FinanceCategory[] = [
    "supplies",
    "bills",
    "stock",
    "maintenance",
    "sales",
    "other_revenue",
  ];

  const resetForm = () => {
    setForm({
      type: initialValues.type || "expense",
      amount: initialValues.amount || "",
      category: initialValues.category || "bills",
      description: initialValues.description || "",
    })
  }

  useEffect(() => {
    if (initialValues.type) {
      setOpen(true);

      setForm({
        type: initialValues.type || "expense",
        amount: initialValues.amount || "",
        category: initialValues.category || "bills",
        description: initialValues.description || "",
      });
    } else {
      resetForm();
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setForm((prev) => ({ ...prev, type: value as FinanceType }));
  };

  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({ ...prev, category: value as FinanceCategory }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit({
        id: initialValues.id,
        ...form
      });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="type" className="block mb-1">Type</label>
              <Select value={form.type} onValueChange={handleTypeChange}>
                <SelectTrigger id="type" name="type" className="mt-2">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent align="end">
                  {financeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label htmlFor="category" className="block mb-1">Category</label>
              <Select value={form.category} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category" name="category" className="mt-2">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent align="end">
                  {financeCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label htmlFor="amount" className="block mb-1">Amount</label>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              min="0"
              step="any"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <Input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              disabled={loading}
            />
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