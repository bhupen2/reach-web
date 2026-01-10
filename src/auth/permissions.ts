export type Role = "ADMIN" | "MANAGER" | "USER";
export type Permission = "dashboard:view" | "users:view";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: ["dashboard:view", "users:view"],
  MANAGER: ["dashboard:view"],
  USER: ["dashboard:view"]
};
