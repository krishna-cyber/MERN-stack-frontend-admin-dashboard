import { Card, Col, Input, Row, Select } from "antd";

interface UserFiltersProps {
  onFilterChange: (filterOption: string, value: string) => void;
  children?: React.ReactNode;
}

const UserFilters = ({ onFilterChange, children }: UserFiltersProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Input.Search
                allowClear
                placeholder="search"
                onChange={(e) => onFilterChange("searchFilter", e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Select
                allowClear
                style={{ width: "100%" }}
                onChange={(value) => onFilterChange("roleFilter", value)}
                placeholder="Roles"
              >
                <Select.Option value={"admin"}>Admin</Select.Option>
                <Select.Option value={"manager"}>Manager</Select.Option>
                <Select.Option value={"customer"}>Customer</Select.Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select
                allowClear
                style={{ width: "100%" }}
                onChange={(value) => onFilterChange("statusFilter", value)}
                placeholder="Status"
              >
                <Select.Option value={"ban"}>Banned</Select.Option>
                <Select.Option value={"active"}>Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilters;
