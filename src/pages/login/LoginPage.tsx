import { LockOutlined, UserOutlined } from "@ant-design/icons";

import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Space,
  Typography,
} from "antd";

const { Text } = Typography;

import logo from "../../assets/logo.jpg";

import { useAuthStore } from "../../store";
import { Navigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login, self } from "../../http/api";

const LoginPage = () => {
  const location = useLocation();

  const { user } = useAuthStore();

  const getSelf = useQuery({
    queryKey: ["self"],
    queryFn: self,
    retry: false,
    enabled: false, // Disable automatic query execution
  });
  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: async () => {
      await getSelf.refetch();
    },
  });

  if (user) {
    const returnTo =
      new URLSearchParams(location.search).get(`returnTo`) || "/";
    return <Navigate to={`${returnTo}`} replace={true} />;
  }

  return (
    <Layout
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Space direction="vertical">
        <Layout.Content
          style={{
            textAlign: "center",
            fontSize: 16,
          }}
        >
          <Avatar size={"large"} src={logo} />{" "}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Login
          </Text>
        </Layout.Content>
        <Card
          style={{
            width: 300,
          }}
          title={
            <Space
              style={{
                width: "100%",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              <LockOutlined />
              Login Page
            </Space>
          }
        >
          {loginMutation.isError && (
            <Alert
              style={{
                marginBottom: 16,
              }}
              closable
              type="error"
              message={loginMutation.error.message}
            />
          )}
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => {
              loginMutation.mutate({
                email: values.username,
                password: values.password,
              });
            }}
          >
            <Form.Item
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Username is required",
                  transform: (value) => value.trim(),
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Space
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Checkbox>Remember me</Checkbox>

                <a href="">Forgot password</a>
              </Space>
            </Form.Item>

            <Form.Item name="submit">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                }}
                loading={loginMutation.isPending}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  );
};

export default LoginPage;
