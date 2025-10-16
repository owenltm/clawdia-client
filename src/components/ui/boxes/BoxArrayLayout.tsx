import { Inventory } from "@/types/box.types";
import { BoxDetailDrawer } from "./BoxDetailDrawer";
import BoxLayout from "./BoxLayout";

type BoxArrayLayoutProps = {
  boxes: Inventory[];
};

export default function BoxArrayLayout({ boxes }: BoxArrayLayoutProps) {
  const columnHeight = 10;

  // Split boxes into columns
  const columns: Inventory[][] = [];
  for (let i = 0; i < boxes.length; i += columnHeight) {
    columns.push(boxes.slice(i, i + columnHeight));
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