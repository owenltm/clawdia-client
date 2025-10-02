import { fetchAllBoxes } from "@/services/boxService";

export const dynamic = "force-dynamic";

export default async function Page() {
  const boxes = await fetchAllBoxes();

  console.log(boxes);

  return <div>Boxes Page - To be implemented</div>
}