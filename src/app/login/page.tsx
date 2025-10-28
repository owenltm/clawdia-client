"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCookies } from "@/hooks/useCookies";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await login({ username, password });
    if (result.success) {
      useCookies.set("auth_token", (result.data! as any).token);
      await refreshUser();

      router.replace("/overview");
    } else {
      console.error("Login failed:", result.error);
      setError(result.error || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2 block">
              username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-2 block">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="mt-6 w-full"
            disabled={loading}
          >
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
