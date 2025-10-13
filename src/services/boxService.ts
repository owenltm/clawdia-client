"use server";

import { requestHttp } from "@/lib/api";
import { AddBoxContent, Box, UpdateBoxContent } from "@/types/box.types";

export const fetchAllBoxes = async () => {
  const crabResponse = await requestHttp<Box[]>({
    path: "/core/boxes",
    method: "GET",
  });
  return crabResponse;
}

export const updateBox = async (boxId: number, boxData: Partial<Box>) => {
  try {
    const response = await requestHttp({
      path: `/core/boxes/${boxId}`,
      method: "PATCH",
      body: boxData,
    });
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error updating box:', error);
    return { success: false, error: error.message || "Failed to update box" };
  }
}

export const checkInCrab = async (boxId: number, content: AddBoxContent) => {
  try {
    const response = await requestHttp({
      path: `/core/inventory/${boxId}/checkIn`,
      method: "POST",
      body: { ...content, boxId },
    });

    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error adding box content:', error);
    return { success: false, error: error.message || "Failed to add box content" };
  }
}

export const checkOutCrab = async (boxId: number, content: UpdateBoxContent) => {
  try {
    console.log("Checking out crab from box:", boxId, content);

    const response = await requestHttp({
      path: `/core/inventory/${boxId}/checkOut`,
      method: "POST",
      body: {
        status: content.status?.toUpperCase()
      },
    });

    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error updating box content:', error);
    return { success: false, error: error.message || "Failed to update box content" };
  }
}