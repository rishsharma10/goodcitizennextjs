import { AntForm, Button, Col, Flex, FormItem, Input, InputPassword, Row, TypographyText } from '@/lib/AntRegistry'
import { Form } from 'antd'
import React, { Fragment, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Welcome = () => {
  const router = useRouter()

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
                    <Link className='fs-14 fw-bold' href={'/'}>Good citizen</Link>
                  </div>
                    <div className="submit-btn text-center mt-5">
                      <Button htmlType='submit' onClick={() => router.push(`/login?role=DRIVER`)} type='default' block className='px-5'>Login as Driver</Button>
                    </div>
                    <div className="submit-btn text-center mt-5">
                      <Button htmlType='submit' type='primary' onClick={() => router.push(`/login?role=USER`)} block className='px-5'>Login as User</Button>
                    </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Fragment>

  )
}

export default Welcome