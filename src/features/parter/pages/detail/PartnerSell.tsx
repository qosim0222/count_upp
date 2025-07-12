import { SellCreate } from '@/features/sell'
import React from 'react'

const PartnerSell = () => {
  return (
    <div>
        <SellCreate/>
    </div>
  )
}

export default React.memo(PartnerSell)