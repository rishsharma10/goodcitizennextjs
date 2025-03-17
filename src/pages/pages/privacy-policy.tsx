import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import Head from 'next/head'
import React, { Fragment, ReactElement } from 'react'

const Privacy = () => {
  return (
    <Fragment>
      <Head>
        <title>{`Privacy policy`} at Copper & Crumb</title>
        <meta name='desription' content={`Privacy policy at copper & crumb`} />
      </Head>
      <section className='pt-0'>
        <CommonBanner title={"Privacy policy"} />
      <div className='p-5 pt-3'>
        <h1 className='m-0 p-0'>PRIVACY POLICY</h1>
        <p className='mb-3'>
          This Privacy Policy explains how your personal information is collected, used, and shared when you visit the site or make a purchase from www.copperandcrumb.com.
        </p>

        <h3 className='m-0 p-0'>Our Commitment to Privacy</h3>
        <p>
          Copper & Crumb is committed to protecting your privacy and maintaining transparency. This Policy outlines the types of information we may collect from you and how we use, maintain, and disclose that information.
        </p>
        <p className='mb-3'>
          Copper & Crumb (a subsidiary and registered trademark of Heisetasse Beverages Pvt Ltd) may update this Policy periodically. We encourage you to review this page regularly. The updated Policy will apply to all past and current users of our website and replace any previous versions.
        </p>

        <h3 className='m-0 p-0'>What Information We Collect and How We Use It</h3>
        <p>
          We do not collect identifiable information from individuals unless it is knowingly provided. Visitors to our website are not required to register or provide information to browse our website.
        </p>
        <p>
          If you choose to create a Copper & Crumb account, we collect the following information: name, address, phone number, email address, username, and password. This information is used to provide the requested services and for purposes outlined in this Policy. We may also contact you occasionally via email or regular mail unless you opt out.
        </p>
        <p className='mb-3'>
          The email address you provide is used for internal purposes, such as order confirmation and tracking, or as described in this Policy.
        </p>

        <h3 className='m-0 p-0'>Updating, Deleting, and Editing Your Account Information</h3>
        <p className='mb-3'>
          After creating an account, you can access, review, correct, or delete the information you provided by logging into your account. You can also request assistance by emailing us at <a href="mailto:care@copperandcrumb.com">care@copperandcrumb.com</a>.
        </p>

        <h3 className='m-0 p-0'>Security</h3>
        <p className='mb-3'>
          We prioritize your privacy and security. Administrative, physical, and technical safeguards are in place to protect your personal information from accidental, unlawful, or unauthorized destruction, loss, access, disclosure, or use.
        </p>

        <h3 className='m-0 p-0'>Opting Out</h3>
        <p className='mb-3'>
          If you prefer not to receive marketing emails from us, please contact us using the information below.
        </p>

        <h3 className='m-0 p-0'>Contacting Us</h3>
        <p>
          For questions, comments, or to opt out of receiving updates and mailings, contact us via email at <a href="mailto:care@copperandcrumb.com">care@copperandcrumb.com</a> or call us at <a href="tel:+918047108111">080-47108111</a>.
        </p>
      </div>
      </section>
    </Fragment>


  )
}
Privacy.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default Privacy