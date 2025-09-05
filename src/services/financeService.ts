import { requestHttp } from "@/lib/api";
import { Finance } from "@/types/finance.types";

export const fetchAllFinances = async () => {
  const financeResponse = await requestHttp<Finance[]>({
    path: "/core/finance",
    method: "GET",
  });
  return financeResponse;
}