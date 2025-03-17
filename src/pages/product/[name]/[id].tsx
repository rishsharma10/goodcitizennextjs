
import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Avatar, Button, Checkbox, Col, Dropdown, Flex, FormItem, Input, Pagination, Rate, Row, Select, Tabs, TextArea, TypographyText } from '@/lib/AntRegistry'
import React, { ReactElement, useState, useContext, Fragment } from 'react'
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { Carousel, Grid, MenuProps, TabsProps, Tag } from 'antd'
import crumbApi, { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis'
import { ProductDetails } from '@/interface/product/ProductDetails'
import ProductCard from '@/components/ProductCard'
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider'
import Head from 'next/head'
import ShareProduct from '@/components/common/ShareModal'

interface typeProps extends ProductDetails {
  is_cart_local: boolean
  is_cart: boolean
  cart_qty: number
}
const ProductDetail = (props: typeProps) => {

  
    const responsive = [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  console.log(props, 'propsspsppsp');
  const { Toast, userInfo, cartData,setCartData,initCart, isCart } = useContext(GlobalContext)
  const router = useRouter()
  const [state, setState] = useState(props as typeProps)
  const [loading, setLoading] = useState(false)
  const [relatedProduct, setRelatedProduct] = useState({ data: [], count: 0 })
  const [quantity, setQuantity] = useState(1)
  const screens = Grid.useBreakpoint()
let screenSize = screens.xxl ? 5 :screens.xl ? 4 :screens.lg ? 3 : screens.md ? 2 : screens.sm ? 1 : 1

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <p className='text-justify'>{state?.desc}</p>,
    },
    {
      key: '2',
      label: 'Additional information',
      children: <ul className='list-unstyled p-0'>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Weight</span>: <span className='text-secondary'>{state?.weight ?? 0} kg</span></li>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Dimensions</span>: <span className='text-secondary'>{`${state?.dimension_d ?? 0} × ${state?.dimension_l ?? 0} × ${state?.dimension_w ?? 0} cm`}</span></li>
      </ul>,
    },
    // {
    //   key: '3',
    //   label: 'Review (1)',
    //   children: <div className='product-review'>
    //     <h4>1 review for {state.name}</h4>
    //     {/* review card */}
    //     <Flex className="review-user-card my-4" gap={12}>
    //       <Avatar src={banner.src} size={60} style={{ minWidth: 60 }} />
    //       <div className="content">
    //         <Rate value={4} className='fs-6' />
    //         <Flex align='center' className='my-1' gap={6}>
    //           <span className='fw-medium'>Janet Hopkins</span>
    //           -
    //           <span>18/04/2018</span>
    //         </Flex>
    //         <p className='m-0'>Nice coffee</p>
    //       </div>
    //     </Flex>

    //     {/* review form */}
    //     <div className="review-form">
    //       <p className='mb-1'>Add a review</p>
    //       <p className='mb-1'>Your email address will not be published. Required fields are marked *</p>
    //       <p className='mb-1'>Your rating *</p>
    //       <Rate value={3} className='fs-6' />

    //       <AntForm layout='vertical' size='large'>
    //         <FormItem label="Your review *">
    //           <TextArea rows={6} />
    //         </FormItem>
    //         <FormItem label="Name *">
    //           <Input />
    //         </FormItem>
    //         <FormItem label="Email *">
    //           <Input />
    //         </FormItem>

    //         <Checkbox>Save my name, email, and website in this browser for the next time I comment.</Checkbox>

    //         <Button type='primary' className='px-5 mt-2'>Submit</Button>
    //       </AntForm>
    //     </div>
    //   </div>,
    // },
  ];
  const handleIncDec = async (pid: number, type: string, cart_qty_new: number, index?: number) => {
    debugger
    try {

      if (!userInfo?.access_token) {
        let cart: any = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        let itemFound = false;
        cart = cart.map((item: any) => {
          if (item.id === pid) {
            itemFound = true;
            return { ...item, quantity: cart_qty_new };
          }
          return item;
        });
        if (!itemFound) {
          return
          // Toast.warning('Item not found in cart');
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        if (type == 'INC') {
          setState({
            ...state,
            is_cart: true,
            cart_qty:cart_qty_new
          })
        } else {
          setState({
            ...state,
            is_cart: true,
            cart_qty:cart_qty_new
          })
        }
      } else {
        const payload = {
          product_id: state.id,
          quantity:cart_qty_new,
          amount:0,
          coupon_discount:0
        }
        if (type == 'DEC' && cart_qty_new ==0) {
          await removeCart(pid)
        } else {
          const apiRes = await crumbApi.Cart.update(payload)
        }
        if (type == 'INC' && (cart_qty_new == 2 && state.is_cart)) {
          await addToCart()
        } else {
          const apiRes = await crumbApi.Cart.update(payload)
        }
        if (type == 'INC') {
          setState({
            ...state,
            is_cart: true,
            cart_qty:cart_qty_new
          })
        } else {
          setState({
            ...state,
            is_cart:cart_qty_new == 0 ? false : true,
            cart_qty: cart_qty_new
          })
        }
      }
    } catch (error) {
      Toast.error(error)
    }
  }
  console.log(cartData, 'cartDatacartData');

  const updateCart = (payload: any) => {
    debugger
    try {
      let cart: any = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const itemExists = cart.some((item: any) => item.id === payload.id);
      if (itemExists) {
        throw new Error('Item already in cart');
      }
      cart.push(payload);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Item added to cart:', payload);
      setState({
        ...state,
        is_cart_local: true
      })
      setCartData({data:cart,count:cart?.length})
    } catch (error: any) {
      Toast.warning(error.message);
    }
  }


  const addToCart = async () => {
    try {
      const payload = {
        id: Number(router.query.id),
        product:{
          customer_buying_price: state.customer_buying_price,
          name: state.name,
          id:Number(router.query.id),
          feature_image:state?.feature_image??null
        },
        quantity: Number(quantity),
        size: size,
        grid_size:grindSize
      }
      const cartPayload = {
        product_id: state.id,
        quantity: quantity,
        amount:0,
        coupon_discount:0
      }
      setLoading(true)
      if (!userInfo?.access_token) {
        updateCart(payload)
      } else {
        let apiRes = await crumbApi.Cart.add(cartPayload)
        await initCart()
        setState({
          ...state,
          cart_qty:1,
          is_cart:true
        })
        Toast.success(apiRes.message)
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  const removeCart = async (id?: number) => {
    debugger
    setLoading(true)
    try {

      if (!userInfo?.access_token) {
        let cart: any = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        const updatedCart = cart.filter((item: any) => item.id !== Number(id));
        if (cart.length === updatedCart.length) {
          throw new Error('Item not found in cart');
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setState({
          ...state,
          is_cart_local: false
        })
      } else {
        let apiRes = await crumbApi.Cart.remove({ product_id: Number(id) })
        setState({
          ...state,
          is_cart: false,
          cart_qty:1
        })
      }
    } catch (error: any) {
      Toast.warning(error.message);
    } finally {
      setLoading(false)
    }
  }


  const initProductList = async () => {
    debugger
    try {
      let apiRes = await crumbApi.Product.list()
      let data = apiRes.data.filter((res:any) => Number(res.id) !== Number(router.query.id))
      setRelatedProduct({data:data,count:data?.length})
    } catch (error) {

    }
  }
  
  const isCartQuantity = (pid: any) => {
    debugger
    const isInCart = Array.isArray(cartData?.data) && cartData?.data.find((item: any) => item.id === pid);
    return isInCart?.quantity
  }
  console.log(state, 'statetttt');

  React.useEffect(() => {
    initProductList()
  }, [router.query.id])
  React.useEffect(() => {
    setState({
      ...state,
      is_cart: isCart(Number(router.query.id)),
      cart_qty: isCartQuantity(Number(router.query.id)) ?? 1
    })
  }, [isCart(Number(router.query.id)), isCartQuantity(Number(router.query.id))])
  React.useEffect(() => {
    setState({
      ...props,
      is_cart: isCart(Number(router.query.id)),
      cart_qty: isCartQuantity(Number(router.query.id)) ?? 1
    })
    // setSelectedImage(data?.images.length ? data?.images[0] : '')
}, [router.query.id])

const arrGrindSize = [
  {
    value:'WHOLE_BEANS',
    label:'Whole Beans'
  },
  {
    value:'COARSE_GRIND',
    label:'Coarse Grind'
  },
  {
    value:'MEDIUM_GRIND',
    label:'Medium Grind'
  },
  {
    value:'FINE_GRIND',
    label:'Fine Grind'
  },
]
const quantityArr = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];


const [grindSize, setGrindSize] = useState(arrGrindSize[0]?.value)
const [size, setSize] = useState(250)
const [buyQuantity, setBuyQuantity] = useState(1)



// React.useEffect(() => {
//   if(!userInfo?.access_token){
//     let is_cart_local = cartData?.data?.some((res:any) => Number(res?.id) === Number(router.query.id));
//     setState({
//       ...state,
//       is_cart_local:is_cart_local
//     })
//   }

// },[userInfo?.access_token,router.query.id])

  return (
    <Fragment>
      <Head>
      <title>{props?.name} at Copper & Crumb</title>
      <meta name='desription' content={props?.desc}/>
      <meta property='og:image' content={`${BUCKET_ROOT}${state?.feature_image}`}/>
      </Head>
    <section className='product-list-section pt-0 bg-white'>
      <CommonBanner title={"PRoduct Details"} image={state?.thumb_url} />
      <div className="container mt-sm-5 pt-5">
        <Row gutter={[24, 24]} justify={'space-between'}>
          <Col span={24} lg={11} xl={12} xxl={12}>
            <div className="product-images">
              <div className="preview-image mb-4">
                <img onError={(e:any) => e.target.src = productImage.src} src={state?.feature_image ? `${BUCKET_ROOT}${state?.feature_image}` : productImage.src} alt="error" className='h-100 w-100 rounded-3' />
              </div>
              <div className="preview-image-list">
                {[state.image_1, state.image_2].map((res, index) => <div key={index} className="list-image">
                  <img src={res ? `${BUCKET_ROOT}${res}` : productImage.src} alt="error" className='h-100 rounded-3' onError={(e:any) => e.target.src = productImage.src}/>
                </div>)}
              </div>
            </div>
          </Col>
          <Col span={24} lg={11} xl={11} xxl={11}>
            <div className="product-details">
              <Flex align='top' justify='space-between'>
              <h4 className="title fs-1">
                {state.name}
              </h4>
              <ShareProduct title={`Share Product`} price={state?.customer_buying_price} name={state.name} img={state?.feature_image ?  `${BUCKET_ROOT}${state?.feature_image}` : null}/>
              </Flex>
              

              {/* <Flex className='rate mb-4' gap={6}><Rate className='fs-5' value={3} />
                <span className='text-secondary'>(1 customer review)</span>
                </Flex> */}

              <p className='fw-semibold fs-16' style={{color:"#f50"}}>{state?.notes}</p>
              <p className='mt-2 fs-14 text-justify mb-4'>{state.desc}</p>

              <Row gutter={[12,0]}>
                <Col span={24} xxl={24} xl={24}>
                <FormItem label='GRIND SIZE' layout='vertical'>
                 <Select
                 value={grindSize}
                 onChange={(val:any) => setGrindSize(val)}
                options={arrGrindSize?.map((res,i) => {
                  return {
                    value:res.value,
                    label:res.label
                  }
                })}
                />
                </FormItem>
                </Col>
                <Col span={24} xxl={12} xl={12} md={12} sm={12} xs={12}>
                <FormItem label='SIZE' layout='vertical'>
                 <Select
                value={size}
                onChange={(val:any) => setSize(val)}
                options={[
                  { value:250, label: '250g' },
                  { value:500, label: '500g' },
                ]}
                />
                </FormItem>
                </Col>
                <Col span={24} xxl={12} xl={12} md={12} sm={12} xs={12}>
                <FormItem label='QUANTITY' layout='vertical'>
                 <Select
                 value={buyQuantity}
                 onChange={(val:any) => setBuyQuantity(val)}
                // style={{ width: 160 }}
                options={quantityArr?.map((res:any,i:number) => {
                  return {
                    value:res.value,
                    label:res.label
                  }
                })}
                />
                </FormItem>
                </Col>
              </Row>
              <Flex align='baseline' gap={20}>
              <p className='fs-3 fw-bold mt-2'>{CURRENCY}{Number(state.customer_buying_price).toFixed(2)}</p>
              <del className='fs-6 text-grey mt-2'>{CURRENCY}{Number(state.price).toFixed(2)}</del>
              </Flex>
              <Flex align='center' gap={20} className='my-3'>
                {/* <CartCountCompo is_cart={state.is_cart} handleIncDec={handleIncDec} quantity={state.cart_qty} pid={Number(router.query.id)} /> */}
                {userInfo?.access_token ? <Fragment>{state?.is_cart ? <Link href={`/viewcart`}><Button type='primary' size='large' className='px-5'>Go to Cart</Button></Link> : <Button onClick={addToCart} loading={loading} type='primary' size='large' className='px-5'>add to cart</Button>}
                </Fragment> :
                  <Fragment>{state?.is_cart_local ? <Link href={`/viewcart`}><Button type='primary' size='large' className={!screens.md ? "px-4" :'px-5'}>Go to Cart</Button></Link> : <Button onClick={addToCart} loading={loading} type='primary' size='large' className={!screens.md ? "px-4" :'px-5'}>add to cart</Button>}
                  </Fragment>}

                <Link href={'/viewcart'}><Button type='primary' size='large' className='px-5'>Buy now</Button></Link>
              </Flex> 

              <ul className='list-unstyled p-0'>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>SKU</span>: <span className='text-secondary'>{state?.sku}</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Category</span>: <span className='text-secondary'>Fresh Coffee</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Tags</span>: <span className='text-secondary'>{
                  <>
                  <Tag bordered={true} className='rounded' color="magenta">
                  {state.tag_1}
                </Tag>
                <Tag bordered={true} className='rounded' color="orange">
                {state.tag_2}
              </Tag>
              <Tag bordered={true} className='rounded' color="geekblue">
              {state.tag_3}
            </Tag>
            </>
                  }</span></li>
                {/* <li className='product-desc-list'><span className='fw-semibold text-uppercase'>Share</span>:
                  <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
                    <li><Link href={'/'}><i className="fa-brands fa-facebook"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-square-instagram"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-twitter"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-linkedin"></i></Link></li>
                  </ul>
                  </li> */}
              </ul>

              <div className="product-details-tab mt-5">
                <Tabs defaultActiveKey="1" items={items} />
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 20]} className='mt-5'>
          <Col span={24} className='mb-2'><h4 className='title fs-2'>You may also like.</h4></Col>
          {Array.isArray(relatedProduct?.data) && relatedProduct?.data?.slice(0,4)?.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res}  /></Col>)}
        </Row>
      </div>
    </section>
     {/* <section className="gallery-section">
            <div className="container-fluid px-0">
              <Row justify={"center"} className="mb-5 mx-0">
              <Col span={24} className='mb-2'><h4 className='title fs-2'>You may also like.</h4></Col>
              </Row>
              <Row gutter={[20, 20]} className="mx-0">
                <Col span={24}>
                  <Carousel dots={false} autoplay slidesToShow={screenSize} infinite={true} slidesToScroll={1} draggable={true} responsive={responsive}>
                  {Array.isArray(relatedProduct?.data) && relatedProduct?.data.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res}  /></Col>)} 
                                   </Carousel>
    
                </Col>
              </Row>
            </div>
          </section> */}
    </Fragment>
  )
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}

const getDetails = async (_id: string) => {
    let apiRes = await crumbApi.Product.details(_id)
    return Array.isArray(apiRes?.data) ? apiRes.data[0] : apiRes?.data

}
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const data = await getDetails(context?.query?.id as string)
        return {
            props: { ...data },

        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },

        }
    }
}
export default ProductDetail


