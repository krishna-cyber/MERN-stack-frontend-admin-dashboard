import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Flex, Space, Spin, Table } from "antd";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../http/api";
import type { TableProps } from "antd";
import { User } from "../../store";
import UserFilters from "./UserFilters";
import UserDrawerForm from "./UserDrawerForm";
import { useState } from "react";
import { CONFIG } from "../../constants/constant";

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

  const {
    data: usersData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParam],
    queryFn: async () => {
      const res = await getUsers(queryParam.currentPage, queryParam.pageSize);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

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

      <UserFilters
        onFilterChange={(filterName: string, filterValue: string) => {
          console.log(filterName, filterValue);
        }}
      >
        <UserDrawerForm />
      </UserFilters>

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
    </Space>
  );
};

export default Users;
