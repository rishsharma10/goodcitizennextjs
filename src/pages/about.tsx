import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { Button, Col, Flex, Row, TypographyText, TypographyTitle } from '@/lib/AntRegistry'
import React, { Fragment, ReactElement } from 'react'
import aboutBanner from '@/assets/brand-guide/title-above.png';
import blog2 from '@/assets/images/delicious-coffee-cup-table.jpg';
import titleImage from '@/assets/brand-guide/title-separator.png';
import { Carousel } from 'antd';
import blog3 from '@/assets/images/front-view-cake-slice-with-cream-fresh-red-strawberries-inside-plate-getting-sugar-powder-dark-background.jpg'
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import image1 from "@/assets/images/founderimg1.jpeg"
import image2 from "@/assets/images/WhatsApp Image 2025-01-11 at 00.47.33.jpeg"
import imageabout from "@/assets/images/layered-fruit-cake-cake-with-strawberries-raspberry-sauce-cream-stone-background-patisserie-desserts.jpg"
import imageabout2 from "@/assets/images/adult-harvesting-coffee.jpg"
import Link from 'next/link';
import Head from 'next/head';
const About = () => {
  const stateData = [
    {
      count: 12,
      title: 'Varieties of Coffee',
      desc: `From bold espressos to smooth cold brews, we have a coffee for every taste. Whether you crave intensity or smoothness, discover your perfect cup today and enjoy the ultimate coffee experience.`
    },
    {
      count: 21,
      title: 'Artisan Pastry Creations',
      desc: `From delicate French techniques to innovative Indian-inspired flavors, our pastry repertoire celebrates culinary artistry. Each creation tells a story of tradition, innovation, and passion.`
    },
    {
      count: 240,
      title: 'Hours of Craft Perfection',
      desc: `Behind every pastry and coffee lies a meticulous journey of experimentation. Our team invested countless hours refining techniques, ensuring every bite and sip represents the pinnacle of artisanal excellence.`
    },
    {
      count: 18,
      title: 'Local Farming Partnerships',
      desc: `We believe great food starts with exceptional ingredients. Our carefully curated partnerships with local farmers in the Chandigarh Tricity region ensure sustainable sourcing and support for community agriculture.`
    },
  ]
  const aboutCoffee = [
    // {
    //   image: blog3.src,
    //   title: 'Our Philosophy',
    //   desc: `In a world of mass-produced goods, we choose the path of artisanal genuineness. Every
    //   morning starts with the soothing sound of butter folded into the dough, each fold an
    //   introspective reflection on excellence. Our commitment to handcrafting extends beyond the
    //   cooking area – from sourcing heritage wheat varieties from local farmers to collaborating with
    //   neighborhood artisans for our furniture.`,
    //   listData: [

    //   ]
    // },
    {
      image: blog3.src,
      title: 'Our Vision',
      desc: ` Looking forward, Copper & Crumb is more than just a cafe & patisserie; it's a movement
                    honoring the possibilities of what happens when civilizations interact respectfully and creatively.
                    Every day we strive to:`,
      listData: [
        {
          list: 'Respect conventional techniques while pushing the frontier of culinary fusion.'
        },
        {
          list: 'Create prospects for women working in professional kitchens.'
        },
        {
          list: 'Advocacy of environmentally friendly farming methods.'
        },
        {
          list: 'Create a community around shared goals of creativity and workmanship.'
        },
      ]
    },

    {
      image: blog2.src,
      title: 'Our Impact',
      desc: `Through our apprenticeship system, we're developing the next generation of talented culinary
      craftspeople, with a special focus on women in professional kitchens. We have thus far:
      `,
      listData: [
        {
          list: 'Supervised and trained 12 women through our extensive apprenticeship scheme.'
        },
        {
          list: 'Worked with 15-20 farms nearby in order to source sustainable ingredients in tandem.'
        },
        {
          list: 'Reduced our carbon footprint with creative waste-cutting strategies.'
        },
        {
          list: 'Documented and provided guidance on preserved traditional crafts techniques.'
        },
      ]
    }
  ]

  const data2 = [
    {
      desc: `The partnership between Kannupriya and Chef Zareen represents the perfect blend of vision
                    and expertise, business acumen and culinary artistry. Their collaboration has created more than
                    just a patisserie—it's a movement celebrating the union of cultures, the preservation of craft,
                    and the power of female entrepreneurship`
    }
    ,
    {
      desc: `Their shared commitment to excellence, sustainability, and community building ensures that every visit to Copper & Crumb is more than just a culinary experience—it's a chance to be part of a larger story of transformation and tradition, innovation and authenticity.`
    }
  ]
  return (
    <Fragment>
    <Head>
      <title>{`About us`} at Copper & Crumb</title>
      <meta name='desription' content={`About copper & crumb`}/>
      </Head>
      <section className="about-us pt-0 bg-white">
        <CommonBanner title="About us" image={imageabout2.src} />
        <section className="blog-section common-bg-2">
          <div className="container">
            {/* <Row justify={"center"} className="mb-5">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">About us</h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </Col>
          </Row> */}
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <div className="full-width-image">
                  <img src={blogImage.src} alt="error" className="img-fluid" />
                </div>
                <div className="blog-content mt-4">
                  <h4>Our Philosophy</h4>
                  <p className="mt-2 mb-3 text-dark">
                    In a world of mass-produced goods, we choose the path of artisanal genuineness. Every
                    morning starts with the soothing sound of butter folded into the dough, each fold an
                    introspective reflection on excellence. Our commitment to handcrafting extends beyond the
                    cooking area – from sourcing heritage wheat varieties from local farmers to collaborating with
                    neighborhood artisans for our furniture.
                  </p>
                  {/* <ol className='ps-3'>
                    <li>
                      Respect conventional techniques while pushing the frontier of culinary fusion.
                    </li>
                    <li className='my-2'>
                      Create prospects for women working in professional kitchens.
                    </li>
                    <li>
                      Advocacy of environmentally friendly farming methods.
                    </li>
                    <li className='mt-2'>
                      Create a community around shared goals of creativity and workmanship.
                    </li>
                  </ol> */}
                  {/* <Link href={'#'}>Read More</Link> */}
                </div>
              </Col>
              {aboutCoffee.map((res: any, index) => <Col key={index} span={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <div className="blog-card">
                  <div className="blog-image">
                    <img src={res.image} alt="error" className="img-fluid" />
                  </div>
                  <div className="blog-content mt-4">
                    <h4>{res.title}</h4>
                    <p className="mt-2 mb-3 text-dark">{res.desc}</p>
                    {/* <Link href={'#'}>Read More</Link> */}
                    <ol className='ps-3'>
                      {res.listData.map((res2: any) => <li className='mt-2'>
                        {res2.list}
                      </li>)}
                    </ol>
                  </div>
                </div>
              </Col>)}
            </Row>
          </div>
        </section>
        <div className="container mt-sm-5 pt-5">
          <Row gutter={[20, 20]} justify={'center'}>
            <Col span={24} lg={16} xl={14} xxl={12} className='text-center'>
              <div className='mb-4 pb-2'><img src={aboutBanner.src} alt="error" /></div>
              {/* <h4 className="title mb-4">
                Our team
              </h4> */}
              <h6 className="fw-semibold fs-4 mb-4">
                The Visionary Behind Copper & Crumb
              </h6>
              <p className="sub-title">
              At Copper & Crumb, our story is woven from a distinct thread of passion, expertise, and determination. Our founder represents the perfect blend of entrepreneurial vision and culinary mastery, to create something truly extraordinary.
              </p>
            </Col>
            
            {/* <Col span={24} lg={24} xl={24} xxl={24}>
            <Flex>

              <div className="about-banner-founder mb-3">
                <img src={image1.src} alt="error" className='img-fluid rounded-3' />
              </div>
              <div>

              <TypographyTitle level={5}>Kannupriya: (Founder & Vision Director)
              </TypographyTitle>
              <p className='m-0 text-secondary text-justify'>In the quiet moments of motherhood, while her children slept, Kannupriya's kitchen became an
                alchemist's laboratory. What started as a pursuit of the perfect entremet evolved into a vision for
                transforming India's patisserie landscape. Her journey wasn't marked by formal culinary training,
                but by something equally valuable—an unwavering dedication to mastery and an intuitive
                understanding of how food brings people together.
                Kannupriya's strength lies in her ability to see beyond the conventional. Where others saw just a
                vacant storefront, she envisioned a haven where traditional craftsmanship could flourish
                alongside modern innovation. Her entrepreneurial spirit is matched only by her commitment to
                community building and ethical sourcing.
                As Vision Director, Kannupriya has crafted more than just a patisserie—she's created a
                movement. Her focus on empowering women in culinary arts, supporting local farmers, and
                preserving traditional craftsmanship has transformed Copper & Crumb into a beacon of
                sustainable luxury in the food industry.
              </p>
              </div>
              </Flex>

            </Col> */}
            {/* <Col span={24} lg={12} xl={12} xxl={12}>
              <div className="about-banner mb-3">
                <img src={image2.src} alt="error" className='img-fluid rounded-3' />
              </div>
              <TypographyTitle level={5}>Chef Zareen: Master Pastry Chef & Culinary Director
              </TypographyTitle>
              <p className='m-0 text-secondary text-justify'>From the prestigious kitchens of Le Cordon Bleu London to the vibrant streets of Panchkula,
                Chef Zareen's journey is a testament to the transformative power of culinary arts. Her
                accolades, including leading Team India to 4th position at the 7th World Tapas Competition,
                speak to her technical mastery. However, it's her philosophy about food that truly sets her apart.
                "Every layer tells a story," she often says, her hands gracefully demonstrating the art of
                lamination. For Chef Zareen, French patisserie isn't just about technique—it's about cultural
                dialogue. She sees every pastry as an opportunity to bridge worlds: the precision of French
                methodology with the warmth of Indian flavors, traditional craftsmanship with contemporary
                innovation.
                As Culinary Director, Chef Zareen has created more than just a menu—she's pioneered a new
                culinary language. Her signature creations, from the perfect butter chicken puff pastry (perfected
                over 45 iterations) to innovative coffee-infused entremets, showcase her unique ability to honor
                both French and Indian culinary traditions while creating something entirely new.
                Under her guidance, Copper & Crumb's kitchen has become a learning ground for the next
                generation of pastry chefs, with special emphasis on empowering women in professional
                kitchens. Her mentorship program has already begun transforming lives, helping aspiring chefs
                transition from never having held a piping bag to crafting perfect entremets.
              </p>
            </Col> */}
          </Row>
        </div>
      </section>

      <section className="contact-us pt-0 bg-white">
        <div className="container pt-0">
          <Row gutter={[30, 10]} justify={'space-between'} align={"top"}>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <div className="image-container">
                <img src={image1.src} alt="error" className='img-fluid' />
              </div>
            </Col>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <TypographyTitle className="text-uppercase" level={4}>Kannupriya: (Founder & Vision Director)
              </TypographyTitle>
              <p className='fs-16 text-justify'>In the quiet moments of motherhood, while her children slept, Kannupriya's kitchen became an
                alchemist's laboratory. What started as a pursuit of the perfect entremet evolved into a vision for
                transforming India's patisserie landscape. Her journey wasn't marked by formal culinary training,
                but by something equally valuable—an unwavering dedication to mastery and an intuitive
                understanding of how food brings people together.
                Kannupriya's strength lies in her ability to see beyond the conventional. Where others saw just a
                vacant storefront, she envisioned a haven where traditional craftsmanship could flourish
                alongside modern innovation. Her entrepreneurial spirit is matched only by her commitment to
                community building and ethical sourcing.
                As Vision Director, Kannupriya has crafted more than just a patisserie—she's created a
                movement. Her focus on empowering women in culinary arts, supporting local farmers, and
                preserving traditional craftsmanship has transformed Copper & Crumb into a beacon of
                sustainable luxury in the food industry.</p>
            </Col>
          </Row>
        </div>
      </section>

      <section className="about-testimonial fixed-banner-section h-auto">
        <div className="container ">
          <Row justify={'center'}>
            <Col span={24} lg={20} xl={18} xxl={16}>
              <Carousel draggable={false}>
                {data2.map((res: any) => <div key={res} className="about-testimonial-card pb-5">
                  <h4 className="title mb-3">Creating Magic</h4>
                  <div className='mb-4 mb-sm-5'><img src={titleImage.src} alt="error" style={{ filter: 'sepia' }} className='mx-auto' /></div>
                  <p className='fs-6'>{res.desc}</p>
                </div>)}
              </Carousel>
            </Col>
          </Row>
        </div>
      </section>

      {/* ---------------------- Stats Section --------------------------- */}
      <section className="stats-section">
        <div className="container">
          <Row gutter={[22, 20]}>
            {stateData.map((res: any) => <Col key={res} span={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <div className="stats-card text-center">
                <h1>{res.count}</h1>
                <h4 className="mt-4 mb-2 text-nowrap">{res.title}</h4>
                <p className=''>{res?.desc}</p>
              </div>
            </Col>)}
          </Row>
        </div>
      </section>
      {/* ---------------------------- contact-section ---------------- */}
      <section className="contact-section pt-0">
        <div className="container cta-section">
          <Row justify={"center"}>
            <Col span={24} lg={18} xl={16} xxl={14}>
              <div className="contact-text text-center p-sm-4">
                <h3 className="mb-4">We&apos;d love to hear from you! Reach out with any questions or feedback. Let&apos;s connect!</h3>
                <Link href={`/pages/contact-us`}>
                  <Button size="large" type="primary" ghost className="rounded-0 border border-light text-uppercase py-3 h-auto px-5">Contact us</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Fragment>
  )
}
About.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default About