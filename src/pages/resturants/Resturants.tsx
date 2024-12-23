import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Space, Table } from "antd";
import { NavLink } from "react-router-dom";
import { getTenants } from "../../http/api";
import type { TableProps } from "antd";
import ResturantFilters from "./ResturantFilters";
import ResturantDrawerForm from "./ResturantDrawerForm";
import { Tenant } from "../../types";

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
    title: "Email",
    dataIndex: "email",
    key: "email",
    render(value) {
      return value;
    },
  },
];

const Resturants = () => {
  const { data: tenants, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const res = await getTenants();
      return res.data;
    },
  });

  return (
    <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <NavLink to={"/"}>Home</NavLink> },
          { title: <NavLink to={"/tenants"}>Resturants</NavLink> },
        ]}
      />
      <ResturantFilters
        onFilterChange={(filterName: string, filterValue: string) => {
          console.log(filterName, filterValue);
        }}
      >
        <ResturantDrawerForm />
      </ResturantFilters>
      {isLoading && <div>Loading...</div>}
      <Table columns={columns} dataSource={tenants?.result} rowKey={"_id"} />
    </Space>
  );
};

export default Resturants;
