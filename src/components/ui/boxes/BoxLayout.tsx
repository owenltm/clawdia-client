"use client";

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
      case 'unavailable':
        return 'bg-orange-300 border-orange-200';
      default:
        return 'bg-gray-700 border-gray-500';
    }
  };

  const getTextStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'filled':
        return 'text-green-200';
      case 'unavailable':
        return 'text-orange-700';
      default:
        return 'text-gray-200';
    }
  };

  const handleBoxClick = () => {
    updateFocusedBox(inventory);
  }

  return (
    <div onClick={handleBoxClick} className={`flex flex-col justify-between items-left rounded-lg py-2 px-4 shadow-sm border w-48 min-h-28 ${getContainerStyles(inventory.status)}`}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <div className={`font-semibold text-lg ${getTextStyles(inventory.status)}`}>
          {inventory.label}
        </div>
        <div className={`text-sm ${getTextStyles(inventory.status)}`}>
          {inventory.content.length}/{inventory.maxFill}
        </div>
      </div>

      {/* Description */}
      <div className={`${getTextStyles(inventory.status)} overflow-y-auto w-full`}>
        {inventory.content.length > 0 && inventory.content.slice(0, 2).map((crab, index) => (
          <div key={index} className="w-full">
            <div className={`text-sm ${getTextStyles(inventory.status)}`}>
              {parseInt(crab.weight.toString())}g - {new Date(crab.checkInDate).toLocaleDateString()} - {crab.supplier}
            </div>
          </div>
        ))}
        {inventory.content.length > 2 && (
          <div className={`text-sm italic ${getTextStyles(inventory.status)}`}>
            ...and {inventory.content.length - 2} more
          </div>
        )}
        {
          (inventory.content.length === 0 &&
            inventory.status.toLowerCase() === 'unavailable'
          ) && (
            <div className={`text-sm italic ${getTextStyles(inventory.status)}`}>
              {inventory.notes || 'This box is currently unavailable.'}
            </div>
          )
        }
      </div>
    </div>
  );
}