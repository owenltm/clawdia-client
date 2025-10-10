import { Crab } from "./crab.types";

export type BoxStatus = "filled" | "empty";

export type Box = {
  id: number,
  label: string,
  status: BoxStatus,
  maxFill: number,
  createdAt: Date,
  updatedAt: Date,
}

export type Inventory = {
  id: number,
  label: string,
  status: BoxStatus,
  content: Crab[],
}

export type AddBoxContent = Omit<Crab, "id" | "checkoutDate" | "createdAt" | "updatedAt">
export type UpdateBoxContent = Partial<AddBoxContent>;