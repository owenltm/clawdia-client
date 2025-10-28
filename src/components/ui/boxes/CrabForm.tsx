import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { viewBoxes } from "@/services/boxService";
import { Box } from "@/types/box.types";
import { Crab, CrabStatus } from "@/types/crab.types";
import { useEffect, useState } from "react";

export type CrabFormProps = {
  initialValues: Partial<Crab>;
  onSave?: (id: number | null, values: CrabFormValues) => Promise<void>;
  onCheckout?: (boxId: number | null, values: { status: CrabStatus, checkOutDate: string }) => Promise<void>;
  onCancel?: () => void;
}

export type CrabFormValues = {
  "weight": number,
  "supplier": string,
  "notes"?: string,
  "status": CrabStatus,
  "checkInDate": string, // YYYY-MM-DD date string
  "checkOutDate"?: string, // YYYY-MM-DD date string
  "boxId": number | null
}

const suppliers: string[] = [
  "P",
  "J",
  "R",
  "D",
  "A"
];

export default function CrabForm({ initialValues, onSave, onCancel }: CrabFormProps) {
  const [loading, setLoading] = useState(false);
  const [availableBoxes, setAvailableBoxes] = useState<Box[]>([]);

  const [form, setForm] = useState<CrabFormValues>({
    weight: initialValues.weight || 0,
    supplier: initialValues.supplier || "",
    status: initialValues.status || CrabStatus.IN,
    checkInDate: initialValues.checkInDate?.split("T")[0] || new Date().toISOString().split("T")[0],  // format to YYYY-MM-DD
    ...(initialValues.checkOutDate && { checkOutDate: initialValues.checkOutDate?.split("T")[0] }),
    notes: initialValues.notes || "",
    boxId: initialValues.boxId || null
  });

  useEffect(() => {
    const fetchBoxes = async () => {
      const data = await viewBoxes({});
      setAvailableBoxes(data);
    };
    fetchBoxes();
  }, []);

  useEffect(() => {
    setForm({
      weight: initialValues.weight || 0,
      supplier: initialValues.supplier || "",
      status: initialValues.status || CrabStatus.IN,
      checkInDate: initialValues.checkInDate?.split("T")[0] || new Date().toISOString().split("T")[0],  // format to YYYY-MM-DD
      ...(initialValues.checkOutDate && { checkOutDate: initialValues.checkOutDate?.split("T")[0] }),
      notes: initialValues.notes || "",
      boxId: initialValues.boxId || null
    });
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave?.(initialValues.id || null, form);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // const handleQuickAction = async (status: CrabStatus) => {
  //   try {
  //     setLoading(true);
  //     await onCheckout?.(initialValues.boxId || null, { status, checkOutDate: new Date().toISOString().split("T")[0] });
  //   } catch (err: any) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupplierChange = (value: string) => {
    setForm((prev) => ({ ...prev, supplier: value }));
  };

  const handleStatusChange = (value: string) => {
    const status = CrabStatus[value as keyof typeof CrabStatus];

    setForm((prev) => ({ ...prev, status }));
  };

  const handleBoxChange = (value: string) => {
    setForm((prev) => ({ ...prev, boxId: value === "-1" ? null : Number(value) }));
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
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="status" className="block mb-1">Status</label>
          <Select value={form.status.toUpperCase()} onValueChange={handleStatusChange}>
            <SelectTrigger id="status" name="status">
              <SelectValue placeholder="Select status..." />
            </SelectTrigger>
            <SelectContent align="end">
              {Object.values(CrabStatus).map((status) => (
                <SelectItem key={status} value={status.toUpperCase()}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {form.status === CrabStatus.IN && (
          <div className="flex-1">
            <label htmlFor="boxLabel" className="block mb-1 mr-8">Box Label</label>
            <Select value={form.boxId?.toString() || "-1"} onValueChange={handleBoxChange}>
              <SelectTrigger id="boxLabel" name="boxLabel">
                <SelectValue placeholder="Select box label..." />
              </SelectTrigger>
              <SelectContent align="end" className="max-h-64">
                {availableBoxes.map((box) => (
                  <SelectItem key={box.id} disabled={box.status !== "empty"} value={box.id.toString()}>
                    {box.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {
          form.status !== CrabStatus.IN && (
            <div className="flex-1">
              <label htmlFor="checkOutDate" className="block mb-1">Check-out Date</label>
              <Input
                type="date"
                name="checkOutDate"
                value={form.checkOutDate || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          )}
      </div>
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
        <div className="w-full flex gap-4">
          <Button
            className="flex-1"
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={() => handleQuickAction(CrabStatus.SOLD)}
          >
            Mark sold
          </Button>
          <Button
            className="flex-1"
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={() => handleQuickAction(CrabStatus.DEAD)}
          >
            Mark dead
          </Button>
        </div>
      </div> */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          disabled={loading}
          // className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}