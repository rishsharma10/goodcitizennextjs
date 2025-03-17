import CommonLayout from '@/components/common/CommonLayout'
import { Col, Flex, Row, TypographyTitle } from '@/lib/AntRegistry'
import React, { Fragment, ReactElement } from 'react'
import HeroBanner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg'
import titleSeperator from '@/assets/images/freshly-baked-sweet-buns-puff-pastry.jpg'
import serviceImage from '@/assets/images/delicious-coffee-cup-table.jpg'
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import CommonBanner from '@/components/CommonBanner'
import Head from 'next/head'
const OurBlog = () => {

    const itemData = [
        {
            image: HeroBanner.src,
            title: `Tips for Making the Best Coffee
          `,
            subTitle: `At Copper & Crumb, we believe every cup of coffee should be an experience. Explore our tips on brewing the perfect cup, whether you're using a French press, pour-over, or espresso machine.`,
        },
        {
            image: serviceImage.src,
            title: `Sourcing the Best Coffee
          `,
            subTitle: `Quality coffee starts with the best beans. Learn about our sourcing process, how we collaborate with farmers, and the care we put into selecting only the finest beans for our blends.`,
        },
        {
            image: blogImage.src,
            title: `The People Behind Your Coffee`,
            subTitle: `Get to know the talented baristas who craft your favorite coffee beverages. From expert techniques to their passion for the craft, meet the heart and soul of Copper & Crumb.
          `,
        },
        {
            image: blogImage.src,
            title: `What Goes Best With Your Brew`,
            subTitle: `Coffee isn’t just a drink; it’s an experience. Discover the perfect pairings to elevate your coffee moments. From pastries to desserts, we have suggestions that’ll take your coffee break to the next level.
          `,
        },
        {
            image: serviceImage.src,
            title: `What’s Hot in the Coffee World`,
            subTitle: `Stay ahead of the curve with the latest coffee trends. From innovative brewing techniques to new flavors and seasonal offerings, we’ve got the inside scoop.
          `,
        },
        {
            image: HeroBanner.src,
            title: `How It All Began`,
            subTitle: `We’re more than just coffee. Learn about the journey behind Copper & Crumb, our values, and how we’re redefining the coffee experience one cup at a time.
          `,
        },
    ]
    return (
        <Fragment>
            <Head>
                <title>{`Our Blog`} at Copper & Crumb</title>
                <meta name='desription' content={`Our Blog at copper & crumb`} />
            </Head>
            <section className="blog-section pt-0 bg-white">
                <CommonBanner title="Our Blog" image={titleSeperator.src} />
                <div className="container mt-sm-5 pt-5">
                    <Row gutter={[20, 20]} justify={'center'}>
                        <Col span={24} lg={16} xl={14} xxl={12} className='text-center mb-4'>
                            <h4 className="title mb-4">Copper & Crumb</h4>
                        </Col>
                        <Row gutter={[20, 20]}>
                            {itemData.map((res, index) => <Col key={index} span={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                                <div className="blog-card">
                                    <div className="blog-image">
                                        <img src={res.image} alt="error" className="img-fluid" />
                                    </div>
                                    <div className="blog-content mt-4">
                                        <h4>{res.title}</h4>
                                        <p className="mt-3 mb-3 text-secondary text-justify">{res.subTitle}</p>
                                        {/* <Link href={'#'}>Read More</Link> */}
                                    </div>
                                </div>
                            </Col>)}
                        </Row>
                    </Row>
                </div>
            </section>
        </Fragment>

    )
}
OurBlog.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}
export default OurBlog