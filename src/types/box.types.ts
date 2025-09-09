export type BoxStatus = "filled" | "empty";

export type Box = {
  id: number,
  label: string,
  status: BoxStatus,
  maxFill: number,
  createdAt: Date,
  updatedAt: Date,
}