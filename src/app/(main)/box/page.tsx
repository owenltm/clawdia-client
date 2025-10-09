import { fetchCurrentInventory } from "@/services/inventoryService";
import BoxPage from "./BoxPage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const inventory = await fetchCurrentInventory();

  return <>
    <BoxPage inventories={inventory.items} />
  </>
}