import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Space, theme } from "antd";
import { useState } from "react";
import UserForm from "./forms/UserForm";

const UserDrawerForm = () => {
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
    </>
  );
};

export default UserDrawerForm;
