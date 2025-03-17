import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { Button, Col, Flex, Row, TypographyText, TypographyTitle } from '@/lib/AntRegistry'
import React, { Fragment, ReactElement, useState } from 'react'
import aboutBanner from '@/assets/brand-guide/title-above.png';
import banner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg';
import common_img from '@/assets/images/bun-with-poppy-seeds.jpg'
import coffee_mug from "@/assets/images/coffee_mug.jpg"
import small_tarlet from "@/assets/images/small-tartlet-dessert-with-whipped-cream-figs-copy-space.jpg"
import what2 from "@/assets/images/WhatsApp Image 2025-01-11 at 00.47.33.jpeg"
import platedish from "@/assets/images/WhatsApp Image 2025-01-11 at 00.47.32.jpeg"
import raspberry from "@/assets/images/raspberry-desert-mint-sweet-cracker-jam-side-view.jpg"
import hand_holding from "@/assets/images/hand-holding-spoon-pouring-coffee-powder-grinder-grinding-coffee-pouring-into-portafilter.jpg"


import serviceImage from '@/assets/images/delicious-coffee-cup-table.jpg'
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import { Grid, Typography } from 'antd';
import OurStoryCard from '@/components/OurStoryCard';
import ScrollToTop from '@/components/ScrollToTop';
import Head from 'next/head';
const OurStory = () => {

  const story = [
    {
      image: banner.src,
      title: 'Building Dreams One Layer at a Time',
      desc: `A new wave of artisanal patisserie is taking shape in the city of Panchkula, where old and new
      come together. There are no pretentious Parisian or Viennese vibes here; instead, antique
      copper pots and pans coexist with sleek espresso machines, while Kerala vanilla beans infuse
      the air alongside French butter. Two visionary women at Copper & Crumb are changing the
      Indian café and patisserie scene.
      `
    },
    {
      image: banner.src,
      title: `A Dream's Beginnings
      `,
      desc: `Dreams simmered like sweet caramel for Kannupriya Garg during the quiet hours of
      motherhood, and it was the beginning of her journey. She turned her kitchen into an
      experimental space while her children slept. Each failed attempt at the perfect entremet wasn't a
      setback; it was a step forward on the path to mastery. Chef Zareen came to India from the
      illustrious London kitchens with more than simply a set of baking techniques; she brought a
      vision for connecting cultures. As she taught Kannu the intricate techniques of French pastries,
      she would often comment, "Every layer tells a story," as her hands would gracefully glide
      through the air. "The base speaks of foundation, the Crémeux of passion, and the glaze—that
      final, perfect mirror—reflects not just light but the journey of transformation."
      `
    },
    {
      image: banner.src,
      title: `Creating Greatness with Alchemy`,
      desc: `Their collaboration with Beanrove Coffee Roasters completed the perfect triangle, founded on
      shared values of sustainability and fair trade. Their coffee obsession matched our pastry
      perfectionism. Every cup of coffee is an adventure in discovery, and every pastry is a story of
      cultural fusion; together, they're creating something unprecedented: a venue where French
      patisserie technique meets Indian culinary wisdom.
      `
    },
    {
      image: banner.src,
      title: `Sustainable Practices and Community Development
      `,
      desc: `Our involvement extends beyond the kitchen walls. We collaborate with local farmers to provide
      a consistent supply of ethically sourced seasonal fruits while supporting sustainability. We
      procure heritage wheat varieties from local farmers, which assures preservation of local
      methods of cultivation while establishing the exceptional taste of our desserts. We work with
      local artisans to preserve traditional craftsmanship.
      
      `
    },
    {
      image: banner.src,
      title: `A Haven for Narratives`,
      desc: `In March of 2024, an unexpected gift arrived in the form of a vacant storefront that became a
      canvas for bigger dreams. In today's world, Copper & Crumb is a living example of thoughtful
      design and intentional production. Three distinct sensations infuse our space: Indulge in a single
      traveler's paradise at The Quiet Zone, where you may unwind with a handcrafted cappuccino
      and a Parisian-Indian slice of entremet. In the Social Zone, people meet around tables made by
      neighborhood craftspeople to share more than simply pastries—they share stories and laughs.
      Visit our Exhibition Zone in the morning and you'll catch our pastry team in action—hands
      dusted with flour, rolling pins in constant motion, the satisfying crackle of laminated dough being
      folded. It's where French technique meets Indian heart, right before your eyes
      
      `
    },
    {
      image: banner.src,
      title: `Exploring Fusion: More Than Just Recipes
      `,
      desc: `Take our butter chicken puff pastry; it's a study in accuracy and love. Creating such delicate
      layers of puff pastry to match the depth of North Indian spices. That wasn't an easy feat. It took
      us 45 tries to find the right equilibrium, nevertheless we declined to compromise. Our newest
      offering takes matters to the next level. Consider a base of nutty pecan sponge, with warmth
      and butteriness hinting at the layers above. Then a creamy mascarpone mousse with a delicate
      tonka bean perfume that whispers behind the powerful tones of our house-roasted coffee mix.
      Finally, a concluding drizzle of pecan praline seeps out with each bite, providing a molten
      contrast to the light pastry. This isn't fusion for fusion's sake; it's respect for both traditions
      creating something entirely new. French technique meets Indian spice, tropical bean meets
      roasted nut - an orchestra of tastes that widens culinary boundaries. And it all starts out with
      respect. Respect for the centuries-long mastered croissant. Gratitude for the butter chicken
      recipe carried down through the centuries. Respect for the farmers who farm our sustainable
      coffee and the artisans who create our tables. Every taste tells a story in which the ancient and
      new, regional and global, coexist in delightful harmony. Copper & Crumb doesn't simply serve
      desserts. We're establishing a platform for cultural conversation in which the foundations of
      tradition coexist with the spirit of innovation. This is more than just fusion; it's a celebration of the
      human experience, with each flavor infused with the passion, perseverance, and reverence that
      brought it to life.
      `
    },
    {
      image: banner.src,
      title: `An Enduring Impression

      `,
      desc: `We are a movement, not just a café. We know how tough it is for women to break into
      professional kitchens—both of us lived that story. That’s why we have instituted an
      apprenticeship program that gives special attention to women in the culinary arts. Watching
      them master everything from lamination to tempering chocolate reminds us why we started this
      in the first place. Some of them had never held a piping bag before. Today they're crafting
      perfect entremets. That's the real flavor of success.
      
      `
    },
    {
      image: banner.src,
      title: `Let’s Write the Next Chapter Together.

      `,
      desc: `Every time you visit Copper & Crumb, you become part of a bigger cause. Whether you're
      seeking solitude with an exquisite cup of coffee, gathering with friends over mind-blowing
      pastries, or simply observing our artists in action, you become a part of this transformation's
      story. Like a perfect setting, the most beautiful events in life emerge layer by layer, each addition
      improving the whole experience. This world, where old and modern coexist, where crumb and
      copper meet, where each creation tells a story of persistence, awaits the telling of your own
      story.
      
      `
    },
  ]
  const isEven = (number: number) => {
    return number % 2 === 0;
  }

  const [rows, setRows] = useState<any>(2);
  const [expanded, setExpanded] = useState(false);

  let title_desc8 = `Take our butter chicken puff pastry; it's a study in accuracy and love. Creating such delicate
                  layers of puff pastry to match the depth of North Indian spices. That wasn't an easy feat. It took
                  us 45 tries to find the right equilibrium, nevertheless we declined to compromise. Our newest
                  offering takes matters to the next level. Consider a base of nutty pecan sponge, with warmth
                  and butteriness hinting at the layers above. Then a creamy mascarpone mousse with a delicate
                  tonka bean perfume that whispers behind the powerful tones of our house-roasted coffee mix.
                  Finally, a concluding drizzle of pecan praline seeps out with each bite, providing a molten
                  contrast to the light pastry. This isn't fusion for fusion's sake; it's respect for both traditions
                  creating something entirely new. French technique meets Indian spice, tropical bean meets
                  roasted nut - an orchestra of tastes that widens culinary boundaries. And it all starts out with
                  respect. Respect for the centuries-long mastered croissant. Gratitude for the butter chicken
                  recipe carried down through the centuries. Respect for the farmers who farm our sustainable
                  coffee and the artisans who create our tables. Every taste tells a story in which the ancient and
                  new, regional and global, coexist in delightful harmony. Copper & Crumb doesn't simply serve
                  desserts. We're establishing a platform for cultural conversation in which the foundations of
                  tradition coexist with the spirit of innovation. This is more than just fusion; it's a celebration of the
                  human experience, with each flavor infused with the passion, perseverance, and reverence that
                  brought it to life.`

  const screens = Grid.useBreakpoint()
  return (
    <Fragment>
      <Head>
        <title>{`Our story`} at Copper & Crumb</title>
        <meta name='desription' content={`Our story at copper & crumb`} />
      </Head>
      <section className="contact-us pt-0 bg-white">
        <CommonBanner title="Our story" image={common_img.src} />
        <div className="container mt-sm-5 pt-5">
          <Row gutter={[20, 20]} justify={'center'}>
            <Col span={24} xl={24}>
              <div className="our-story-col-1">
                <div className="our-story-image">
                  <img src={coffee_mug.src} alt="error" className='img-fluid' />
                </div>
                <div className="out-story-content-1 out-story-content">
                  <TypographyTitle level={4}>The Seed is Planted (2019)</TypographyTitle>
                  <p>In the quiet hours of motherhood, Kannupriya Garg discovered her calling. Her kitchen became an experimental sanctuary, where each failed dessert wasn't a setback but a stepping stone. Starting with simple cakes for her children, she found herself drawn deeper into the world of contemporary desserts, experimenting with flavors that bridged cultures and challenged conventions.</p>
                </div>
              </div>
            </Col>
            <Col span={24} xl={12}>
              <div className="our-story-right-col">
                <div className="our-story-image" style={{ height: 200 }}>
                  <img src={hand_holding.src} alt="error" className='img-fluid' />
                </div>

                <div className="out-story-content-1 out-story-content">
                  <TypographyTitle level={4}>A Serendipitous Connection (2021)</TypographyTitle>
                  <p>At a school get together, Kannupriya met Utkarsh, who was visiting from the US. Frustrated by the lack of exceptional coffee experiences in India, he shared her vision of elevating local culinary standards. Their conversation sparked an immediate connection her innovative approach to desserts perfectly complemented his vision of creating extraordinary coffee experiences. Both shared a frustration with the lack of spaces that truly celebrated both crafts.</p>
                </div>
              </div>
            </Col>

            {/* <Col span={24} xl={16}>
            <div className="our-story-col-1">
              <div className="our-story-image">
                <img src={banner.src} alt="error" className='img-fluid' />
              </div>
              <div className="out-story-content-1 out-story-content">
                <TypographyTitle level={4}>Building Dreams One Layer at a Time</TypographyTitle>
                <p>A new wave of artisanal patisserie is taking shape in the city of Panchkula, where old and new
                  come together. There are no pretentious Parisian or Viennese vibes here; instead, antique
                  copper pots and pans coexist with sleek espresso machines, while Kerala vanilla beans infuse
                  the air alongside French butter. Two visionary women at Copper & Crumb are changing the
                  Indian café and patisserie scene.</p>
              </div>
            </div>
          </Col> */}
            {/* <OurStoryCard span={24} lg={12} xl={12} xxl={12} img={serviceImage.src} title={`Exploring Fusion: More Than Just Recipes`} desc={title_desc8}/> */}

            <Col span={24} xl={12}>
              <div className="our-story-right-col">
                <div className="our-story-image" style={{ height: 200 }}>
                  <img src={raspberry.src} alt="error" className='img-fluid' />
                </div>

                <div className="out-story-content-1 out-story-content">
                  <TypographyTitle level={4}>Vision Takes Shape (2022)</TypographyTitle>
                  <p
                  // key={2}
                  // ellipsis={{
                  //   rows,
                  //   expandable: 'collapsible',
                  //   expanded,
                  //   // onExpand: (_: any, info: any) => setExpanded(info.expanded),
                  // }}
                  >While Kannupriya perfected her pastry craft, Utkarsh dove deep into coffee sourcing and brewing techniques. Their complementary skills created a perfect blend her understanding of baking techniques with local flavors, his expertise in building startups and global coffee cultures.
                    {/* <Button
                        type="link"
                        onClick={() => setExpanded((prev:any) => !prev)

                        }
                      >{expanded ? "Hide" : "Show"}</Button> */}
                  </p>
                </div>
              </div>
            </Col>
            {/* <Col span={24} xl={12}>
            <div className="our-story-right-col">
              <div className="our-story-image" style={{ height: 200 }}>
                <img src={platedish.src} alt="error" className='img-fluid' />
              </div>

              <div className="out-story-content-1 out-story-content">
                <TypographyTitle level={4}>The Perfect Partnership (2023)</TypographyTitle>
                <p
                // key={1}
                // ellipsis={{
                //   rows,
                //   expandable: 'collapsible',
                //   expanded,
                //   onExpand: (_: any, info: any) => setExpanded(info.expanded),
                // }}
                >Their collaboration with Beanrove Coffee Roasters completed the triangle. Utkarsh returned back from the US and his coffee expertise proved invaluable in sourcing signature blends that complemented Kannupriya's dessert innovations. This partnership ensured not just quality but a commitment to ethical sourcing and sustainability.</p>
              </div>
            </div>
          </Col>
          <Col span={24} xl={12}>
            <Row gutter={[20, 20]}>
              <Col span={24} >
                <div className="our-story-right-col">
                  <div className="our-story-image" style={{ height: 200 }}>
                    <img src={what2.src} alt="error" className='img-fluid' />
                  </div>

                  <div className="out-story-content-1 out-story-content">
                    <TypographyTitle level={4}>Dream to Reality (Feb 2025)</TypographyTitle>
                    <p
                    // ellipsis={{
                    //   rows,
                    //   expandable: 'collapsible',
                    //   expanded,
                    //   onExpand: (_: any, info: any) => setExpanded(info.expanded),
                    // }}
                    >Copper & Crumb's flagship store opens its doors, embodying a new chapter in India's culinary landscape. Here, Kannupriya's innovative desserts showcase the beautiful collision of global inspiration and local soul, while Utkarsh's coffee program introduces Indians to new ways of experiencing their daily brew. The space itself becomes a canvas where contemporary design meets familiar comfort, where every detail invites discovery.</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col> */}
            {/* <Col span={24} xl={24}>
            <div className="our-story-col-1">
              <div className="our-story-image">
                <img src={small_tarlet.src} alt="error" className='img-fluid' />
              </div>
              <div className="out-story-content-1 out-story-content">
                <TypographyTitle level={4}>A Haven for Narratives</TypographyTitle>
                <p>In March of 2024, an unexpected gift arrived in the form of a vacant storefront that became a
                  canvas for bigger dreams. In today's world, Copper & Crumb is a living example of thoughtful
                  design and intentional production. Three distinct sensations infuse our space: Indulge in a single
                  traveler's paradise at The Quiet Zone, where you may unwind with a handcrafted cappuccino
                  and a Parisian-Indian slice of entremet. In the Social Zone, people meet around tables made by
                  neighborhood craftspeople to share more than simply pastries—they share stories and laughs.
                  Visit our Exhibition Zone in the morning and you'll catch our pastry team in action—hands
                  dusted with flour, rolling pins in constant motion, the satisfying crackle of laminated dough being
                  folded. It's where French technique meets Indian heart, right before your eyes

                </p>
              </div>
            </div>
          </Col> */}
            {/* <section className="about-testimonial fixed-banner-section h-auto">
        <div className="container ">
          <Row justify={'center'}> */}
            <Col span={24}>
              <div className="pt-5 pb-4 fixed-banner-section h-auto rounded-4">
                <div className="about-testimonial-card px-4 pt-5 mt-5" >
                  <h4 className="text-start mb-3 mt-5">The Perfect Partnership (2023)</h4>
                  <p className='fs-6 text-start'>Their collaboration with Beanrove Coffee Roasters completed the triangle. Utkarsh returned back from the US and his coffee expertise proved invaluable in sourcing signature blends that complemented Kannupriya's dessert innovations. This partnership ensured not just quality but a commitment to ethical sourcing and sustainability.</p>
                </div>
              </div>
            </Col>
            {/* </Row>
        </div>
      </section> */}
            <OurStoryCard span={24} lg={12} xl={12} xxl={12} img={serviceImage.src} title={`Dream to Reality (Feb 2025)`} desc={`Copper & Crumb's flagship store opens its doors, embodying a new chapter in India's culinary landscape. Here, Kannupriya's innovative desserts showcase the beautiful collision of global inspiration and local soul, while Utkarsh's coffee program introduces Indians to new ways of experiencing their daily brew. The space itself becomes a canvas where contemporary design meets familiar comfort, where every detail invites discovery.`} />
            <OurStoryCard span={24} lg={12} xl={12} xxl={12} img={blogImage.src} title={`Beyond Boundaries (2026 onwards)`} desc={`More than just a café, Copper & Crumb emerges as a movement celebrating modern Indian creativity. Their apprenticeship program nurtures the next generation of culinary innovators, while their commitment to sustainable sourcing creates positive impact in farming communities. Each day brings new opportunities to push boundaries, honor traditions, and create experiences that delight and inspire.`} />

          </Row>
        </div>
      </section>
    </Fragment>

  )
}
OurStory.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default OurStory