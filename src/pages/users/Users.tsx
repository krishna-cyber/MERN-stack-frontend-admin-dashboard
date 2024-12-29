import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  theme,
} from "antd";
import { NavLink } from "react-router-dom";
import { createUser, getUsers } from "../../http/api";
import type { TableProps } from "antd";
import { User } from "../../store";
import UserFilters from "./UserFilters";
import { useState } from "react";
import { CONFIG } from "../../constants/constant";
import { CreateUserType, FieldData } from "../../types";
import UserForm from "./forms/UserForm";

const columns: TableProps<User>["columns"] = [
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
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render(value) {
      return value;
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const Users = () => {
  const [queryParam, setQueryParam] = useState({
    currentPage: 1,
    pageSize: CONFIG.pageSize,
  });

  const queryClient = useQueryClient();

  const { mutate: createUserMutate, isPending } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (data: CreateUserType) => createUser(data),
    onSuccess: () => {
      form.resetFields();
      setDrawerOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const [dataFilterForm] = Form.useForm();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const {
    data: usersData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParam],
    queryFn: async () => {
      console.log(queryParam);
      const res = await getUsers(queryParam.currentPage, queryParam.pageSize);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const handleFilterChange = (
    _changedFields: FieldData[],
    allFields: FieldData[]
  ) => {
    //todo
    //Filter out properly when value clears not state updated , fix this debug

    const filteredFields = allFields
      .map((item) => {
        return { name: item.name[0], value: item.value };
      })
      .filter((fieldData) => {
        return !!fieldData.value;
      });

    setQueryParam((prev) => {
      return { ...prev, ...filteredFields };
    });
  };

  return (
    <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
      <Flex justify="space-between">
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            { title: <NavLink to={"/"}>Home</NavLink> },
            { title: <NavLink to={"/users"}>Users</NavLink> },
          ]}
        />
        {isFetching && (
          <Spin size="large" indicator={<LoadingOutlined spin />} />
        )}
        {isError && <div>{error.message}</div>}
      </Flex>

      <Form form={dataFilterForm} onFieldsChange={handleFilterChange}>
        <UserFilters>
          <Button
            color={"primary"}
            variant={"solid"}
            onClick={() => setDrawerOpen(true)}
            icon={<PlusOutlined />}
          >
            Add User
          </Button>
        </UserFilters>
      </Form>

      <Table
        pagination={{
          total: usersData?.meta.totalDocuments,
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
        }}
        columns={columns}
        dataSource={usersData?.result}
        rowKey={"_id"}
      />

      <Drawer
        styles={{ body: { background: colorBgLayout } }}
        title="Create a new user"
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
              onClick={async () => {
                await form.validateFields();
                const formData = form.getFieldsValue();
                delete formData.confirmPassword;
                createUserMutate(formData);
              }}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <UserForm />
        </Form>
      </Drawer>
    </Space>
  );
};

export default Users;
