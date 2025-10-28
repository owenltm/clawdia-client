"use client";

import { useCookies } from '@/hooks/useCookies';
import { getCurrentUser as fetchCurrentUser } from '@/services/authService';
import { User } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';

type AuthContextType = {
  currentUser?: User | null;
  logout: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  useEffect(() => {
    const token = useCookies.get("auth_token");

    if (!token) {
      setCurrentUser(null);
      return;
    }

    const getCurrentUser = async () => {
      try {
        const currentUserResponse = await fetchCurrentUser();
        if (currentUserResponse.success) {
          setCurrentUser(currentUserResponse.data as User);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setCurrentUser(null);
      }
    };

    getCurrentUser();
  }, []);

  const logout = () => {
    useCookies.remove("auth_token");
    setCurrentUser(null);

    router.replace("/login");
  }

  const contextValue = React.useMemo(() => ({
    currentUser,
    logout
  }), [currentUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}