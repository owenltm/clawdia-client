import { useBoxContext } from "@/contexts/BoxContext";
import { AddBoxContent, Inventory } from "@/types/box.types";
import { BoxContentFormValues, BoxContentModal } from "./BoxContentModal";
import BoxLayout from "./BoxLayout";

type BoxArrayLayoutProps = {
  boxes: Inventory[];
};

export default function BoxArrayLayout({ boxes }: BoxArrayLayoutProps) {
  const columnHeight = 10;
  const { focusedBox, updateFocusedBox, checkInCrab, updateCrab } = useBoxContext();

  // Split boxes into columns
  const columns: Inventory[][] = [];
  for (let i = 0; i < boxes.length; i += columnHeight) {
    columns.push(boxes.slice(i, i + columnHeight));
  }

  const handleModalSave = async (values: BoxContentFormValues) => {
    if (!focusedBox) return;

    if (focusedBox.content.length > 0) {
      await updateCrab(focusedBox.content[0].id, values);
    } else if (focusedBox.content.length < 1) {
      console.log("Checking in new crab to box:", focusedBox.id, values);
      await checkInCrab(focusedBox.id, values as AddBoxContent);
    }

    updateFocusedBox(null);
  }

  return (
    // Creates a modal for every box, maybe not so ideal
    <BoxContentModal
      initialValues={(focusedBox && focusedBox?.content.length > 0) ? focusedBox?.content[0] as any : { boxId: focusedBox?.id }}
      onSubmit={handleModalSave}
      title={(focusedBox && focusedBox?.content.length > 0) ? `Edit Content in ${focusedBox.label}` : `Add Content to ${focusedBox?.label}`}
      description="Fill in the details below to add or edit a content record."
    >
      <div className="overflow-x-auto overflow-y-auto">
        <div className="flex gap-4">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-2">
              {column.map((box) => (
                <BoxLayout key={box.id} inventory={box} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </BoxContentModal>
  );
}