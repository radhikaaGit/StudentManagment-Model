import React, { createContext, useContext, useState } from "react";
import { getToken, isLoggedIn, logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    logoutUser();
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated: isLoggedIn() && !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}