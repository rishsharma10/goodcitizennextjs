import { AntForm, Button, Col, Flex, FormItem, Input, InputPassword, Row, TypographyText } from '@/lib/AntRegistry'
import { Form } from 'antd'
import React, { Fragment, useContext, useState } from 'react'
import logo from '@/assets/brand-guide/logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import crumbApi from '@/utils/crumbApis'
import { GlobalContext } from '@/context/Provider'
import { setCookie } from 'nookies'
import { COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN } from '@/context/actionTypes'
import Head from 'next/head'
type CartItem = {
  id: number;
  quantity: number;
};

type Product = {
  id: number;
  quantity: number;
};
const LoginPage = () => {
  const router = useRouter()
  const { Toast, setUserInfo, initCart, cartData, requestNotification } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)


  const addToCart = async (product_id: number, quantity: number) => {
    try {
      const cartPayload = {
        amount: 0,
        coupon_discount: 0,
        product_id: product_id,
        quantity: quantity
      }
      let apiRes = await crumbApi.Cart.add(cartPayload)

    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const updateCart = async (product_id: number, quantity: number) => {
    const payload = {
      product_id: product_id,
      quantity: quantity
    }
    try {
      const apiRes = await crumbApi.Cart.update(payload)
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };


  // const syncCartData = async (localStorageData: CartItem[], newArray:any) => {
  //   debugger
  //     // Iterate through the new array of products
  //     for (const product of newArray) {
  //       const localStorageItem = localStorageData.find(item => item.id === product.id);

  //       if (localStorageItem) {
  //         // If the product exists in localStorage, update the quantity
  //         const updatedQuantity = localStorageItem.quantity;
  //         await updateCart(product.product_id, updatedQuantity);
  //       } else {
  //         // If the product doesn't exist in localStorage, add it to the cart
  //         await addToCart(product.product_id, product.quantity);
  //       }
  //     }
  //   };


  const syncCartData = async (localStorageData: CartItem[], newArray: any) => {
    const filteredLocalStorageData = localStorageData.filter(item => {
      // Check if the item id is NOT present in the cart (product_id is not equal to item.id)
      return !newArray.some((cartItem: any) => cartItem.product_id === item.id);
    });

    console.log(filteredLocalStorageData);
    debugger;

    for (const product of filteredLocalStorageData) {
      const { id, quantity } = product;  // Extract necessary data
      await addToCart(id, quantity);  // Await the addToCart function for each product
    }

    // Iterate through the new array of products
    // for (const product of newArray) {
    //   const localStorageItem = localStorageData.find(item => item.id === product.id);

    //   if (localStorageItem) {
    //     // If the product exists in localStorage, update the quantity
    //     const updatedQuantity = localStorageItem.quantity;
    //     await updateCart(product.product_id, updatedQuantity);
    //   } else {
    //     // If the product doesn't exist in localStorage, add it to the cart
    //     await addToCart(product.product_id, product.quantity);
    //   }
    // }

    // Handle the elements in localStorageData that are not in newArray
    const unmatchedItems: any = localStorageData.filter((item: any) => !newArray.some((product: any) => product.id === item.id));

    // Add unmatched items to the cart
    for (const item of unmatchedItems) {
      await addToCart(item.product_id, item.quantity);
    }
  };














  const handleSubmit = async (values: any) => {
    debugger
    console.log(values, 'valuesssss');
    const payload = {
      email: values.email,
      password: values.password
    }
    try {
      setLoading(true)
      const token = await requestNotification()
      const apiRes = await crumbApi.Auth.login({...payload,fcm_token:token});
      crumbApi.setToken(apiRes.token)
      
      setUserInfo({
        ...apiRes,
        access_token: apiRes.token
      });
      setCookie(this, COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN, apiRes?.token, {
        path: "/",
      });
        router.replace(`/`)
    } catch (error: any) {
      Toast.error(error.message)
      setLoading(false)
    } finally {
    }

  }
  return (
    <Fragment>
      <Head>
        <title>{`Login`} at Good citizen</title>
        <meta name='desription' content={`Login at Good citizen`} />
      </Head>
      <section className='h-100 py-3'>
        <div className="container-fluid h-100">
          <Row align={'middle'} className='h-100 overflow-auto' justify={'center'}>
            <Col span={24} md={20} lg={18} xl={16} xxl={16}>
              <div className="d-flex align-items-center w-100 auth-page p-0">
                <div className="auth-banner w-100 d-none d-md-block">
                </div>
                <div className="p-4 w-100 h-100 bg-white">
                  <div className="logo text-center mb-5 text-uppercase fw-bold fs-14">
                    <Link href={'/'}>Good citizen</Link>
                  </div>
                  <Form layout='vertical' size='large' onFinish={handleSubmit}>
                    <FormItem name={`email`} label={'Email'} rules={[
                      {
                        required: true,
                        message: "Please enter your email address",
                      },
                      {
                        type: 'email',
                        message: 'Please enter valid email address',
                      },
                    ]}>
                      <Input placeholder='Enter Email' />
                    </FormItem>
                    <FormItem name={`password`} label={'Password'} rules={[{ required: true, message: "Please enter password" }]}>
                      <InputPassword placeholder='Enter Password' />
                    </FormItem>
                    <Flex gap={6}>

                      <TypographyText>Create an account ?</TypographyText> <Link href={`/signup`}><p className='text-uppercase text-primary'>Sign up</p></Link>
                    </Flex>
                    <div className="submit-btn text-center mt-5">
                      <Button loading={loading} htmlType='submit' type='primary' className='px-5'>LOGIN</Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Fragment>

  )
}

export default LoginPage