import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import authService from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        toast.error('Invalid token', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      await authService.register(userData);
      return { ok: true, message: 'Registered successfully.' };
    } catch (error) {
      toast.error(error);
      return { ok: false, message: error };
    }
  };

  const login = async (credentials) => {
    try {
      const token = await authService.login(credentials);
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      return { ok: true, message: 'Logged in succesfully.' };
    } catch (error) {
      toast.error(error);
      return { ok: false, message: error };
    }
  };

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export default AuthContext;
