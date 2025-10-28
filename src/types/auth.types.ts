export type User = {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
};

export const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
]

export type AddUser = {
  username: string;
  role: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password: string;
}