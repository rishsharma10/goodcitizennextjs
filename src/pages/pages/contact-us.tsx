import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { GlobalContext } from '@/context/Provider'
import { AntForm, Button, Col, FormItem, Input, Row, TextArea } from '@/lib/AntRegistry'
import crumbApi, { FACEBOOK_LINK, INSTAGRAM_LINK, WHATSPP_LINK } from '@/utils/crumbApis'
import { Form } from 'antd'
import Head from 'next/head'
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Link from 'next/link'
import React, { Fragment, ReactElement, useContext, useState } from 'react'

const Contact = () => {
  const [form] = Form.useForm()
const {Toast} = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values:any) => {
    const payload = {
...values
    }
    try {
      setLoading(true)
      let apiRes = await crumbApi.Auth.customerContact(payload)
      form.resetFields()
      Toast.success(`Thanks for reaching out! We’ll get back to you within 24 hours.`)
    } catch (error) {
      Toast.error(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <Fragment>
      <Head>
        <title>{`Contact us`} at Copper & Crumb</title>
        <meta name='desription' content={`Contact us at copper & crumb`} />
      </Head>
    <section className="contact-us pt-0 bg-white">
      <CommonBanner title="Contact us" />

      <div className="container mt-sm-5 pt-5">
        <Row gutter={[24, 24]}>
          <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="contact-info">
              <h4 className='title mb-3'>Get in Touch</h4>
              <p className='sub-title text-secondary'>We’re always here to assist you with any inquiries, feedback, or support you may need. Whether it’s about your recent purchase, product details, or just a friendly chat about coffee, feel free to get in touch with us. Your satisfaction is our priority, and we’re committed to making your experience with Copper & Crumb seamless and enjoyable.</p>

              <ul className='mt-4 mb-5 ps-3'>
                <li className='mb-2 text-secondary fs-16'>Share your thoughts to help us improve.
                </li>
                <li className='mb-2 text-secondary fs-16'>Let’s create something amazing together.</li>
                <li className='mb-2 text-secondary fs-16'>Got questions? We’re here to assist.</li>
                <li className='text-secondary fs-16'>Experience Copper & Crumb in person.</li>
              </ul>

              <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
                                    <li><Link target='_blank' href={FACEBOOK_LINK}><FacebookOutlined /></Link></li>
                                    <li><Link target='_blank' href={INSTAGRAM_LINK}><InstagramOutlined /></Link></li>
                                    <li><Link target='_blank' href={WHATSPP_LINK}><WhatsAppOutlined /></Link></li>
                                </ul>
            </div>
          </Col>

          <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="contact-form">
              <AntForm size='large' onFinish={handleSubmit} form={form}>
                <Row gutter={[20, 8]}>
                  <Col span={24} md={12} lg={12} xl={12} xxl={12}>
                    <FormItem name={`name`} rules={[{message:'Please enter name',required:true}]}>
                      <Input placeholder='YOUR NAME' />
                    </FormItem>
                  </Col>
                  <Col span={24} md={12} lg={12} xl={12} xxl={12}>
                    <FormItem name={`email`} rules={[{message:'Please enter email',required:true}]}>
                      <Input placeholder='YOUR EMAIL' />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem name={`subject`} rules={[{message:'Please enter subject',required:true}]}>
                      <Input placeholder='SUBJECT' />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem name={`message`} rules={[{message:'Please enter message',required:true}]}>
                      <TextArea placeholder='Message here...' rows={5} />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <Button loading={loading} htmlType='submit' type='primary' className='px-5'>Send message</Button>
                  </Col>
                </Row>
              </AntForm>
            </div>
          </Col>
        </Row>
      </div>
    </section>
    </Fragment>

  )
}
Contact.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default Contact