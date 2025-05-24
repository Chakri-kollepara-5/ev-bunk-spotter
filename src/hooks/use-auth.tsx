
"use client";

// Firebase has been removed. This is a stubbed AuthProvider.
// No actual authentication will occur.

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define a minimal User type if needed, or use `any` or `null`
interface User {
  // Minimal representation, Firebase User type is no longer available
  email: string | null;
  displayName?: string | null;
  // Add other fields if your components expect them, but they will be null/undefined
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // No Firebase, so not initially loading
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // No Firebase, so no auth state listener needed.
    // User will always be null unless manually set for testing non-Firebase auth.
    setLoading(false);
    console.warn("Firebase AuthProvider is stubbed. No real authentication will occur.");
  }, []);

  const signOutUser = async () => {
    setUser(null);
    toast({ title: "Signed Out (Stub)", description: "User session cleared (Firebase removed)." });
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
