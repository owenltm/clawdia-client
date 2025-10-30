"use server";

import { requestHttp } from "@/lib/api";
import { AddUser } from "@/types/auth.types";

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

export const addUser = async (userData: AddUser) => {
  try {
    const response = await requestHttp({
      path: "/core/auth/user",
      method: "POST",
      body: userData,
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error adding user:', error);
    return { success: false, error: error.message || "Failed to add user" };
  }
}

export const updateUser = async (userId: number, userData: Partial<AddUser>) => {
  try {
    const response = await requestHttp({
      path: `/core/auth/user/${userId}`,
      method: "PATCH",
      body: userData,
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error updating user:', error);
    return { success: false, error: error.message || "Failed to update user" };
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await requestHttp({
      path: `/core/auth/user/${userId}`,
      method: "DELETE",
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return { success: false, error: error.message || "Failed to delete user" };
  }
}