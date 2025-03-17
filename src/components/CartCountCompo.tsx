import { Button, Flex } from '@/lib/AntRegistry'
import React from 'react'

interface typeProps {
    handleIncDec:any
    quantity:number
    pid:number
    index?:number
    is_cart?:boolean
}
const CartCountCompo = ({handleIncDec,quantity,pid,index,is_cart}:typeProps) => {
  return (
    <Flex className='quantity-counter'><Flex className='p-3 counter-div'>{quantity}</Flex><Flex className='flex-column h-100'><Button onClick={() => handleIncDec(pid,'INC',quantity+1,index)}>+</Button><Button disabled={!is_cart} onClick={() =>  handleIncDec(pid,'DEC',quantity-1,index)}>-</Button></Flex></Flex>
  )
}

export default CartCountCompo