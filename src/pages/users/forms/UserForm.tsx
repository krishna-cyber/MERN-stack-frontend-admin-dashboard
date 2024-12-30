import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenantsList } from "../../../http/api";
import { Tenant } from "../../../types";

const UserForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ["tenantsList"],
    queryFn: async () => {
      const res = await getTenantsList();
      return res.data;
    },
  });
  return (
    <>
      <Space direction="vertical" size={"middle"}>
        <Card size="small" title="Basic Information" style={{ width: "100%" }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "First Name is required",
                  },
                ]}
                label="First Name"
                name="firstName"
              >
                <Input size="large" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Last Name is required",
                  },
                ]}
                name="lastName"
              >
                <Input size="large" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                label="E-mail"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    type: "email",
                    message: "Email is not valid",
                  },
                ]}
                name="email"
              >
                <Input size="large" allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card
          size="small"
          title="Security Information"
          style={{ width: "100%" }}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                ]}
                name="password"
              >
                <Input.Password size="large" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Confirm Password is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                name="confirmPassword"
              >
                <Input.Password size="large" allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card size="small" title="Role Information" style={{ width: "100%" }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Role is required",
                  },
                ]}
                label="Roles"
                name="role"
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="Roles"
                >
                  <Select.Option value={"admin"}>Admin</Select.Option>
                  <Select.Option value={"manager"}>Manager</Select.Option>
                  <Select.Option value={"customer"}>Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item hasFeedback label="Resturants" name="tenantId">
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="Resturants"
                >
                  {tenants?.result.map((tenant: Tenant) => {
                    return (
                      <Select.Option key={tenant._id} value={tenant._id}>
                        {tenant.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Space>
    </>
  );
};

export default UserForm;
