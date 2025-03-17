import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { Divider } from 'antd'
import Head from 'next/head'
import React, { Fragment, ReactElement } from 'react'

const TermsConditions = () => {
  return (
    <Fragment>
      <Head>
        <title>{`Terms & Conditions`} at Copper & Crumb</title>
        <meta name='desription' content={`Terms & Conditions at copper & crumb`} />
      </Head>
      <section className='pt-0'>
        <CommonBanner title={"Terms & Conditions"} />
        <div className='p-5 pt-4'>
          <h1 className='m-0 p-0'>Terms of Use</h1>
          <p>
            Welcome to the Copper & Crumb website. By continuing to browse and use this website, you agree to comply with and be bound by the following terms and conditions of use.
          </p>

          <h3 className='mt-4'>Use of the Website</h3>
          <ul>
            <li>The Copper & Crumb website and all its contents are provided on an "as is" basis without warranties of any kind.</li>
            <li>You acknowledge that your use of this website is at your sole risk, and Copper & Crumb shall not be liable for any damages related to your use of the site.</li>
            <li>The content on this site is subject to change without notice.</li>
            <li>This website contains material owned or licensed by us. Unauthorized reproduction is prohibited and may result in legal action.</li>
            <li>Links to other websites are provided for convenience. We are not responsible for their content.</li>
          </ul>

          <h3 className='mt-4'>Product Pricing</h3>
          <ul>
            <li>Product prices listed on the website are current. Copper & Crumb reserves the right to cancel any order in the event of a pricing error.</li>
            <li>Prices are subject to change without notice.</li>
            <li>All prices are in Indian Rupees (INR). Bank fees for international transactions are the customer’s responsibility.</li>
            <li>All products are subject to applicable GST in India.</li>
          </ul>

          <h3 className='mt-4'>#Mugshot Moments Friendship Day Contest - Terms and Conditions</h3>
          <h4 className='m-0 p-0'>1. Contest Period</h4>
          <p className='mb-3'>The contest will run on August 6th, 2023, and conclude at 12:00 AM. Results will be announced on August 8th, 2023, at 12:00 PM.</p>

          <h4 className='m-0 p-0'>2. Eligibility</h4>
          <ul>
            <li>Open to Indian citizens residing in India aged 18 years or above.</li>
            <li>Employees of Copper & Crumb, its affiliates, and their immediate family members are not eligible.</li>
          </ul>

          <h4 className='m-0 p-0'>3. How to Enter</h4>
          <ul>
            <li>Follow Copper & Crumb on Instagram (@copperandcrumb).</li>
            <li>Like the official #MugshotMoments contest post.</li>
            <li>Visit a Copper & Crumb outlet, take a picture with your favorite barista, and post it on your Instagram story, tagging @copperandcrumb and #mugshotmoments.</li>
          </ul>

          <h4 className='m-0 p-0'>4. Winner Selection and Notification</h4>
          <ul>
            <li>Winners will be randomly selected and notified via Instagram Direct Message.</li>
            <li>Winners must respond within 48 hours to claim their prize.</li>
          </ul>

          <h4 className='m-0 p-0'>5. Prizes</h4>
          <ul>
            <li>Each winner will receive a Coffee Mug and a Chocolate Bar.</li>
            <li>Prizes are non-transferable and no cash alternatives are available.</li>
          </ul>

          <h4 className='m-0 p-0'>6. Consent and Release</h4>
          <p className='mb-3'>
            By participating, contestants allow Copper & Crumb to use their entries for marketing without further compensation.
          </p>

          <h4 className='m-0 p-0'>7. Rights of Copper & Crumb</h4>
          <ul>
            <li>Copper & Crumb reserves the right to reject any entry without explanation.</li>
            <li>All contest-related decisions are final.</li>
          </ul>

          <p>
            All disputes will be governed by the laws of India under the jurisdiction of the Karnataka High Court.
          </p>
        </div>
      </section>

    </Fragment>


  )
}
TermsConditions.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default TermsConditions