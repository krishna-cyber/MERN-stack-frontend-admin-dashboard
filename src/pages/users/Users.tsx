import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Space, Table } from "antd";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../http/api";
import type { TableProps } from "antd";
import { User } from "../../store";

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
  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers();
      return res.data;
    },
  });

  return (
    <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <NavLink to={"/"}>Home</NavLink> },
          { title: <NavLink to={"/users"}>Users</NavLink> },
        ]}
      />
      {isLoading && <div>Loading...</div>}
      <Table columns={columns} dataSource={usersData?.result} />
    </Space>
  );
};

export default Users;
