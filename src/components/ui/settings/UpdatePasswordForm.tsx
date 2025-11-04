"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuthContext } from "@/contexts/AuthContext";
import { updateUserPassword } from "@/services/authService";
import { useState } from "react";

export const UpdatePasswordForm = () => {
  const { logout } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const currentPassword = (e.currentTarget.elements.namedItem("currentPassword") as HTMLInputElement).value;
      const newPassword = (e.currentTarget.elements.namedItem("newPassword") as HTMLInputElement).value;
      const confirmNewPassword = (e.currentTarget.elements.namedItem("confirmNewPassword") as HTMLInputElement).value;

      if (newPassword !== confirmNewPassword) {
        setError("New password and confirmation do not match.");
        return;
      }

      const response = await updateUserPassword({
        currentPassword,
        newPassword,
      })

      if (response.success) {
        setError(null);

        logout();
      } else {
        setError("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-6">
        <div className="md:col-span-3">
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
        <div className="md:col-span-3">
          {error && (
            <div className="mb-4 text-sm text-red-600">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="current-password" className="block mb-1">Current password</label>
              <Input
                type="password"
                id="current-password"
                name="currentPassword"
                placeholder="••••••••"
                defaultValue=""
                className="mt-2"
                required
                disabled={loading}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="new-password" className="block mb-1">New password</label>
              <Input
                type="password"
                id="new-password"
                name="newPassword"
                placeholder="••••••••"
                defaultValue=""
                className="mt-2"
                required
                disabled={loading}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="confirm-new-password" className="block mb-1">Confirm new password</label>
              <Input
                type="password"
                id="confirm-new-password"
                name="confirmNewPassword"
                placeholder="••••••••"
                defaultValue=""
                className="mt-2"
                required
                disabled={loading}
              />
            </div>
            <div className="col-span-full mt-6 flex justify-end">
              <Button type="submit" disabled={loading}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}