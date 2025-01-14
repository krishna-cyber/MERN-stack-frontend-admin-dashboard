import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Space } from "antd";
import { NavLink } from "react-router-dom";

const Products = () => {
  return (
    <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <NavLink to={"/"}>Dashboard</NavLink> },
          { title: <NavLink to={"/products"}>Products</NavLink> },
        ]}
      />
    </Space>
  );
};

export default Products;
