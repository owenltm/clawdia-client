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

export const addContentToBox = async (boxId: number, content: AddBoxContent) => {
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

export const updateContentOnBox = async (boxId: number, content: UpdateBoxContent) => {
  try {
    const response = await requestHttp({
      path: `/core/inventory/${boxId}/checkOut`,
      method: "PUT",
      body: { ...content, boxId },
    });

    return { success: true, data: response };
  } catch (error: any) {
    console.error('Error updating box content:', error);
    return { success: false, error: error.message || "Failed to update box content" };
  }
}