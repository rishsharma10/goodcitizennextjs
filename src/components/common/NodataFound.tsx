import { Button, TypographyTitle } from '@/lib/AntRegistry'
import Link from 'next/link'
import React from 'react'

const NoDataFound = () => {
  return (
    <div>
        <div className='text-center'>
            <div className='cart-img'>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-illustration-download-in-svg-png-gif-file-formats--no-found-misplaced-files-business-pack-illustrations-8062128.png" alt="" />
            </div>
            <TypographyTitle className='mb-3' level={5}>Oops! It looks like there’s nothing here. How about trying something else?</TypographyTitle>
            {/* <Link href={`/products/search/1/1`}><Button type='primary' className='text-uppercase'>Shop now</Button></Link> */}
        </div>
    </div>
  )
}

export default NoDataFound