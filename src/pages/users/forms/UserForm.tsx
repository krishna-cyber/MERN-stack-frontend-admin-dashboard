import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import { Tenant } from "../../../types";

const UserForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const res = await getTenants();
      return res.data;
    },
  });
  return (
    <>
      <Space direction="vertical" size={"middle"}>
        <Card size="small" title="Basic Information" style={{ width: "100%" }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item required label="First Name" name="firstName">
                <Input size="large" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item required label="Last Name" name="lastName">
                <Input size="large" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item required label="E-mail" name="email">
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
              <Form.Item required label="Password" name="password">
                <Input.Password size="large" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item required label="Confirm Password">
                <Input.Password size="large" allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card size="small" title="Role Information" style={{ width: "100%" }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item required label="Roles" name="role">
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
              <Form.Item label="Resturants" name="tenantId">
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  placeholder="Resturants"
                >
                  {tenants?.result.map((tenant: Tenant) => {
                    return (
                      <Select.Option value={tenant._id}>
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
