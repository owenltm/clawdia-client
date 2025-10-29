import { fetchCurrentInventory } from "@/services/inventoryService";
import { Inventory } from "@/types/box.types";
import { BoxDetailDrawer } from "./BoxDetailDrawer";
import BoxLayout from "./BoxLayout";

export default async function BoxArrayLayout(_params: { inventory: Inventory[] | null }) {
  const inventoryResponse = await fetchCurrentInventory();
  const columnHeight = 10;

  const currentInventory = inventoryResponse.items || [];

  // Split boxes into columns
  const columns: Inventory[][] = [];
  for (let i = 0; i < currentInventory.length; i += columnHeight) {
    columns.push(currentInventory.slice(i, i + columnHeight));
  }

  return (
    <BoxDetailDrawer>
      <div className="flex gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((box) => (
              <BoxLayout key={box.id} inventory={box} />
            ))}
          </div>
        ))}
      </div>
    </BoxDetailDrawer>
  );
}