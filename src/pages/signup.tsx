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
const SignupPage = () => {
    const router = useRouter()
    const { Toast, setUserInfo, userInfo, requestNotification } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (values: any) => {

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
            const apiRes = await crumbApi.Auth.signUp({ ...payload, fcm_token: token });
            crumbApi.setToken(apiRes?.access_token)
           const otpRes = await crumbApi.Auth.verifyOtp({otp:"123456",fcm_token:token,device_type:"WEB"})
            // const apiResUser = await crumbApi.Auth.profile();
            setUserInfo({
                ...otpRes?.data
              });
            setCookie(this, COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN, otpRes?.data?.access_token, {
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
                <title>{`Signup`} at Good citizen</title>
                <meta name='desription' content={`Signup at Good citizen`} />
            </Head>
            <section>
                <div className="container">
                    <Row align={'middle'} justify={'center'}>
                        <Col span={24} md={20} lg={18} xl={18} xxl={18}>
                            <div className="d-flex align-items-center w-100 auth-page p-0">
                                <div className="auth-banner w-100 d-none d-md-block">
                                </div>
                                <div className="p-4 w-100 h-100 bg-white">
                                    <div className="logo text-center mb-5 text-uppercase fw-bold fs-14">
                                        <Link href={'/'}><img src={logo.src} alt='error' height={120}  width={120}/></Link>
                                    </div>
                                    <Form layout='vertical' size='large' onFinish={handleSubmit}>
                                        {/* <FormItem name='first_name' rules={[{ required: true, pattern: /^[a-zA-Z\s]+$/, message: "Please enter first name" }]} label={'First Name'}>
                                        <Input placeholder='Enter first name' />
                                    </FormItem>
                                    <FormItem name='last_name' rules={[{ required: true, pattern: /^[a-zA-Z\s]+$/, message: "Please enter last name" }]} label={'Last Name'}>
                                        <Input placeholder='Enter last name' />
                                    </FormItem> */}
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
                                        {/* <FormItem name='phone' rules={[{ required: true, message: "Please enter phone number" }]} label={'Phone number'}>
                                        <Input placeholder='Enter phone number' />
                                    </FormItem> */}
                                        <FormItem name={`password`} label={'Password'} rules={[{ required: true, message: "Please enter password" }]}>
                                            <InputPassword placeholder='Enter Password' />
                                        </FormItem>
                                        {/* <FormItem name={`confirm_password`} label={'Confirm Password'} rules={[
                                        { required: true, message: "Please enter confirm password" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "The new password that you entered do not match"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}>
                                        <InputPassword placeholder='Enter Confirm Password' />
                                    </FormItem> */}
                                        {/* <Link href={`/login`}><TypographyText> Login</TypographyText></Link> */}
                                        <Flex gap={6}>

                                            <TypographyText>Already have an account ?</TypographyText> <Link href={`/login?role=${String(router.query.role ?? "USER")}`}><p className='text-uppercase text-primary'>Login</p></Link>
                                        </Flex>
                                        <div className="submit-btn text-center mt-2">
                                            <Button loading={loading} htmlType='submit' type='primary' className='px-5'>Sign Up</Button>
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

export default SignupPage