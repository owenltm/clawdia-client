import { requestHttp } from "@/lib/api";
import { Crab } from "@/types/crab.types";

export const fetchAllCrabs = async () => {
  const crabResponse = await requestHttp<Crab[]>({
    path: "/core/crabs",
    method: "GET",
  });
  return crabResponse;
}