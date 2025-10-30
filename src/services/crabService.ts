"use server";

import { requestHttp } from "@/lib/api";
import { Crab, NewCrab } from "@/types/crab.types";

export const fetchAllCrabs = async () => {
  const crabResponse = await requestHttp<Crab[]>({
    path: "/core/crabs",
    method: "GET",
  });
  return crabResponse;
}

export const createCrab = async (data: NewCrab) => {
  try {
    const response = await requestHttp({
      path: `/core/crabs`,
      method: "POST",
      body: data,
    });
    return response;
  } catch (error) {
    console.error("Error updating crab:", error);
    throw error;
  }
}

export const updateCrab = async (crabId: number, data: Partial<Crab>) => {
  try {
    const response = await requestHttp({
      path: `/core/crabs/${crabId}`,
      method: "PATCH",
      body: data,
    });
    return response;
  } catch (error) {
    console.error("Error updating crab:", error);
    throw error;
  }
};

export const deleteCrab = async (crabId: number) => {
  try {
    const response = await requestHttp({
      path: `/core/crabs/${crabId}`,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error deleting crab:", error);
    throw error;
  }
};
