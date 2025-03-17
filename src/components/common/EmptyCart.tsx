import { Button, TypographyTitle } from '@/lib/AntRegistry'
import Link from 'next/link'
import React from 'react'

const EmptyCart = () => {
  return (
    <div>
        <div className='text-center'>
            <div className='cart-img'>
            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="" />
            </div>
            <TypographyTitle className='mt-2 mb-3' level={3}>Your cart is empty</TypographyTitle>
            <Link href={`/products/search/all/1`}><Button type='primary' className='text-uppercase'>Shop now</Button></Link>
        </div>
    </div>
  )
}

export default EmptyCart