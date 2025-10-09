import { addContentToBox } from "@/services/boxService";
import { updateCrab } from "@/services/crabService";
import { AddBoxContent, Inventory, UpdateBoxContent } from "@/types/box.types";
import { BoxContentModal } from "./BoxContentModal";

type BoxLayoutProps = {
  box: Inventory;
  onAddContent?: (boxId: number, values: AddBoxContent) => Promise<void>;
  onUpdateContent?: (boxId: number, values: UpdateBoxContent) => void;
};

export default function BoxLayout({ box }: BoxLayoutProps) {
  const getContainerStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filled':
        return 'bg-green-700 border-green-500';
      default:
        return 'bg-gray-700 border-gray-500';
    }
  };

  const getTextStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filled':
        return 'text-green-200';
      default:
        return 'text-gray-200';
    }
  };

  const handleSaveContent = async (values: any) => {
    if (box.content.length > 0) {
      console.log(values);
      await updateCrab(box.content[0].id, values as UpdateBoxContent);
    } else {
      await addContentToBox(box.id, values as AddBoxContent);
    }
  };

  return (
    // Creates a modal for every box, maybe not so ideal
    <BoxContentModal
      key={box.id}
      initialValues={box.content.length == 1 ? box.content[0] as any : {}}
      onSubmit={handleSaveContent}
      title={box.content.length > 0 ? `Edit Content in ${box.label}` : `Add Content to ${box.label}`}
      description="Fill in the details below to add or edit a content record."
    >
      <div className={`flex flex-col justify-around items-center rounded-lg py-2 px-4 shadow-sm border w-48 min-h-28  ${getContainerStyles(box.status)}`}>
        {/* Label */}
        <div className={`font-semibold text-lg ${getTextStyles(box.status)}`}>
          {box.label}
        </div>

        {/* Description */}
        <div className={`${getTextStyles(box.status)} overflow-y-auto w-full`}>
          {box.content.length > 0 && box.content.map((crab, index) => (
            <div key={index} className="w-full">
              <div className={`flex justify-between gap-4 text-xl ${getTextStyles(box.status)}`}>
                <div>{crab.weight}</div>
                <div>{crab.supplier}</div>
              </div>
              <div className={`text-sm ${getTextStyles(box.status)}`}>{new Date(crab.checkInDate).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </BoxContentModal>
  );
}