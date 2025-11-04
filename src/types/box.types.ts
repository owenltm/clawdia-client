import { Crab } from "./crab.types";

export type BoxStatus = "filled" | "empty" | "unavailable";

export type Box = {
  id: number,
  label: string,
  status: BoxStatus,
  maxFill: number,
  notes?: string,
  createdAt: Date,
  updatedAt: Date,
}

export type Inventory = {
  id: number,
  label: string,
  status: BoxStatus,
  maxFill: number,
  notes?: string,
  content: Crab[],
}

export type AddBoxContent = Omit<Crab, "id" | "checkoutDate" | "createdAt" | "updatedAt">
export type UpdateBoxContent = Partial<AddBoxContent>;

export type CreateBoxParam = Omit<Box, "id" | "createdAt" | "updatedAt">;