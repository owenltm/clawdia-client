"use server";

import { requestHttp } from "@/lib/api";

export const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await requestHttp({
      path: "/core/auth/login",
      method: "POST",
      body: credentials,
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message || "Failed to log in" };
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await requestHttp({
      path: "/core/auth/me",
      method: "GET",
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error fetching current user:', error);
    return { success: false, error: error.message || "Failed to fetch current user" };
  }
}

export const getAllUsers = async () => {
  try {
    const response = await requestHttp({
      path: "/core/auth/",
      method: "GET",
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error fetching all users:', error);
    return { success: false, error: error.message || "Failed to fetch all users" };
  }
}
