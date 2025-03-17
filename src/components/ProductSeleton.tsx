import { Col } from '@/lib/AntRegistry'
import { Grid, Skeleton } from 'antd'
import React from 'react'

const ProductSkeleton = () => {
    const screens = Grid.useBreakpoint()
    const size = !screens.sm ? 300 : !screens.lg ? 200 : 260
    return (
        <>
            <Col span={24} sm={12} md={12} lg={8} xl={8} xxl={6}><Skeleton.Image style={{ height: size, width: size }} active={true} /></Col>
            <Col span={24} sm={12} md={12} lg={8} xl={8} xxl={6}><Skeleton.Image style={{ height: size, width: size }} active={true} /></Col>
            <Col span={24} sm={12} md={12} lg={8} xl={8} xxl={6}><Skeleton.Image style={{ height: size, width: size }} active={true} /></Col>
        </>
    )
}

export default ProductSkeleton