import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { useBoxContext } from "@/contexts/BoxContext";
import { checkInCrab } from "@/services/boxService";
import { Crab, CrabStatus } from "@/types/crab.types";
import { useState } from "react";

export type CrabFormProps = {
  initialValues: Partial<Crab>;
  onSaveCallback?: () => void;
}

export type CrabFormValues = {
  "weight": number,
  "supplier": string,
  "notes"?: string,
  "status": CrabStatus,
  "checkInDate": string, // YYYY-MM-DD date string
  "checkOutDate"?: string, // YYYY-MM-DD date string
  "boxId": number
}

const suppliers: string[] = [
  "P",
  "J",
  "R",
  "D",
  "A"
];

export default function CrabForm({ initialValues, onSaveCallback }: CrabFormProps) {
  const { updateCrab } = useBoxContext();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CrabFormValues>({
    weight: initialValues.weight || 0,
    supplier: initialValues.supplier || "",
    status: initialValues.status || CrabStatus.IN,
    checkInDate: initialValues.checkInDate?.split("T")[0] || new Date().toISOString().split("T")[0],  // format to YYYY-MM-DD
    checkOutDate: initialValues.checkOutDate ? initialValues.checkOutDate.split("T")[0] : undefined,
    notes: initialValues.notes || "",
    boxId: initialValues.boxId || 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!initialValues.id) {
        await checkInCrab(form.boxId, { ...form, status: "in" } as any);
      } else {
        await updateCrab(initialValues.id!, form);
      }

      onSaveCallback?.();
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupplierChange = (value: string) => {
    setForm((prev) => ({ ...prev, supplier: value }));
  };

  return (
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
      {
        form.status != CrabStatus.IN && (
          <div>
            <label htmlFor="checkOutDate" className="block mb-1">Check-out Date</label>
            <Input
              type="date"
              name="checkOutDate"
              value={form.checkOutDate}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        )}
      <div>
        <label htmlFor="notes" className="block mb-1">Notes</label>
        <Input
          type="text"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      {/* <div>
        <label htmlFor="notes" className="block mb-1">Other actions</label>
        <div className="w-full flex gap-4">
          <Button
            className="flex-1"
            type="button"
            variant="secondary"
            disabled={loading}
          // onClick={() => handleCheckOut(CrabStatus.SOLD)}
          >
            Mark sold
          </Button>
          <Button
            className="flex-1"
            type="button"
            variant="destructive"
            disabled={loading}
          // onClick={() => handleCheckOut(CrabStatus.DEAD)}
          >
            Mark dead
          </Button>
        </div>
      </div> */}
      <div className="">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}