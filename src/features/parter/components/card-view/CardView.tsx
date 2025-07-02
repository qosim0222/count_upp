import React, { type FC } from 'react'

interface Props {
  data: undefined | any;
  loading: boolean;
}

const CardView:FC<Props> = () => {
  return (
    <div>CardView</div>
  )
}

export default React.memo(CardView)