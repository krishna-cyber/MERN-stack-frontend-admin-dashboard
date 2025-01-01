import { useQuery } from "@tanstack/react-query";
import { Col, Form, Select } from "antd";
import { getTenantsList } from "../../../http/api";
import { Tenant } from "../../../types";

const TenantSelectForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ["tenantsList"],
    queryFn: async () => {
      const res = await getTenantsList();
      return res.data;
    },
  });
  return (
    <Col span={12}>
      <Form.Item hasFeedback label="Resturants" name="tenantId">
        <Select
          allowClear
          style={{ width: "100%" }}
          onChange={() => {}}
          placeholder="Resturants"
        >
          {tenants?.result.map((tenant: Tenant) => {
            return (
              <Select.Option key={tenant._id} value={tenant._id}>
                {tenant.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Col>
  );
};

export default TenantSelectForm;
