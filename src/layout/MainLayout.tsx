import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../auth/AuthContext";
import { MENU } from "./menu";

const { Sider, Header, Content } = Layout;

export default function MainLayout({ children }: { children: ReactNode }) {
  const { permissions } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const items = MENU
    .filter(m => permissions.includes(m.permission))
    .map(m => ({ key: m.key, label: m.label, icon: m.icon }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[loc.pathname]}
          items={items}
          onClick={e => nav(e.key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff",fontFamily:"Roboto",fontSize:"24px",fontWeight:"bold" }}>Reach CRM</Header>
        <Content style={{ margin: 16 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
