import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Box } from "@/types/box.types";
import { useState } from "react";

export type BoxFormProps = {
  initialValues: Partial<Box>,
  onCancel?: () => void;
  onSave?: (values: any) => void | Promise<void>;
}

export type BoxFormValues = {
  label: string;
  maxFill: number;
}

export default function BoxForm(
  { initialValues, onSave, onCancel }: BoxFormProps
) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<BoxFormValues>({
    label: initialValues?.label || "",
    maxFill: initialValues?.maxFill || 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave?.(form);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return <form id="box-form" onSubmit={handleSubmit} className="space-y-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-4">
        Box Details
      </h3>
      <div className="mb-4">
        <label htmlFor="label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Label
        </label>
        <Input
          id="label"
          name="label"
          type="text"
          value={form.label}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="maxFill" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Max Fill
        </label>
        <Input
          id="maxFill"
          name="maxFill"
          type="number"
          value={form.maxFill}
          onChange={handleChange}
          required
          min="1"
          disabled={loading}
        />
      </div>

      <div className="flex gap-4 mb-4">
        <Button
          type="button"
          variant="secondary"
          disabled={loading}
          className="flex-1"
        >
          Mark Unavailable
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={loading}
        // className="flex-1"
        >
          Delete
        </Button>
      </div>

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
    </div>
  </form>
}
