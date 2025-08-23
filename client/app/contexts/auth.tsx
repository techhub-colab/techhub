import type { AxiosError } from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getMe } from '~/services/api/user';
import type { User } from '~/types/user';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (accessToken: string, userData?: User) => void;
  clearAuth: () => void;
  reloadUser: (userData?: User) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const setAuth = useCallback((accessToken: string, userData?: User) => {
    localStorage.setItem('accessToken', accessToken);
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
    }
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const reloadUser = useCallback((userData?: User) => {
    if (userData) {
      setUser(userData);
    } else {
      getMe()
        .then(usr => setUser(usr))
        .catch((err: AxiosError) => {
          if (err.response?.status === 401) {
            clearAuth();
          } else {
            console.error(err);
          }
        });
    }
  }, [clearAuth]);

  // Initialize
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('accessToken'));
  }, []);

  useEffect(() => {
    if (isAuthenticated && !user) {
      reloadUser();
    }
  }, [isAuthenticated, user, reloadUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setAuth, clearAuth, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
