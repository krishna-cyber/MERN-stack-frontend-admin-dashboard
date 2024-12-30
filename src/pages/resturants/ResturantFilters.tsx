import { Card, Col, Form, Input, Row } from "antd";

interface ResturantFiltersProps {
  children?: React.ReactNode;
}

const ResturantFilters = ({ children }: ResturantFiltersProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={8}>
          <Form.Item name={"search"}>
            <Input.Search allowClear placeholder="search" />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ResturantFilters;
