import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select } from "antd";

const UserFilters = () => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Input.Search placeholder="search" />
            </Col>
            <Col span={8}>
              <Select style={{ width: "100%" }} placeholder="status">
                <Select.Option value={"admin"} placeholder="admin">
                  Admin
                </Select.Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select style={{ width: "100%" }} placeholder="Role">
                <Select.Option value={"admin"}>Admin</Select.Option>
                <Select.Option value={"manager"}>Manager</Select.Option>
                <Select.Option value={"customer"}>Customer</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          <Button color={"primary"} variant={"solid"} icon={<PlusOutlined />}>
            Add User
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilters;
