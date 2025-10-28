import { User } from "@/types/auth.types";
import React, { createContext, ReactNode, useContext } from 'react';

type UserContextType = {
  data: User[] | null;
  refreshData: () => Promise<void>;
}

type UserProviderProps = {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, onRefresh }: UserProviderProps) {
  const [data, setData] = React.useState<User[] | null>(null);

  const contextValue = React.useMemo(() => ({
    data,
    refreshData: onRefresh ? onRefresh : async () => { },
  }), [data, onRefresh]);

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