import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Permission } from "../auth/permissions";
import React from "react";

export interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  permission: Permission;
}

export const MENU: MenuItem[] = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    permission: "dashboard:view"
  },
  {
    key: "/dashboard/users",
    label: "Users",
    icon: <UserOutlined />,
    permission: "users:view"
  }
];
