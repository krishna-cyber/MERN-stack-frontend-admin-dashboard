import { Card, Col, Form, Input, Row, Select } from "antd";
import React from "react";
interface ProductFilterInterface {
  children: React.ReactNode;
}

const ProductFilters = ({ children }: ProductFilterInterface) => {
  return (
    <Card
      style={{
        padding: 0,
      }}
    >
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                name={"search"}
                style={{
                  margin: 0,
                }}
              >
                <Input.Search allowClear placeholder="search" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={"role"}
                style={{
                  margin: 0,
                }}
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Roles"
                >
                  <Select.Option value={"admin"}>Admin</Select.Option>
                  <Select.Option value={"manager"}>Manager</Select.Option>
                  <Select.Option value={"customer"}>Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={8}>
            <Select
              allowClear
              style={{ width: "100%" }}
              onChange={(value) => onFilterChange("statusFilter", value)}
              placeholder="Status"
            >
              <Select.Option value={"ban"}>Banned</Select.Option>
              <Select.Option value={"active"}>Active</Select.Option>
            </Select>
          </Col> */}
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductFilters;
