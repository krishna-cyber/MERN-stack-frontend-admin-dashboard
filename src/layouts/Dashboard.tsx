import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  Tag,
  theme,
} from "antd";
import { useState } from "react";
import {
  BellFilled,
  CreditCardOutlined,
  HomeFilled,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.jpg";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";

const { Sider, Content, Footer, Header } = Layout;

function getMenuItems(role: string) {
  const baseItems = [
    {
      key: "/",
      label: <NavLink to={"/"}>Home</NavLink>,
      icon: <HomeFilled />,
      priority: 1,
    },

    {
      key: "/orders",
      label: <NavLink to={"/orders"}>Orders</NavLink>,
      icon: <CreditCardOutlined />,
      priority: 3,
    },
    {
      key: "/products",
      label: <NavLink to={"/products"}>Products</NavLink>,
      icon: <UserOutlined />,
      priority: 4,
    },
  ];

  if (role === "admin") {
    const adminMenuItems = [
      ...baseItems,
      {
        key: "/users",
        label: <NavLink to={"/users"}>Users</NavLink>,
        icon: <UserOutlined />,
        priority: 2,
      },
    ].sort((a, b) => a.priority - b.priority);

    return adminMenuItems;
  }

  return baseItems;
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();
  const { logOut: logOutFromStore } = useAuthStore();

  const { mutate: logOutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      logOutFromStore();
    },
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = getMenuItems(user?.role);

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
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Flex
            justify={"space-between"}
            align="center"
            style={{ padding: 16, width: "100%" }}
          >
            <Tag color="success">
              <Badge status="success" style={{ paddingRight: 4 }} />
              Global
            </Tag>
            <Space size={40}>
              <Badge dot={true}>
                <BellFilled />
              </Badge>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      key: "/logout",
                      label: "Logout",
                      onClick: () => {
                        logOutMutate();
                      },
                    },
                  ],
                }}
                placement="bottomLeft"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                    cursor: "pointer",
                  }}
                >
                  U
                </Avatar>
              </Dropdown>
            </Space>
          </Flex>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Mern stack Project ©{new Date().getFullYear()} Created by Krishna
          Tiwari
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
