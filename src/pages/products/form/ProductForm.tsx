import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space, Switch } from "antd";
import { ReactNode } from "react";
import { getCategoryList, getTenantsList } from "../../../http/api";
import { Category, Tenant } from "../../../types";
import PricingSectionForm from "./PricingSectionForm";
import AttributesSectionForm from "./AttributesSectionForm";

//Todo:
//pRODUCT FORM complete
//eDIT AND update reusable form
const ProductForm = ({ children }: { children: ReactNode }) => {
  const { data: categoryList } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      const res = await getCategoryList();
      return res.data;
    },
  });

  const { data: tenants } = useQuery({
    queryKey: ["tenantsList"],
    queryFn: async () => {
      const res = await getTenantsList();
      return res.data;
    },
  });

  const selectedField = Form.useWatch("categoryId");
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={"middle"}>
      <Card
        size="small"
        title="Product Basic Information"
        style={{ width: "100%" }}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Product Name is required",
                },
              ]}
              label="Product Name"
              name="name"
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"categoryId"}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: "Select category of product",
                },
              ]}
              label="Categories"
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
          <Col span={24}>
            <Form.Item
              name={"description"}
              style={{
                margin: 0,
              }}
              label="Product Description"
              rules={[
                {
                  required: true,
                  message: "Description of product is required",
                },
              ]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        size="small"
        title="Image Upload (Only 4)"
        style={{ width: "100%" }}
      >
        {children}
      </Card>

      <Card size="small" title="Tenant info" style={{ width: "100%" }}>
        <Form.Item
          name="tenantId"
          label="Resturant info"
          style={{ margin: 0 }}
          layout="horizontal"
          rules={[{ required: true, message: "Select Resturant" }]}
        >
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
      </Card>
      {selectedField && <PricingSectionForm categoryId={selectedField} />}

      {selectedField && <AttributesSectionForm categoryId={selectedField} />}
      <Card size="small" title="Other properties" style={{ width: "100%" }}>
        <Form.Item
          name="isPublish"
          style={{ margin: 0 }}
          label="Publish"
          layout="horizontal"
        >
          <Switch defaultChecked checkedChildren="yes" unCheckedChildren="no" />
        </Form.Item>
      </Card>
    </Space>
  );
};

export default ProductForm;
