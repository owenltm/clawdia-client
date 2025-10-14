'use server';

import { requestHttp } from "@/lib/api";
import { Inventory } from "@/types/box.types";

export const fetchInventoryOverviewData = async () => {
  const inventoryResponse = await requestHttp<any>({
    path: "/core/inventory/overview",
    method: "GET"
  });
  return inventoryResponse;
};

export const fetchCurrentInventory = async () => {
  const inventoryResponse = await requestHttp<any>({
    path: "/core/inventory/current",
    method: "GET"
  });
  return inventoryResponse;
};

export const fetchInventoryByBoxId = async (boxId: number) => {
  const inventoryResponse = await requestHttp<any>({
    path: `/core/inventory/current`,
    method: "GET"
  });

  const filtered = inventoryResponse.items.filter((item: Inventory) => item.id === boxId);
  return filtered.length > 0 ? filtered[0] : null;
};