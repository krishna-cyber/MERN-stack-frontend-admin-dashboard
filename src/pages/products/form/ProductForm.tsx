import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { ReactNode } from "react";
import { getCategoryList, getTenantsList } from "../../../http/api";
import { Category, Tenant } from "../../../types";

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
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {/* Todo */}
      {/* {!isEditing && (
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
                <Input.Password allowClear />
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
                <Input.Password allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      )} */}

      <Card size="small" title="Image Upload" style={{ width: "100%" }}>
        <Form.Item
          style={{ margin: 0 }}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Product image is required",
            },
          ]}
          name="image"
        >
          {children}
        </Form.Item>
      </Card>

      <Card size="small" title="Tenant info" style={{ width: "100%" }}>
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
      </Card>

      {/* Todo */}
      <Card>{selectedField && <div>Price Attributes...</div>}</Card>

      {/* Todo */}
      <Card> {selectedField && <div>Other Attributes...</div>}</Card>
    </Space>
  );
};

export default ProductForm;
