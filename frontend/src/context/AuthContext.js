import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { authAPI } from '@/utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const { data } = await authAPI.getMe();
        setUser(data.data);
      } catch (error) {
        Cookies.remove('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      Cookies.set('token', data.token, { expires: 7 });
      setUser(data.user);
      toast.success('Login successful!');
      router.push('/admin');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Ignore logout errors
    }
    Cookies.remove('token');
    setUser(null);
    router.push('/admin/login');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
