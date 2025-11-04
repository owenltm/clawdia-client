import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"
import { useAuthContext } from "@/contexts/AuthContext"
import { updateUserProfile } from "@/services/authService"
import { roles } from "@/types/auth.types"
import { useState } from "react"

type UserProfileValues = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
}

export const UserProfileForm = () => {
  const { currentUser, refreshUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<UserProfileValues>({
    firstName: currentUser?.firstName || undefined,
    lastName: currentUser?.lastName || undefined,
    email: currentUser?.email || undefined,
    phone: currentUser?.phone || undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await updateUserProfile(form)

      if (response.success) {
        // Optionally show a success message or update the context
        await refreshUser();
      }
    } catch (error) {
      console.error("Error update profile:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdateUser}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-3">
        <div>
          <h2
            id="personal-information"
            className="scroll-mt-10 font-semibold text-gray-900 dark:text-gray-50"
          >
            Personal information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Manage your personal information and role.
          </p>
        </div>
        <div className="md:col-span-2">
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
                value={currentUser?.username || ""}
                onChange={() => { }}
                className="mt-2"
                disabled
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label htmlFor="role" className="font-medium">
                Role
              </Label>
              <Select value={currentUser?.role || ""} required disabled>
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
            <div className="col-span-full mt-6 flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}