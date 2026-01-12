import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/db/User';
import { logoutUser } from '@/fetching/auth';

interface AuthContextType {
  user: User | null;
  setAuth: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted auth state on app start
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const setAuth = async (newUser: User) => {
    try {
      setUser(newUser);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // Call backend logout and clear tokens from keychain
      await logoutUser();
      // Clear user from state and AsyncStorage
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to logout:', error);
      // Still clear local state even if backend call fails
      setUser(null);
      await AsyncStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
