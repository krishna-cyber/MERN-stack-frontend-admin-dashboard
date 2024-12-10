import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
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

const LoginPage = () => {
  return (
    <>
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
            <Form>
              <Form.Item name={"username"}>
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item name={"password"}>
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>

                <a href="">Forgot password</a>
              </Form.Item>

              <Form.Item name="submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                  }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
