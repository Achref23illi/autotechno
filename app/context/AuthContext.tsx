'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the User type
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

// Define the Authentication Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
});

// Authentication Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if the user is already logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        // In a real app, you would call your API to check if the user is logged in
        // For now, we'll check localStorage
        const storedUser = localStorage.getItem('autotechno_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setError('Failed to authenticate user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would call your API to authenticate the user
      // For now, we'll simulate a successful login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const userData = await response.json();
      
      // Store user data in localStorage for persistence
      localStorage.setItem('autotechno_user', JSON.stringify(userData.user));
      
      // Update state
      setUser(userData.user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during login');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Admin-only login system - register function removed

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      // In a real app, you would call your API to logout
      // For now, we'll just clear localStorage
      localStorage.removeItem('autotechno_user');
      
      // Update state
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create the context value object
  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;