import { Badge, Flex, TypographyText } from '@/lib/AntRegistry'
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import React from 'react'
import { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis'
import { formatString } from '@/utils/crumbValidation'

const CheckoutCartListCompo = (props:any) => {
    console.log(props,'prooocheckout');
    
    return (
        <div className='mb-3'>
            <Flex align='center' justify='space-between'>

                <Flex gap={16} align='center'>
                <Badge count={props?.quantity}>
                    <div className='cart-image-checkout'>
                        <img onError={(e:any) => e.target.src = productImage.src} src={props?.product?.feature_image ? `${BUCKET_ROOT}${props?.product?.feature_image}` : productImage.src} />
                    </div>
                    </Badge>
                    <div>
                        <TypographyText>{props?.product?.name}</TypographyText>
                        <br/>
                        <TypographyText className='text-muted'>{formatString(props?.grid_size)} / {props?.size}g</TypographyText>
                    </div>
                </Flex>
                <TypographyText>{`${CURRENCY}${Number(props?.quantity * props?.product?.customer_buying_price).toFixed(2)}`}</TypographyText>
            </Flex>
        </div>
    )
}

export default CheckoutCartListCompo