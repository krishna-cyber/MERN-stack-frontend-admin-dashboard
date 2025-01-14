import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { NavLink } from "react-router-dom";
import { createResturant, getTenants } from "../../http/api";
import type { TableProps } from "antd";
import ResturantFilters from "./ResturantFilters";
import { FieldData, Tenant, TenantCreateInfo } from "../../types";
import { useMemo, useState } from "react";
import ResturantCreateForm from "./ResturantCreateForm";
import { CONFIG } from "../../constants/constant";
import { debounce } from "lodash";

const columns: TableProps<Tenant>["columns"] = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render(_value, record) {
      return <div>{record.name}</div>;
    },
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render(value) {
      return value;
    },
  },
];

const Resturants = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [queryParam, setQueryParam] = useState({
    currentPage: 1,
    pageSize: CONFIG.pageSize,
  });

  const [resturantSearchForm] = Form.useForm();
  const [resturantCreateForm] = Form.useForm();

  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const { data: tenants, isLoading } = useQuery({
    queryKey: ["tenants", queryParam],
    queryFn: async () => {
      const queryString = new URLSearchParams(
        queryParam as unknown as string
      ).toString();

      const res = await getTenants(queryString);
      return res.data;
    },
  });

  const { mutate: tenantMutate } = useMutation({
    mutationKey: ["createResturant"],
    mutationFn: async (data: TenantCreateInfo) => {
      return createResturant(data).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
      setDrawerOpen(false);
    },
  });

  const debounceSearchUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParam((prev) => {
        return { ...prev, currentPage: 1, search: value };
      });
    }, 1000);
  }, []);

  const handleFilterChange = (
    _changedFields: FieldData[],
    allFields: FieldData[]
  ) => {
    const filteredFields = allFields.map((item) => {
      return { name: item.name[0], value: item.value };
    });

    const validFields = filteredFields
      .filter((field) => {
        return !!field.value;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((acc: { [key: string]: any }, obj) => {
        acc[obj.name] = obj.value;
        return acc;
      }, {});

    if (validFields.search) {
      debounceSearchUpdate(validFields.search);
    } else {
      setQueryParam((prev) => {
        return {
          currentPage: 1, // when request goes immedately state updated, current page must be 1 not the previous value
          pageSize: prev.pageSize,
          ...validFields,
        };
      });
    }
  };

  const handleCreateTenant = async () => {
    await resturantCreateForm.validateFields();
    tenantMutate(resturantCreateForm.getFieldsValue());
  };

  return (
    <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <NavLink to={"/"}>Dashboard</NavLink> },
          { title: <NavLink to={"/tenants"}>Resturants</NavLink> },
        ]}
      />
      <Form form={resturantSearchForm} onFieldsChange={handleFilterChange}>
        <ResturantFilters>
          <Button
            color={"primary"}
            variant={"solid"}
            onClick={() => setDrawerOpen(true)}
            icon={<PlusOutlined />}
          >
            Add Resturant
          </Button>
        </ResturantFilters>
      </Form>
      {isLoading && <div>Loading...</div>}
      <Table
        columns={columns}
        dataSource={tenants?.result}
        pagination={{
          total: tenants?.meta?.totalDocuments,
          current: queryParam.currentPage,
          pageSize: queryParam.pageSize,
          onChange: (page: number) => {
            setQueryParam((prev) => {
              return {
                ...prev,
                currentPage: page,
              };
            });
          },
          showTotal(total, range) {
            return `Showing ${range[0]} - ${range[1]} of ${total}`;
          },
        }}
        rowKey={"_id"}
      />

      <Drawer
        title="Create a new Resturant"
        styles={{ body: { background: colorBgLayout } }}
        open={drawerOpen}
        width={700}
        onClose={() => {
          setDrawerOpen(false);
          resturantCreateForm.resetFields();
        }}
        destroyOnClose={true}
        extra={
          <Space size={"middle"}>
            <Button
              onClick={() => {
                setDrawerOpen(false);
                resturantCreateForm.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={handleCreateTenant}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={resturantCreateForm} layout="vertical">
          <ResturantCreateForm />
        </Form>
      </Drawer>
    </Space>
  );
};

export default Resturants;
