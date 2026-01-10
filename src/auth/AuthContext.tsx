import { createContext, useContext, useState, ReactNode } from "react";
import { ROLE_PERMISSIONS, Role, Permission } from "./permissions";

interface AuthCtx {
  token: string | null;
  role: Role;
  permissions: Permission[];
  login: (token: string, role: Role) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("access_token"));
  const [role, setRole] = useState<Role>("USER");

  const login = (t: string, r: Role) => {
    localStorage.setItem("access_token", t);
    setToken(t);
    setRole(r);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  return (
    <Ctx.Provider value={{ token, role, permissions: ROLE_PERMISSIONS[role], login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside provider");
  return ctx;
}
