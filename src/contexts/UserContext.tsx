import { User } from "@/types/auth.types";
import React, { createContext, ReactNode, useContext } from 'react';

type UserContextType = {
  focusedUser: User | null;
  updateFocusedUser: (user: User | null) => void;
  refreshData: () => void;
}

type UserProviderProps = {
  children: ReactNode;
  onRefresh?: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, onRefresh }: UserProviderProps) {
  const [focusedUser, setFocusedUser] = React.useState<User | null>(null);

  const updateFocusedUser = React.useCallback((user: User | null) => {
    setFocusedUser(user);
  }, []);

  const refreshData = React.useCallback(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  const contextValue = React.useMemo(() => ({
    focusedUser,
    updateFocusedUser,
    refreshData,
  }), [focusedUser, updateFocusedUser, refreshData]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}