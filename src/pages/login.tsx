import { AntForm, Button, Col, Flex, FormItem, Input, InputPassword, Row, TypographyText } from '@/lib/AntRegistry'
import { Form } from 'antd'
import React, { Fragment, useContext, useState } from 'react'
import logo from '@/assets/citizen/logo.jpg'
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

  const handleSubmit = async (values: any) => {
    debugger
    console.log(values, 'valuesssss');
    const payload = {
      email: values.email,
      role: String(router.query.role ?? "USER"),
      password: values.password,
      device_type: "WEB",
    } as any
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        payload.lat = String(position.coords.latitude),
          payload.long = String(position.coords.longitude)
      },
      (error) => {
        alert(error.message);
      }
    );
    try {
      setLoading(true)
      const token = await requestNotification()
      const apiRes = await crumbApi.Auth.login({ ...payload, fcm_token: token });
      crumbApi.setToken(apiRes?.data?.access_token)

      setUserInfo({
        ...apiRes?.data,
      });
      setCookie(this, COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN, apiRes?.data?.access_token, {
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
                    <Link href={'/'}><img src={logo.src} alt='error' height={120} width={120} /></Link>
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

                      <TypographyText>Create an account ?</TypographyText> <Link href={`/signup?role=${String(router.query.role ?? "USER")}`}><p className='text-uppercase text-primary'>Sign up</p></Link>
                      <Link href={`/welcome`}><p className='text-uppercase text-primary'>Change login type</p></Link>
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