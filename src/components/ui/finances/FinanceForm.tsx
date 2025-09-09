"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { FinanceCategory, FinanceType } from "@/types/finance.types";
import React, { useState } from "react";

const financeTypes: FinanceType[] = ["expense", "revenue"];
const financeCategories: FinanceCategory[] = [
  "supplies",
  "bills",
  "stock",
  "maintenance",
  "sales",
  "other_revenue",
];

export interface FinanceFormValues {
  type: FinanceType;
  amount: string;
  category: FinanceCategory;
  description: string;
}

interface FinanceFormProps {
  initialValues?: Partial<FinanceFormValues>;
  onCancel?: () => void;
  onSubmit: (values: FinanceFormValues) => void;
}

export const FinanceForm: React.FC<FinanceFormProps> = ({ initialValues = {}, onCancel, onSubmit }) => {
  const [form, setForm] = useState<FinanceFormValues>({
    type: initialValues.type || "expense",
    amount: initialValues.amount || "",
    category: initialValues.category || "bills",
    description: initialValues.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="type" className="block mb-1">Type</label>
          <Select value={form.type} onValueChange={value => setForm(prev => ({ ...prev, type: value as FinanceType }))}>
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
          <Select value={form.category} onValueChange={value => setForm(prev => ({ ...prev, category: value as FinanceCategory }))}>
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
        />
      </div>
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};
