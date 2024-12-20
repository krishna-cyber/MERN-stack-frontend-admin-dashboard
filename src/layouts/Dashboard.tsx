import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { Avatar, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
  CreditCardOutlined,
  HomeFilled,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.jpg";

const { Sider, Content, Footer, Header } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "/",
      label: <NavLink to={"/"}>Home</NavLink>,
      icon: <HomeFilled />,
    },
    {
      key: "/users",
      label: <NavLink to={"/users"}>Users</NavLink>,
      icon: <UserOutlined />,
    },
    {
      key: "/orders",
      label: <NavLink to={"/orders"}>Orders</NavLink>,
      icon: <CreditCardOutlined />,
    },
    {
      key: "/products",
      label: <NavLink to={"/products"}>Products</NavLink>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <NavLink to={"/users"}>Users</NavLink>,
      icon: <UserOutlined />,
    },
  ];

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <Avatar
            style={{
              margin: "16px auto",
              display: "block",
            }}
            src={logo}
            alt="logo"
          />
          <h1
            style={{
              display: collapsed ? "none" : "block",
              textAlign: "center",
              letterSpacing: "0.01rem",
              textTransform: "uppercase",
            }}
          >
            Pizza Delivery
          </h1>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div> */}
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
