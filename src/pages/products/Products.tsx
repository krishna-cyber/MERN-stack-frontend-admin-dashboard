import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Flex, Space, Drawer, theme } from "antd";
import { NavLink } from "react-router-dom";
import ProductFilters from "./ProductFilters";
import { useState } from "react";
import ProductForm from "./form/ProductForm";
import UploadImageHandle from "./form/UploadImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../http/api";
import { ProductFormData } from "../../types";
import { RcFile } from "antd/es/upload";

const Products = () => {
  const queryClient = useQueryClient();
  const [dataFilterForm] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const { mutate: productMutation, isPending } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: ProductFormData) => {
      return createProduct(data).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setDrawerOpen(false);
    },
  });

  const handleFormSubmit = async () => {
    await form.validateFields();
    const formValues: ProductFormData = form.getFieldsValue();

    const submittingValue = {
      ...formValues,
      priceConfiguration: JSON.stringify(formValues.priceConfiguration),
      attributes: JSON.stringify(formValues.attributes),
      isPublish: !!formValues.isPublish,
      images: formValues.images.map((file) => {
        return file.originFileObj as RcFile;
      }),
    };

    productMutation(submittingValue);
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
            <Button
              loading={isPending}
              type="primary"
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <ProductForm>
            <UploadImageHandle />
          </ProductForm>
        </Form>
      </Drawer>
    </Space>
  );
};

export default Products;
