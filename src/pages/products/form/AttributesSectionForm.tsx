import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Form, Radio, Switch } from "antd";
import { getSingleCategoryById } from "../../../http/api";
import { Category } from "../../../types";

interface CategoryId {
  categoryId: string;
}

const AttributesSectionForm = ({ categoryId }: CategoryId) => {
  const { data: category } = useQuery({
    queryKey: ["category", { categoryId }],
    queryFn: async () => {
      const res = await getSingleCategoryById(categoryId);
      return res.data?.result as Category;
    },
  });

  return (
    <Card title={"Attributes"} bordered={false}>
      <Flex justify="space-between" wrap={true} content="center">
        {category?.attributes.map((attribute) => {
          return (
            <Form.Item
              initialValue={attribute.defaultValue}
              name={[`attributes`, attribute.name]}
              colon={false}
              key={attribute.name}
              label={attribute.name}
              layout="vertical"
            >
              {attribute.widgetType == "switch" ? (
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="No"
                  defaultChecked
                />
              ) : (
                <Radio.Group value={attribute.defaultValue}>
                  {attribute.avilableOptions.map((option) => {
                    return (
                      <Radio.Button value={option} key={option}>
                        {option}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              )}
            </Form.Item>
          );
        })}
      </Flex>
    </Card>
  );
};

export default AttributesSectionForm;
