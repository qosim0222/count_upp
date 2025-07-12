import { Button, Input } from "antd";
import React, { useCallback, useState } from "react";
import { BuyCreate } from "@/features/buy";
import Title from "@/shared/ui/Title";
import { useProduct, ProductCreate } from "@/features/product";
import { useDebounce } from "@/shared/hooks/useDebounce";

const PartnerBuy = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCreate, setIsCreate] = useState<any>(false);

  const [state, setState] = useState<string>("");
  const { getSearchProducts } = useProduct();
  const value = useDebounce(state);

  const handleCancel = useCallback(()=> {
    setSelectedProduct(null)
    setIsCreate(false)
  }, [])

  const { data } = getSearchProducts({ name: value });

  return (
    <div>
      <Title className="mb-4">{selectedProduct ? selectedProduct?.title : "Yangi mahsulot qo'shish"} </Title>
      {!selectedProduct && !isCreate && (
        <>
          <div className="max-w-[500px]">
            <Input value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          {data?.data.length ? (
            <div className="my-6">
              {data?.data?.map((product: any) => (
                <div
                  className="grid grid-cols-2 border"
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div>
                    <h3>{product.title}</h3>
                    <p>{product.productCode}</p>
                  </div>
                  <div>
                    <p>{product.price.fprice()}</p>
                    <p>{product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) :  
          value.length ?
          (
            <Button onClick={() => setIsCreate(true)}>Create</Button>
          ): <></>}
        </>
      )}

      {selectedProduct ? <BuyCreate product={selectedProduct} handleCancel={handleCancel}/> : isCreate ? <ProductCreate handleCancel={handleCancel}/> : <></>}
    </div>
  );
};

export default React.memo(PartnerBuy);
