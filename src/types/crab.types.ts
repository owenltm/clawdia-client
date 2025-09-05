
export enum CrabStatus {
  IN = "in",
  SOLD = "sold",
  DEAD = "dead",
}

export type Crab = {
  id: number;                         // int autoincrement PK
  weight: number;                     // DECIMAL(10,2) -> string in Drizzle MySQL
  supplier: string;                   // varchar(255)
  status: CrabStatus;                 // mysqlEnum(...) union
  checkInDate: string;                // DATE -> 'YYYY-MM-DD' string
  checkOutDate: string | null;        // DATE nullable
  boxId: number | null;               // int FK nullable
  createdAt: Date;                    // timestamp(..., { mode: "date" }) -> Date
  updatedAt: Date;                    // timestamp(..., { mode: "date" }) -> Date
};