import { requestHttp } from "@/lib/api";
import { Box } from "@/types/box.types";

export const fetchAllBoxes = async () => {
  const crabResponse = await requestHttp<Box[]>({
    path: "/core/boxes",
    method: "GET",
  });
  return crabResponse;
}