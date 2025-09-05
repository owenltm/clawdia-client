
export type FinanceType = "expense" | "revenue";
export type FinanceCategory = "supplies" | "bills" | "stock" | "maintenance" | "sales" | "other_revenue";

export type Finance = {
  id: number,
  type: FinanceType,
  amount: string,
  category: FinanceCategory,
  referenceId: string | null,
  description: string,
  createdAt: Date,
}