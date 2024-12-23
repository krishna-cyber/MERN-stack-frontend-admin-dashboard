import { Card, Col, Form, Input, Row } from "antd";

const UserForm = () => {
  return (
    <>
      <Card title="Basic Information" size="small">
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item required label="First Name" name="firstName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item required label="Last Name" name="lastName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UserForm;
