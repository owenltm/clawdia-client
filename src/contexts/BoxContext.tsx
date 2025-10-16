import { checkInCrab, checkOutCrab, createBox, updateBox } from '@/services/boxService';
import { updateCrab } from '@/services/crabService';
import { AddBoxContent, Box, CreateBoxParam, Inventory, UpdateBoxContent } from '@/types/box.types';
import { Crab } from '@/types/crab.types';
import React, { createContext, ReactNode, useContext } from 'react';

type BoxContextType = {
  focusedBox: Inventory | null;
  updateFocusedBox: (box: Inventory | null) => void;
  checkInCrab: (boxId: number, content: AddBoxContent) => Promise<any>;
  checkOutCrab: (boxId: number, content: UpdateBoxContent) => Promise<any>;
  updateCrab: (crabId: number, content: Partial<Crab>) => Promise<any>;
  updateBox: (boxId: number, boxData: Partial<Box>) => Promise<any>;
  createBox: (boxData: CreateBoxParam) => Promise<any>;
}

type BoxProviderProps = {
  children: ReactNode;
}

const BoxContext = createContext<BoxContextType | undefined>(undefined);

export function BoxProvider({ children }: BoxProviderProps) {
  const [focusedBox, setFocusedBox] = React.useState<Inventory | null>(null);

  const updateFocusedBox = React.useCallback((box: Inventory | null) => {
    setFocusedBox(box);
  }, []);

  const contextValue = React.useMemo(() => ({
    focusedBox,
    updateFocusedBox,
    checkInCrab,
    checkOutCrab,
    updateCrab,
    updateBox,
    createBox,
  }), [focusedBox, updateFocusedBox]);

  return (
    <BoxContext.Provider value={contextValue}>
      {children}
    </BoxContext.Provider>
  );
}

export function useBoxContext() {
  const context = useContext(BoxContext);
  if (context === undefined) {
    throw new Error('useBoxContext must be used within a BoxProvider');
  }
  return context;
}