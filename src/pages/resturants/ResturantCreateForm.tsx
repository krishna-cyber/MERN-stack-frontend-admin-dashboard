import { Card, Form, Input } from "antd";
import React from "react";

const ResturantCreateForm = () => {
  return (
    <>
      <Card
        style={{
          width: "80%",
        }}
        title="Basic Information"
      >
        <Form.Item
          hasFeedback
          label="Resturant Name"
          name={"name"}
          rules={[{ required: true, message: "Resturant Name is required" }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Address"
          name={"address"}
          rules={[{ required: true, message: "Address is Required" }]}
        >
          <Input allowClear />
        </Form.Item>
      </Card>
    </>
  );
};

export default ResturantCreateForm;
