import CommonLayout from '@/components/common/CommonLayout'
import { AntForm, Avatar, Button, Col, Flex, FormItem, Input, Row, Table, TypographyText } from '@/lib/AntRegistry'
import React, { ReactElement, useState, useContext, Fragment } from 'react'
import CrumbIcons from '@/components/CrumbIcons'
import Link from 'next/link'
import CommonBanner from '@/components/CommonBanner';
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider'
import banner_img from "@/assets/images/plate_dish.jpg"
import { Form, Grid, Spin } from 'antd';
import crumbApi, { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis';
import CartCountCompo from '@/components/CartCountCompo';
import EmptyCart from '@/components/common/EmptyCart';
import Head from 'next/head';
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import { formatString, stringReplace } from '@/utils/crumbValidation'


const AddToCart = () => {
    const screens = Grid.useBreakpoint()
    const { Toast, userInfo, cartData, initCart,setCartData, setUserInfo } = useContext(GlobalContext)
    const router = useRouter()
    const [form] = Form.useForm()
    const [state, setState] = useState({ data: cartData.data, count: cartData.count, sub_total: 0 })
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const [loadingUpdateCart, setLoadingUpdateCart] = useState(false)



    const handleIncDec = async (pid: number, type: string, qty: number, index: number) => {
        debugger
        setLoadingUpdateCart(true)
        try {

            if (!userInfo?.access_token) {
                let cart: any = localStorage.getItem('cart');
                cart = cart ? JSON.parse(cart) : [];
                let itemFound = false;
                cart = cart.map((item: any) => {
                    if (item.id === pid) {
                        itemFound = true;
                        return { ...item, quantity: qty };
                    }
                    return item;
                });
                if (!itemFound) {
                    return
                    // Toast.warning('Item not found in cart');
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                const data = state.data
                data[index].quantity = qty
                // setState({
                //     ...state,
                //     data
                // })
                const total = state?.data?.reduce((acc: any, item: any) => {
                    const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
                    const quantity = item?.quantity; // Get quantity
                    return acc + (price * quantity); // Add to the accumulator
                }, 0);
                setState({
                    ...state,
                    data,
                    count: state?.data?.length,
                    sub_total: total
                })
                // if (type == 'INC') {
                //   setQuantity(quantity + 1)
                // } else {
                //   setQuantity(quantity - 1)
                // }
            } else {
                const payload = {
                    product_id: pid,
                    quantity: qty
                }
                const apiRes = await crumbApi.Cart.update(payload)
                if (type == 'INC') {
                    const data = state.data
                    data[index].quantity = qty
                    const total = cartData?.data?.reduce((acc: any, item: any) => {
                        const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
                        const quantity = item?.quantity; // Get quantity
                        return acc + (price * quantity); // Add to the accumulator
                    }, 0);
                    setState({
                        ...state,
                        sub_total: total,
                        data
                    })
                } else {
                    const data = state.data
                    data[index].quantity = qty
                    const total = cartData?.data?.reduce((acc: any, item: any) => {
                        const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
                        const quantity = item?.quantity; // Get quantity
                        return acc + (price * quantity); // Add to the accumulator
                    }, 0);
                    setState({
                        ...state,
                        sub_total: total,
                        data
                    })
                }
                setCoupon({is_applied:false,discount:0})
                Toast.success(`Cart quantity updated to ${qty}`)
            }
        } catch (error) {
            Toast.error(error)
        }
        finally {
            setLoadingUpdateCart(false)
        }
    }
    console.log(state, 'staetttete');

    const handleRemoveCart = async (id: number, index: number) => {
        debugger
        try {
            setLoadingUpdateCart(true)
            if (!userInfo?.access_token) {
                const newData = [...state.data];
                newData.splice(index, 1);
                setState(prevState => ({ ...prevState, data: newData }));
                let localData = localStorage.getItem('cart')
                let data = JSON.parse(String(localData));
                data.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(data));
                const total = data?.reduce((acc: any, item: any) => {
                    const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
                    const quantity = item?.quantity; // Get quantity
                    return acc + (price * quantity); // Add to the accumulator
                }, 0);
                setState({
                    ...state,
                    data,
                    count: state?.data?.length,
                    sub_total: total
                })
                setCartData({data:data,count:data?.length})
            } else {
                let apiRes = await crumbApi.Cart.remove({ product_id: id })
                await initCart()
            }
            setCoupon({is_applied:false,discount:0})
            Toast.success(`Item successfully removed from your cart!`)
        } catch (error) {

        } finally {
            setLoadingUpdateCart(false)
        }
    }
    const [couponLoading, setCouponLoading] = useState(false)
    const [coupon, setCoupon] = useState({
        is_applied: false,
        discount: 0
    })
    let discount = coupon.is_applied ? Number(coupon.discount) : 0
    const applyCoupon = async ({ code }: any) => {
        if (coupon.is_applied) {
            form.resetFields()
            return setCoupon({ is_applied: false, discount: 0 })
        }
        debugger
        const productIds = Array.isArray(state.data)
            ? state.data.map((res: any) => res[userInfo?.access_token ? "product_id" : "id"])
            : [];
        const payload = {
            code,
            product_ids: JSON.stringify(productIds)
        }
        try {
            setCouponLoading(true)
            let apiRes = await crumbApi.Auth.validateCoupon(payload)
            if (apiRes?.error) {
                return Toast.warning(apiRes?.error)
            }
            let percent = 'percent'
            let fixed = 'fixed'
            let amount = apiRes?.coupon?.discount_type == percent ? (state.sub_total / 100) * Number(apiRes?.coupon?.discount) : apiRes?.coupon?.discount
            setCoupon({
                is_applied: true,
                discount: Number(amount)
            })
            Toast.success("Coupon applied successfully")
        } catch (error) {
            Toast.error(error)
        } finally {
            setCouponLoading(false)
        }
    }
    console.log(coupon, 'couponnnn');

    const handleSubmit = async (values: any) => {
        const payload = {
            ...values,
            billing_same: true
        }
        try {
            setLoading(true)
            let apiRes = await crumbApi.Auth.updateAddress(payload)
            setUserInfo({
                ...userInfo,
                b_address_line_1: values.b_address_line_1 ?? 'Goa Panji'
            })
            setShow(false)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const dataSource: any = Array.isArray(state?.data) && state?.data.map((res, index) => {
        return {
            key: index,
            cross: <Button onClick={() => handleRemoveCart(Number(res?.product?.id), index)} shape='circle' className='border-0'>x</Button>,
            product: <Link href={`/product/${stringReplace(res?.product?.name)}/${res?.product?.id}`}>
                <Flex align='center' gap={8}>
                    <Avatar src={res?.product?.feature_image ? `${BUCKET_ROOT}${res?.product?.feature_image}` : productImage.src} shape='square' size={100} />
                    <div>

                    <span>{res?.product?.name}</span><br/>
                    <TypographyText className='text-muted'>{formatString(res?.grid_size)} / {res?.size}g</TypographyText>
                    </div>
            </Flex>
            </Link>,
            price: `${CURRENCY}${res?.product?.customer_buying_price}`,
            quantity: <CartCountCompo is_cart={res?.quantity > 1 ? true : false} handleIncDec={handleIncDec} index={index} quantity={res?.quantity} pid={Number(res?.product?.id)} />,
            subtotal: `${CURRENCY}${res?.quantity * res?.product?.customer_buying_price}`,
        }
    })

    const columns = [
        {
            title: '',
            dataIndex: 'cross',
            key: 'cross',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
        },
    ];
    console.log(cartData, 'cartDatacartData');

    React.useEffect(() => {
        const total = cartData?.data?.reduce((acc: any, item: any) => {
            const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
            const quantity = item?.quantity; // Get quantity
            return acc + (price * quantity); // Add to the accumulator
        }, 0);
        setState({
            data: cartData?.data,
            count: cartData?.count,
            sub_total: total
        })
    }, [cartData])
    // React.useEffect(() => {
    //     const total = cartData?.data?.reduce((acc:any, item:any) => {
    //         const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
    //         const quantity = item?.quantity; // Get quantity
    //         return acc + (price * quantity); // Add to the accumulator
    //       }, 0);
    //     setState({
    //         ...state,
    //         sub_total:total
    //     })
    // }, [cartData])
    return (
        <Fragment>
            <Head>
      <title>{`Viewcart`} - Copper & Crumb</title>
      <meta name='desription' content={`Viewcart`}/>
      </Head>
            <section className="add-to-cart-section pt-0 bg-white" >
                <CommonBanner title={"Cart"} image={banner_img.src} />
                <div className="container mt-5">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Spin spinning={loadingUpdateCart}>

                                <div className="cart-content mb-4">
                                    {state?.data?.length !== 0 ? <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: '100%' }} /> : <EmptyCart />}

                                </div>
                            </Spin>
                            {state?.data?.length !== 0 &&
                                <Fragment>
                                    {/* <div className="coupon">
                                        <AntForm size='large' form={form} className='d-flex flex-wrap align-items-center gap-3' onFinish={applyCoupon}>
                                            <FormItem name={`code`} rules={[{ required: true, message: 'Please enter coupon code' }]} className={screens.sm ? 'w-25 m-0' : 'w-100 m-0'}>
                                                <Input placeholder='Coupon Code' disabled={coupon.is_applied} />
                                            </FormItem>

                                            <Button loading={couponLoading} type='primary' htmlType='submit' block={screens.sm ? false : true} className='px-5 text-uppercase'>{coupon.is_applied ? "Remove" : "Apply Coupon"}</Button>
                                        </AntForm>
                                    </div> */}
                                    {/* {coupon?.is_applied && <div className='mt-3 shadow-lg' style={{ padding: '10px', color: 'black', maxWidth: '400px' }}>
                                        <h6>🎉 <span className='fw-bold'>{form.getFieldValue("code")}</span> Applied Successfully!</h6>
                                        <p>
                                            You saved <strong>{CURRENCY}{Number(coupon.discount).toFixed(2)}</strong> off your order. Enjoy your shopping!
                                        </p>
                                    </div>} */}

                                    <div className="cart-total mt-3">
                                        {/* <h2 className='title'>Cart TOtal</h2> */}

                                        <ul className='list-unstyled mb-5 p-0'>
                                            <li className='cart-list'>
                                                <span className='fs-4 fw-bold'>Sub Total:</span>
                                                <span className='fs-5 fw-bold'>{CURRENCY}{Number(state?.sub_total).toFixed(2)}</span>
                                            </li>
                                            {/* <li className='cart-list'>
                                                {!show && <span>Shipping</span>}
                                                {!show ? <><span role='button' className='text-wrap'>{userInfo?.b_address_line_1 ?? 'Enter your address to view shipping options.'}
                                                    <Button onClick={() => setShow(true)} type='text' className='fs-5'><EditFilled /></Button></span></> : <AntForm className='w-100' layout='vertical' size={!screens.md ? "middle" : 'large'} onFinish={handleSubmit}>
                                                    <Row gutter={[10, 5]}>
                                                        <Col span={12} xxl={12} xl={12} lg={12} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_first_name' rules={[{ required: true, message: "Please enter first name" }]} label={'First name'}>
                                                                <Input placeholder='Enter first name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12} xxl={12} xl={12} lg={12} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_last_name' rules={[{ required: true, message: "Please enter last name" }]} label={'Last name'}>
                                                                <Input placeholder='Enter last name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={18} xxl={18} xl={18} lg={18} sm={24} md={24} xs={22}>
                                                            <FormItem name='b_address_line_1' rules={[{ required: true, message: "Please enter address" }]} label={'Address'}>
                                                                <Input placeholder='Enter Address' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_zipcode' rules={[{ required: true, message: "Please enter pincode" }]} label={'Pincode'}>
                                                                <Input placeholder='Enter pincode' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_phone' rules={[{ required: true, message: "Please enter phone number" }]} label={'Phone'}>
                                                                <Input placeholder='Enter phone number' />
                                                            </FormItem>
                                                        </Col>

                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_country' rules={[{ required: true, message: "Please enter country" }]} label={'Country'}>
                                                                <Input placeholder='Enter country' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_state' rules={[{ required: true, message: "Please enter state" }]} label={'State'}>
                                                                <Input placeholder='Enter state' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={24} md={24} xs={22}>
                                                            <FormItem name='b_city' rules={[{ required: true, message: "Please enter city" }]} label={'City'}>
                                                                <Input placeholder='Enter city' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={24} md={24} xs={22}>
                                                        <Flex gap={20} justify='start'>
                                                            <div className="submit-btn text-center">
                                                                <Button type='default' onClick={() => setShow(false)} className='px-4'>CANCEL</Button>
                                                            </div>
                                                            <div className="submit-btn text-center">
                                                                <Button loading={loading} htmlType='submit' type='primary' className='px-4'>UPDATE</Button>
                                                            </div>
                                                        </Flex>
                                                        </Col>
                                                    </Row>
                                                </AntForm>}
                                            </li> */}
                                            {coupon?.is_applied &&<>
                                                <li className='cart-list'>
                                                <span>Discount</span>
                                                <span>{CURRENCY}{discount}</span>
                                            </li>
                                                 <li className='cart-list'>
                                                <span>Total</span>
                                                <span>{CURRENCY}{Number(state.sub_total) - discount}</span>
                                            </li>
                                            </>
                                            }

                                        </ul>

                                        <span><Link href={`/checkout/payment`}><Button block={screens?.sm ? false : true} type='primary' size='large' className='px-5 text-uppercase'>Proceed to checkout</Button></Link></span>
                                    </div>
                                </Fragment>
                            }
                        </Col>
                    </Row>
                </div>
            </section>
        </Fragment>
    )
}

AddToCart.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}

export default AddToCart