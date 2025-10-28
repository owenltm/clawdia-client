import { Button } from "@/components/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { addUser } from "@/services/authService"
import { AddUser, roles } from "@/types/auth.types"
import { useState } from "react"

export type ModalAddUserProps = {
  children: React.ReactNode
  onUserAdded?: () => void
}

export type UserFormValues = {
  username: string | undefined;
  role: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  password: string | undefined;
}

export function ModalAddUser({ children, onUserAdded }: ModalAddUserProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<UserFormValues>({
    username: undefined,
    role: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
  });

  const resetForm = () => {
    setForm({
      username: undefined,
      role: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      password: undefined,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setForm((prev) => ({ ...prev, role: value }));
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addUser(form as AddUser);

      if (response.success) {
        resetForm();
        setOpen(false);
        onUserAdded?.();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleAddUser}>
          <DialogHeader>
            <DialogTitle>Invite people to your workspace</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              With free plan, you can add up to 10 users to each workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              {/* <Label htmlFor="first-name" className="font-medium">
                          First name
                        </Label> */}
              <label htmlFor="username" className="block mb-1">Username</label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="emma"
                value={form.username || ""}
                onChange={handleChange}
                className="mt-2"
                required
                disabled={loading}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="role" className="font-medium">
                Role
              </Label>
              <Select value={form.role || undefined} onValueChange={handleRoleChange} required disabled={loading}>
                <SelectTrigger
                  name="role"
                  id="role"
                  className="mt-2"
                >
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <p className="mt-2 text-xs text-gray-500">
                          Roles can only be changed by system admin.
                        </p> */}
            </div>
            <div className="col-span-full sm:col-span-3">
              {/* <Label htmlFor="first-name" className="font-medium">
                          First name
                        </Label> */}
              <label htmlFor="first-name" className="block mb-1">First name</label>
              <Input
                type="text"
                id="first-name"
                name="firstName"
                placeholder="Emma"
                className="mt-2"
                value={form.firstName || ""}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              {/* <Label htmlFor="last-name" className="font-medium">
                          Last name
                        </Label> */}
              <label htmlFor="last-name" className="block mb-1">Last name</label>
              <Input
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Stone"
                className="mt-2"
                value={form.lastName || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              {/* <Label htmlFor="email" className="font-medium">
                          Email
                        </Label> */}
              <label htmlFor="email" className="block mb-1">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="emma@acme.com"
                className="mt-2"
                value={form.email || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              {/* <Label htmlFor="email" className="font-medium">
                          Email
                        </Label> */}
              <label htmlFor="phone" className="block mb-1">Phone</label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+62 ..."
                className="mt-2"
                value={form.phone || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="col-span-full">
              {/* <Label htmlFor="email" className="font-medium">
                          Email
                        </Label> */}
              <label htmlFor="defaultPassword" className="block mb-1">Default Password</label>
              <Input
                type="password"
                id="defaultPassword"
                name="password"
                placeholder="••••••••"
                className="mt-2"
                minLength={8}
                value={form.password || ""}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Go back
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full sm:w-fit">
              Add user
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
