import CommonLayout from '@/components/common/CommonLayout'
import { AntForm, Button, Col, FormItem, Input, Row } from '@/lib/AntRegistry'
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import crumbApi from '@/utils/crumbApis';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSeleton';
import { useDebounce } from '@/utils/CommonFunction';
import Head from 'next/head';
const Search = () => {
  const [state, setState] = useState({ data: [], count: 0 })
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')


  const value = useDebounce(name,500)
  console.log(value,'valueuu');
  

  const initProductList = async () => {
    debugger
    try {
      setLoading(true)
      let apiRes = await crumbApi.Product.list();
      const filteredProducts = apiRes.data.filter((product:any) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      setState({data:filteredProducts,count:filteredProducts?.length});
    } catch (error) {
      console.error("Error fetching product list:", error);
    }finally{
      setLoading(false)
    }
  };
  console.log(state,'stateteettetetetteet');
  
  useEffect(() => {
    if(name){
      initProductList()
    }
  },[value])
  
  return (
    <Fragment>
      <Head>
        <title>{name  ?  `Search: ${state.count} results found for "${name}"` : `Search`} at Copper & Crumb</title>
        <meta name='desription' content={`Search Product at copper & crumb`} />
      </Head>
      <section className="search-section">
        <div className="container">
          <Row gutter={[20, 20]} justify={'center'}>
            <Col span={24} lg={14} xl={12} xxl={12}>
              <div className="search-container">
                <AntForm className='m-0'>
                  <FormItem>
                    <Input onChange={(e) => setName(e.target.value)} className="border border-dark py-0 pe-0" placeholder="Search product" suffix={<Button className="bg-transparent border-0 py-3 h-100 px-4"><SearchOutlined /></Button>} />
                  </FormItem>
                </AntForm>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="cart-section">
        <div className="container">
          {/* <Row gutter={[20, 20]} justify={'center'}>

            {loading ? Array.isArray(state?.data) && state?.data.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res} /></Col>):<ProductSkeleton/>}
          </Row> */}
          <Row gutter={[20, 20]} className='m-0'>
          {!loading ? Array.isArray(state?.data) && state?.data.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res} /></Col>):<ProductSkeleton/>}
            </Row>
        </div>
      </section>
    </Fragment>
  )
}
Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default Search