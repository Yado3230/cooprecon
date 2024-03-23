"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Jwt, { JwtPayload } from "jsonwebtoken";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {
    setAccessToken(localStorage.getItem("access_token") || "");
    setRefreshToken(localStorage.getItem("refresh_token") || "");
  }, []);

  const login = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);

    const decodedData = Jwt.decode(access) as JwtPayload;
    const role = decodedData.role;
    const clientId = decodedData.clientId;
    // Save tokens to LocalStorage or cookies
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("role", role);
    localStorage.setItem("clientId", clientId);
  };

  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("clientId");
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
