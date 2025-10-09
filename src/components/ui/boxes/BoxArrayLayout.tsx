import { AddBoxContent, Inventory, UpdateBoxContent } from "@/types/box.types";
import BoxLayout from "./BoxLayout";

type BoxArrayLayoutProps = {
  boxes: Inventory[];
  onAddBoxContent?: (id: number, values: AddBoxContent) => Promise<void>;
  onUpdateBoxContent?: (id: number, values: UpdateBoxContent) => void;
};

export default function BoxArrayLayout({ boxes, onAddBoxContent, onUpdateBoxContent }: BoxArrayLayoutProps) {
  const columnHeight = 10;

  // Split boxes into columns
  const columns: Inventory[][] = [];
  for (let i = 0; i < boxes.length; i += columnHeight) {
    columns.push(boxes.slice(i, i + columnHeight));
  }

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <div className="flex gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-2">
            {column.map((box) => (
              <BoxLayout key={box.id} box={box} onAddContent={onAddBoxContent} onUpdateContent={onUpdateBoxContent} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}