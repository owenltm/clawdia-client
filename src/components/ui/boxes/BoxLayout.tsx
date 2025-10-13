import { useBoxContext } from "@/contexts/BoxContext";
import { Inventory } from "@/types/box.types";

type BoxLayoutProps = {
  inventory: Inventory;
};

export default function BoxLayout({ inventory }: BoxLayoutProps) {
  const { updateFocusedBox } = useBoxContext();

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

  const handleBoxClick = () => {
    updateFocusedBox(inventory);
  }

  return (
    <div onClick={handleBoxClick} className={`flex flex-col items-left rounded-lg py-2 px-4 shadow-sm border w-48 ${getContainerStyles(inventory.status)}`}>
      {/* Label */}
      <div className={`font-semibold mb-2 text-lg ${getTextStyles(inventory.status)}`}>
        {inventory.label}
      </div>

      {/* Description */}
      {/* <div className={`${getTextStyles(inventory.status)} overflow-y-auto w-full`}>
        {inventory.content.length > 0 && inventory.content.map((crab, index) => (
          <div key={index} className="w-full">
            <div className={`flex justify-between gap-4 text-xl ${getTextStyles(inventory.status)}`}>
              <div>{crab.weight}</div>
              <div>{crab.supplier}</div>
            </div>
            <div className={`text-sm ${getTextStyles(inventory.status)}`}>{new Date(crab.checkInDate).toLocaleDateString()}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
}