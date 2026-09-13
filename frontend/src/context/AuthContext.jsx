import React, { createContext, useContext, useState } from 'react';
import api from '../api/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sana_user') || 'null');
    } catch {
      return null;
    }
  });

  async function login(email, password) {
    const res = await api.post('/auth/customer-login', { email, password });
    localStorage.setItem('sana_user_token', res.data.token);
    localStorage.setItem('sana_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
  }

  async function register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('sana_user_token', res.data.token);
    localStorage.setItem('sana_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
  }

  async function loginWithPhone(idToken) {
    const res = await api.post('/auth/customer-phone-login', { idToken });
    localStorage.setItem('sana_user_token', res.data.token);
    localStorage.setItem('sana_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
  }

  async function updateProfile(profile) {
    const res = await api.patch('/auth/profile', profile);
    localStorage.setItem('sana_user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  }

  function logout() {
    localStorage.removeItem('sana_user_token');
    localStorage.removeItem('sana_user');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, register, loginWithPhone, updateProfile, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}