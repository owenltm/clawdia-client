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
import { useUserContext } from "@/contexts/UserContext"
import { addUser, updateUser } from "@/services/authService"
import { AddUser, roles, User } from "@/types/auth.types"
import { useEffect, useState } from "react"

export type ModalAddUserProps = {
  children: React.ReactNode,
  onUserAdded?: () => void,
  title?: string,
  description?: string,
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
  const { focusedUser, updateFocusedUser } = useUserContext();

  const initialValues: User | null = focusedUser;

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

  useEffect(() => {
    setOpen(!!focusedUser);

    if (focusedUser) {
      setForm({
        username: initialValues?.username || undefined,
        role: initialValues?.role || undefined,
        firstName: initialValues?.firstName || undefined,
        lastName: initialValues?.lastName || undefined,
        email: initialValues?.email || undefined,
        phone: initialValues?.phone || undefined,
        password: initialValues?.password || undefined,
      });
    }
  }, [focusedUser, initialValues]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      updateFocusedUser(null);
      resetForm();
    }
    setOpen(open);
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
      let response;
      if (!initialValues) {
        response = await addUser(form as AddUser);
      } else {
        response = await updateUser(initialValues.id, form as AddUser);
      }

      if (!response) {
        return;
      }

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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleAddUser}>
          <DialogHeader>
            <DialogTitle>{initialValues ? "Edit user" : "Add user to your workspace"}</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              {initialValues ? "Edit user details below." : "Fill in the details below to add a new user."}
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
              <Select value={form.role || ""} onValueChange={handleRoleChange} required disabled={loading}>
                <SelectTrigger
                  name="role"
                  id="role"
                  className="mt-2"
                >
                  <SelectValue />
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
                className="mt-2"
                value={form.phone || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {!initialValues && (
              <div className="col-span-full">
                {/* <Label htmlFor="email" className="font-medium">
                          Email
                        </Label> */}
                <label htmlFor="defaultPassword" className="block mb-1">Default Password</label>
                <Input
                  type="password"
                  id="defaultPassword"
                  name="password"
                  className="mt-2"
                  minLength={8}
                  value={form.password || ""}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            )}
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full sm:w-fit">
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
