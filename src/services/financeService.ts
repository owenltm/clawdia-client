'use server';

import { requestHttp } from "@/lib/api";
import { Finance } from "@/types/finance.types";

export const fetchAllFinances = async () => {
  const financeResponse = await requestHttp<Finance[]>({
    path: "/core/finance",
    method: "GET",
  });
  return financeResponse;
}

export const createFinance = async (finance: Omit<Finance, "id">): Promise<boolean> => {
  const response = await requestHttp<any>({
    path: "/core/finance",
    method: "POST",
    body: finance
  });

  return response.success;
}

export const updateFinance = async (id: number, finance: Omit<Finance, "id">): Promise<boolean> => {
  const response = await requestHttp<any>({
    path: `/core/finance/${id}`,
    method: "PUT",
    body: finance
  });

  return response.success;
}

export const deleteFinance = async (id: number): Promise<boolean> => {
  const response = await requestHttp<any>({
    path: `/core/finance/${id}`,
    method: "DELETE"
  });

  return response.success;
}