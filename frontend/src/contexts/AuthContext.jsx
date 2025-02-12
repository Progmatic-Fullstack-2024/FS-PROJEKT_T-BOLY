import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import authService from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAdult, setIsUserAdult] = useState(false);

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

        const birthDate = new Date(decodedToken.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        const isAdult =
          monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())
            ? age - 1 >= 18
            : age >= 18;

        setIsUserAdult(isAdult);
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

  const passwordChange = async (id, values) => {
    try {
      await authService.passwordChange(id, values);

      return { ok: true, message: 'Logged in succesfully.' };
    } catch (error) {
      toast.error(error);
      return { ok: false, message: error };
    }
  };

  const value = { user, setUser, login, register, logout, passwordChange, isUserAdult };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export default AuthContext;
