'use server';

import { requestHttp } from "@/lib/api";

export const fetchInventoryOverviewData = async () => {
  const inventoryResponse = await requestHttp<any>({
    path: "/core/inventory/overview",
    method: "GET"
  });
  return inventoryResponse;
};