import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Form,
  Flex,
  Space,
  Drawer,
  theme,
  Table,
  TableProps,
  Image,
  Tag,
  Typography,
} from "antd";
import { NavLink } from "react-router-dom";
import ProductFilters from "./ProductFilters";
import { useState } from "react";
import ProductForm from "./form/ProductForm";
import UploadImageHandle from "./form/UploadImage";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createProduct, fetchProduct } from "../../http/api";
import { Product, ProductFormData } from "../../types";
import { RcFile } from "antd/es/upload";
import { CONFIG } from "../../constants/constant";
import { format } from "date-fns";

const columns: TableProps<Product>["columns"] = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render(_value: string, record: Product) {
      return (
        <Space size={20}>
          <Image width={45} height={45} src={record.image[0]} />
          <Typography.Text>{record.name}</Typography.Text>
        </Space>
      );
    },
  },

  {
    title: "Resturant",
    dataIndex: "tenantId",
    key: "tenantId",
  },
  {
    title: "Category",
    dataIndex: "categoryId",
    key: "categoryId",
  },
  {
    title: "Status",
    dataIndex: "isPublish",
    key: "isPublish",
    render(value: boolean) {
      return value ? (
        <Tag color="cyan">Published</Tag>
      ) : (
        <Tag color="purple">Not published</Tag>
      );
    },
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render(value: string) {
      return (
        <Typography.Text>
          {format(new Date(value), "dd/MM/yyyy HH:mm")}
        </Typography.Text>
      );
    },
  },
];

const Products = () => {
  const queryClient = useQueryClient();
  const [dataFilterForm] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [queryParam, setQueryParam] = useState({
    currentPage: 1,
    pageSize: CONFIG.pageSize,
  });

  const { data: products } = useQuery({
    queryKey: ["users", queryParam],
    queryFn: async () => {
      const queryString = new URLSearchParams(
        queryParam as unknown as string
      ).toString();

      const res = await fetchProduct(queryString);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const { mutate: productMutation, isPending } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (data: ProductFormData) => {
      return createProduct(data).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      form.resetFields();
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

      <Table
        // pagination={{
        //   total: usersData?.meta.totalDocuments,
        //   current: queryParam.currentPage,
        //   pageSize: queryParam.pageSize,
        //   onChange: (page: number) => {
        //     setQueryParam((prev) => {
        //       return {
        //         ...prev,
        //         currentPage: page,
        //       };
        //     });
        //   },
        //   showTotal(total, range) {
        //     return `Showing ${range[0]} - ${range[1]} of ${total}`;
        //   },
        // }}
        columns={[
          ...columns,
          {
            title: "Actions",
            key: "actions",

            render() {
              return (
                <Space>
                  <Button
                    type="link"
                    onClick={() => {
                      // setCurrentEditingUser(record);
                    }}
                  >
                    Edit
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={products?.result}
        rowKey={"_id"}
      />

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
