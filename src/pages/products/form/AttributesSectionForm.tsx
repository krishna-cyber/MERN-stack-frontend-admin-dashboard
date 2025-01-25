import { Card } from "antd";

const AttributesSectionForm = ({
  selectedCategoryId,
}: {
  selectedCategoryId: string;
}) => {
  return <Card>{selectedCategoryId}</Card>;
};

export default AttributesSectionForm;
