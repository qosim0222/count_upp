import { Button, Form, Input, Select, type FormProps } from "antd";
import React, { type FC } from "react";
import { useBuy } from "@/features/buy";
import { useParams } from "react-router-dom";

type FieldType = {
  title: string;
  code?: string;
  buyPrice: number;
  quantity: number;
  categoryId: string;
  units: string;
  comment?: string;
  partnerId?: string;
};

const { TextArea } = Input;

interface Props {
  handleCancel: () => void;
}

export const ProductCreate: FC<Props> = React.memo(({ handleCancel }) => {
  const {id} = useParams()
  
  const {createBuy} = useBuy()
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    values.partnerId = id
    const product = {
      ...values,
      quantity: Number(values.quantity),
      buyPrice: Number(values.buyPrice),
    }
    createBuy.mutate(product)
    
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
            label="Nomi"
            name="title"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Mahsulot kodi" name="code">
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Kategoriya"
            name="categoryId"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select
              placeholder="Kategoriya tanlang"
              options={[
                {
                  label: "Telefon",
                  value: "ccfac508-0b24-4c25-845d-ddf1b6280d86",
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="O'lchov birligi"
            name="units"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Select
              placeholder="Kategoriya tanlang"
              options={[
                {
                  label: "Telefon",
                  value: "dona",
                },
              ]}
            ></Select>
          </Form.Item>
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
          <Button htmlType="button" onClick={handleCancel}>
            Ortga qaytish
          </Button>
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
