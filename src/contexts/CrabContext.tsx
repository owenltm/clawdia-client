import { Crab } from "@/types/crab.types";
import React, { createContext, ReactNode, useContext } from 'react';

type CrabContextType = {
  focusedCrab: Crab | null;
  updateFocusedCrab: (crab: Crab | null) => void;
  refreshData: () => void;
}

type CrabProviderProps = {
  children: ReactNode;
  onRefresh?: () => void;
}

const CrabContext = createContext<CrabContextType | undefined>(undefined);

export function CrabProvider({ children, onRefresh }: CrabProviderProps) {
  const [focusedCrab, setFocusedCrab] = React.useState<Crab | null>(null);

  const updateFocusedCrab = React.useCallback((crab: Crab | null) => {
    setFocusedCrab(crab);
  }, []);

  const refreshData = React.useCallback(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  const contextValue = React.useMemo(() => ({
    focusedCrab,
    updateFocusedCrab,
    refreshData
  }), [focusedCrab, updateFocusedCrab, refreshData]);

  return (
    <CrabContext.Provider value={contextValue}>
      {children}
    </CrabContext.Provider>
  );
}

export function useCrabContext() {
  const context = useContext(CrabContext);
  if (context === undefined) {
    throw new Error('useCrabContext must be used within a CrabProvider');
  }
  return context;
}