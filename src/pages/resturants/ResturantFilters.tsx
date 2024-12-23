import { Card, Col, Input, Row, Select } from "antd";

interface ResturantFiltersProps {
  onFilterChange: (filterOption: string, value: string) => void;
  children?: React.ReactNode;
}

const ResturantFilters = ({
  onFilterChange,
  children,
}: ResturantFiltersProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={8}>
          <Input.Search
            allowClear
            placeholder="search"
            onChange={(e) => onFilterChange("searchFilter", e.target.value)}
          />
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ResturantFilters;
