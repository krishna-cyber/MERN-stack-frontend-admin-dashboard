import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Space, theme } from "antd";
import { useState } from "react";
import UserForm from "./forms/UserForm";

const UserDrawerForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <>
      <Button
        color={"primary"}
        variant={"solid"}
        onClick={() => setDrawerOpen(true)}
        icon={<PlusOutlined />}
      >
        Add User
      </Button>
      <Drawer
        styles={{ body: { background: colorBgLayout } }}
        title="Create a new user"
        open={drawerOpen}
        width={700}
        onClose={() => {
          setDrawerOpen(false);
        }}
        destroyOnClose={true}
        extra={
          <Space size={"middle"}>
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <UserForm />
        </Form>
      </Drawer>
    </>
  );
};

export default UserDrawerForm;
