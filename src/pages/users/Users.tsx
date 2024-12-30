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
import { useMemo, useState } from "react";
import { CONFIG } from "../../constants/constant";
import { CreateUserType, FieldData } from "../../types";
import UserForm from "./forms/UserForm";
import { debounce } from "lodash";

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
  const [currentEditingUser, setCurrentEditingUser] = useState<boolean | null>(
    null
  );

  const queryClient = useQueryClient();

  const { mutate: createUserMutate, isPending } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (data: CreateUserType) => createUser(data),
    onSuccess: async () => {
      form.resetFields();
      await queryClient.invalidateQueries({
        queryKey: ["users", queryParam],
        exact: true,
      });
      setDrawerOpen(false);
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
      const queryString = new URLSearchParams(
        queryParam as unknown as string
      ).toString();

      const res = await getUsers(queryString);
      return res.data;
    },
    placeholderData: keepPreviousData,
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
          showTotal(total, range) {
            return `Showing ${range[0]} - ${range[1]} of ${total}`;
          },
        }}
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
                      setCurrentEditingUser(true);
                      setDrawerOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={usersData?.result}
        rowKey={"_id"}
      />

      <Drawer
        styles={{ body: { background: colorBgLayout } }}
        title={currentEditingUser ? "Edit User" : "Create a new User"}
        open={drawerOpen}
        width={700}
        onClose={() => {
          form.resetFields();
          setCurrentEditingUser(null);
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
          <UserForm isEditing={!!currentEditingUser} />
        </Form>
      </Drawer>
    </Space>
  );
};

export default Users;
