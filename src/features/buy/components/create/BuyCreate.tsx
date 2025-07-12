import { Button, Form, Input, type FormProps } from "antd";
import React, { type FC } from "react";
import { useParams } from "react-router-dom";
import { useBuy } from "../../service/useBuy";

type FieldType = {
  buyPrice: number;
  quantity: number;
  comment?: string;
};

const { TextArea } = Input;

interface Props {
  handleCancel: ()=>void,
  product: any
}

export const BuyCreate:FC<Props> = React.memo(({handleCancel, product}) => {
  const {id} = useParams()
  const {createBuy} = useBuy()
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values);
    const newBuy = {
      quantity: Number(values.quantity),
      buyPrice: Number(values.buyPrice),
      comment: values.comment || "",
      productId: product.id,
      partnerId: id
    }
    createBuy.mutate(newBuy);
    
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <div className="grid md:grid-cols-2 gap-x-4">
          <Form.Item<FieldType>
            label="Miqdori"
            name="quantity"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Narxi"
            name="buyPrice"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item<FieldType> label="Izoh" name="comment">
          <TextArea />
        </Form.Item>

        <div className="grid md:grid-cols-2 gap-x-4">
          <Button htmlType="button" onClick={handleCancel}>Ortga qaytish</Button>
          <Form.Item style={{ margin: 0 }} label={null}>
            <Button
              loading={createBuy.isPending}
              type="primary"
              className="w-full"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
});

