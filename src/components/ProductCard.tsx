import { ProductDetails } from '@/interface/product/ProductDetails'
import { Button, Col } from '@/lib/AntRegistry'
import { stringReplace } from '@/utils/crumbValidation'
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import Link from 'next/link'
import React from 'react'
import { CURRENCY } from '@/utils/crumbApis'
interface newDetails extends ProductDetails {
    class: string;
    slider?:boolean
  }

const ProductCard = (props: newDetails) => {
    return (
        // <Col span={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Link href={`/product/${stringReplace(props.name)}/${props.id}`}>
            <div className={`cart-card ${props?.slider ? "m-2":""}`}>
                <div className="cart-image text-center">
                    <div className={props?.class ?props?.class : "product-image"}>
                        <img src={props?.thumb_url ?? productImage.src} alt="error" onError={(e:any) => e.target.src = productImage.src} className='rounded-3' />

                    </div>
                    {/* <div className="cart-overlay">
                        <Link href={`/product/${stringReplace(props.name)}/${props.id}`}><Button type="primary" className="px-5 py-3 h-auto">Add To Cart</Button></Link>
                    </div> */}
                </div>
                <div className="cart-content mt-4 text-center">
                    <Link href={`/product/${stringReplace(props.name)}/${props.id}`}><h5>{props?.name ?? 'N/A'}</h5></Link>
                    <p className="text-secondary fs-6 m-0">{CURRENCY}{Number(props?.customer_buying_price).toFixed(2)}</p>
                </div>
            </div>
            </Link>
        // </Col>
    )
}

export default ProductCard