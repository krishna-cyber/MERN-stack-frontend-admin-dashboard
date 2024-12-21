import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const Users = () => {
  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <NavLink to={"/"}>Home</NavLink> },
          { title: <NavLink to={"/users"}>Users</NavLink> },
        ]}
      />
    </>
  );
};

export default Users;
