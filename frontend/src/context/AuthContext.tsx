import { useState, type ReactNode } from "react";

import authService from "../services/authService";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access"),
  );

  const isAuthenticated = accessToken !== null;

  const login = async (username: string, password: string) => {
    const tokens = await authService.login({ username, password });

    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

    setAccessToken(tokens.access);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await authService.register({ username, email, password });
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh");

    try {
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
