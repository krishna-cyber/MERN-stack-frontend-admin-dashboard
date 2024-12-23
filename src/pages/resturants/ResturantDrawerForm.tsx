import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, theme } from "antd";
import { useState } from "react";

const ResturantDrawerForm = () => {
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
        Add Resturant
      </Button>
      <Drawer
        title="Create a new tenat"
        styles={{ body: { background: colorBgLayout } }}
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
        <p>Some content...</p>
        <p>Some Content</p>
      </Drawer>
    </>
  );
};

export default ResturantDrawerForm;
