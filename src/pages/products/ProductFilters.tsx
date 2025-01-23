import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { getCategoryList, getTenantsList } from "../../http/api";
import { Category, Tenant } from "../../types";
interface ProductFilterInterface {
  children: React.ReactNode;
}

const ProductFilters = ({ children }: ProductFilterInterface) => {
  const { data: tenants } = useQuery({
    queryKey: ["tenantsList"],
    queryFn: async () => {
      const res = await getTenantsList();
      return res.data;
    },
  });

  const { data: categoryList } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      const res = await getCategoryList();
      return res.data;
    },
  });

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
              <Form.Item name="tenantId" style={{ margin: 0 }}>
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
            <Col span={8}>
              <Form.Item
                name={"categoryId"}
                style={{
                  margin: 0,
                }}
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Categories"
                >
                  {categoryList?.result.map((category: Category) => {
                    return (
                      <Select.Option key={category._id} value={category._id}>
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
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
