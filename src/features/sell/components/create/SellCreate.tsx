import { useProduct } from "@/features/product";
import { useDebounce } from "@/shared/hooks/useDebounce";
import Title from "@/shared/ui/Title";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import { useSell } from "../../service/useSell";

type FieldType = {
  quantity?: string;
  sellPrice?: string;
};

export const SellCreate = React.memo(() => {
  // 3 start
  const [cart, setCart] = useState<any>([]);
  // 3 end

  // 1 start
  const { getSearchProducts } = useProduct();
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);
  const { data } = getSearchProducts({ name: debounceValue });
  // 1 end

  // 2 start
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const handleAddProduct = (values: FieldType) => {
    let product = {
      quantity: Number(values.quantity?.replace(/\s/gi, "")),
      sellPrice: Number(values.sellPrice?.replace(/\s/gi, "")),
      title: selectedProduct?.title,
      productId: selectedProduct?.id,
    };
    setCart((prev: any) => [...prev, product]);
    setSelectedProduct(null);
  };
  // 2 end

  const { id } = useParams();
  const { createSell } = useSell();

  const handleSell = () => {
    cart.forEach((item: any) => {
      delete item.title;
    });

    const contract = {
      partnerId: id,
      time: 7,
      products: cart,
    };
    createSell.mutate(contract, {
      onSuccess: () => {
        setCart([]);
      },
    });
  };

  return (
    <div>
      {/* 3 */}
      {!!cart.length && (
        <>
          <div>
            {cart?.map((item: any) => (
              <div key={item.productId} className="border">
                <h3>{item.title}</h3>
                <p>{item.quantity}</p>
                <p>{item.sellPrice.fprice("dona")}</p>
              </div>
            ))}
          </div>
          <br />
        </>
      )}

      {/* 2 */}
      {selectedProduct && (
        <>
          <div>
            <Title>{selectedProduct?.title}</Title>
            <Form
              name="basic"
              // initialValues={previousData}
              onFinish={handleAddProduct}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item<FieldType>
                label="Summa"
                name="quantity"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <NumericFormat
                  allowLeadingZeros
                  thousandSeparator={" "}
                  customInput={Input}
                />
              </Form.Item>

              <Form.Item<FieldType>
                label="Summa"
                name="sellPrice"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <NumericFormat
                  allowLeadingZeros
                  thousandSeparator={" "}
                  customInput={Input}
                />
              </Form.Item>

              <Form.Item label={null}>
                <Button
                  // loading={isPending}
                  type="primary"
                  onClick={() => setSelectedProduct(null)}
                  htmlType="button"
                >
                  cancel
                </Button>
              </Form.Item>
              <Form.Item label={null}>
                <Button
                  // loading={isPending}
                  type="primary"
                  htmlType="submit"
                >
                  +
                </Button>
              </Form.Item>
            </Form>
          </div>
          <br />
        </>
      )}
      
      {!!cart.length && (
        <Button onClick={handleSell} disabled={selectedProduct}>
          Sotish
        </Button>
      )}

      {/* 1 */}
      {!selectedProduct && (
        <div>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <div>
            {data?.data?.map((item: any) => (
              <div
                onClick={() => {
                  setSelectedProduct(item);
                  setValue("");
                }}
                className="border"
                key={item.id}
              >
                <h3>{item.title}</h3>
                <p>{item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
