import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Flex, Space } from "antd";
import { NavLink } from "react-router-dom";
import ProductFilters from "./ProductFilters";

const Products = () => {
  const [dataFilterForm] = Form.useForm();

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
            onClick={() => {}}
            icon={<PlusOutlined />}
          >
            Add Product
          </Button>
        </ProductFilters>
      </Form>
    </Space>
  );
};

export default Products;
