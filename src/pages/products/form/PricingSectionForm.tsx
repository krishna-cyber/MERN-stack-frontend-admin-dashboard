import { Card, Col, Form, InputNumber, Row, Typography } from "antd";
import { getSingleCategoryById } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../../types";
import _ from "lodash";

interface CategoryId {
  categoryId: string;
}

const PricingSectionForm = ({ categoryId }: CategoryId) => {
  const { data: category } = useQuery({
    queryKey: ["category", { categoryId }],
    queryFn: async () => {
      const res = await getSingleCategoryById(categoryId);
      return res.data?.result as Category;
    },
  });

  const pricingKeys = _.keys(category?.priceConfiguration); // ["key1","key2","key3"]

  return (
    <Card title={`Price configuration`}>
      {pricingKeys.map((priceKey) => {
        return (
          <Row key={priceKey}>
            <Col span={24}>
              <Typography.Text>
                {`${_.upperFirst(priceKey)} (${_.upperFirst(
                  category?.priceConfiguration[priceKey].priceType
                )})`}
              </Typography.Text>
            </Col>

            <Row style={{ marginTop: "0.2rem" }} gutter={10}>
              {category?.priceConfiguration[priceKey].avilableOptions.map(
                (value) => {
                  return (
                    <Col span={8} key={value}>
                      <Form.Item
                        rules={[
                          { required: true, message: "Price must be required" },
                          {
                            validator: (_, value) =>
                              value >= 0
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error("Number must be non-negative!")
                                  ),
                          },
                        ]}
                        layout="horizontal"
                        label={_.upperFirst(value)}
                        name={[`priceConfiguration`, priceKey, value]}
                      >
                        <InputNumber defaultValue={0} addonAfter={"रु"} />
                      </Form.Item>
                    </Col>
                  );
                }
              )}
            </Row>
          </Row>
        );
      })}
    </Card>
  );
};

export default PricingSectionForm;
