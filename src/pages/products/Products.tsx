import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Flex, Space, Drawer, theme } from "antd";
import { NavLink } from "react-router-dom";
import ProductFilters from "./ProductFilters";
import { useState } from "react";
import ProductForm from "./form/ProductForm";
import UploadImage from "./form/UploadImage";

const Products = () => {
  const [dataFilterForm] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const handleFormSubmit = () => {
    console.log(`submitting...`);
  };

  return (
    <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
      <Flex justify="space-between">
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            { title: <NavLink to={"/"}>Dashboard</NavLink> },
            { title: <NavLink to={"/products"}>Products</NavLink> },
          ]}
        />
      </Flex>
      <Form form={dataFilterForm} onFieldsChange={() => {}}>
        <ProductFilters>
          <Button
            color={"primary"}
            variant={"solid"}
            onClick={() => {
              setDrawerOpen(true);
            }}
            icon={<PlusOutlined />}
          >
            Add Product
          </Button>
        </ProductFilters>
      </Form>
      <Drawer
        styles={{ body: { background: colorBgLayout } }}
        title={`Add Product`}
        open={drawerOpen}
        width={700}
        onClose={() => {
          form.resetFields();
          setDrawerOpen(false);
        }}
        destroyOnClose={true}
        extra={
          <Space size={"middle"}>
            <Button
              onClick={() => {
                form.resetFields();
                setDrawerOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <ProductForm>
            <UploadImage />
          </ProductForm>
        </Form>
      </Drawer>
    </Space>
  );
};

export default Products;
