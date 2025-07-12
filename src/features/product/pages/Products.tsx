import Box from '@/shared/ui/Box'
import Title from '@/shared/ui/Title'
import React from 'react'
import { useProduct } from '../service/useProduct'
import { Pagination } from 'antd'
import { useParamsHook } from '@/shared/hooks/useParamsHook'
import ProductView from '../components/create/ProductView'

const Products = () => {
  const { getProducts } = useProduct()
  const { data } = getProducts({})
  console.log(data);

  const { getParam, setParam } = useParamsHook();
  const page = getParam("page") || "1";

  return (
    <Box>
      <Title>Products</Title>
      <ProductView data={data?.data} />
      <div className="mt-6 flex justify-end">
        <Pagination
          current={Number(page)}
          onChange={(value) => setParam("page", value.toString())}
          pageSize={10}
          total={data?.total}
        />
      </div>
    </Box>
  )
}

export default React.memo(Products)