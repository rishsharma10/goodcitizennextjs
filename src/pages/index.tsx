import {
  AntForm,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  FormItem,
  Input,
  Modal,
  Row,
  Space,
  TypographyText,
  TypographyTitle,
  Upload,
} from "@/lib/AntRegistry";
import React, { useContext, useEffect, useState } from 'react'
import logo from '@/assets/brand-guide/logo.png'
import seperator from '@/assets/brand-guide/slider-separator-img.png'
import HeroBanner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg'
import titleSeperator from '@/assets/brand-guide/title-separator.png'
import serviceImage from '@/assets/images/delicious-coffee-cup-table.jpg'
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import offerItem from '@/assets/brand-guide/h2-custom-icon-5.png'
import coffeeLogo from '@/assets/brand-guide/coffee-logo.png'
import pastryimg from '@/assets/images/layered-fruit-cake-cake-with-strawberries-raspberry-sauce-cream-stone-background-patisserie-desserts.jpg'
import side_view_man from '@/assets/images/side-view-man-preparing-food.jpg'
import hand_holding from '@/assets/images/hand-holding-spoon-pouring-coffee-powder-grinder-grinding-coffee-pouring-into-portafilter.jpg'
import person_serving from '@/assets/images/person-serving-cup-coffee.jpg'
import Link from "next/link";
import { Carousel, Form, Grid } from "antd";
import CrumbIcons from "@/components/CrumbIcons";
import { ReactElement } from "react";
import CommonLayout from "@/components/common/CommonLayout";
import crumbApi from "@/utils/crumbApis";
// import video1 from "@/assets/videos/cori"
import { stringReplace } from "@/utils/crumbValidation";
import ProductCard from "@/components/ProductCard";
import { GlobalContext } from "@/context/Provider";
const Home = () => {
  const itemData = [
    {
      image: pastryimg.src,
      title: `Pastry Program
      `,
      subTitle: `Each creation tells a story of tradition reimagined. Our viennoiserie marries French technique
      with Indian inspiration, while our entremets explore bold new flavor territories. Try our signature
      pecan-coffee entremet, where house-roasted beans meet mascarpone mousse and tonka bean
      in perfect harmony.`,
    },
    {
      image: person_serving.src,
      title: `Coffee Program
      `,
      subTitle: `In partnership with Beanrove Coffee Roasters, we bring you ethically sourced beans roasted to
      perfection. Every cup represents our commitment to sustainability and fair trade, delivering an
      adventure in every sip`,
    },
    {
      image: blogImage.src,
      title: `Community & Sustainability`,
      subTitle: `Our roots run deep in the local community. We work directly with farmers to source heritage
      wheat varieties and seasonal fruits, ensuring both exceptional flavor and sustainable practices.
      Our apprenticeship program focuses on empowering women in culinary arts, turning passion
      into profession.
      `,
    },
    // {
    //   image: offerItem.src,
    //   title: 'Coffee To Go',
    //   subTitle: 'Lorem ipsum dolor sit ametal, consectetuer adipiscing elitus. Aeneantos commodo',
    // },
  ]
  const serviceArray = [
    {
      image: offerItem.src,
      title: 'The Quiet Zone',
      subTitle: `Find your sanctuary away from the world. A single traveler's paradise where you can savor a 
perfectly crafted cappuccino alongside our signature entremet.`,
    },
    {
      image: offerItem.src,
      title: 'The Social Hub ',
      subTitle: `Where stories unfold over perfectly laminated croissants and friendships deepen over 
house-roasted coffee. Gather at tables crafted by local artisans, where every meal becomes a 
memory. `,
    },
    {
      image: offerItem.src,
      title: 'The Exhibition Kitchen ',
      subTitle: `Watch art come to life as our pastry team transforms simple ingredients into extraordinary 
creations. From morning lamination to afternoon chocolate work, witness the magic of craft in 
motion. `,
    }
  ]
  const stateData = [
    {
      count: 250,
      title: 'Varieties of Coffee',
    },
    {
      count: 126,
      title: 'Hours of Testing',
    },
    {
      count: 320,
      title: 'Coffee Markets',
    },
    {
      count: 220,
      title: 'Coffee Brands',
    },
  ]
  const [state, setState] = useState({ data: [], count: 0 })
  const {userInfo, setUserInfo, Toast} = useContext(GlobalContext)
  const [popularProducts, setPopularProducts] = useState({ products: [], count: 0 })


  const initProductList = async () => {
    try {
      let apiRes = await crumbApi.Product.list()
      setState(apiRes)
    } catch (error) {

    }
  }
  const initProductListBestSelling = async () => {
    try {
      let apiRes = await crumbApi.Product.popular()
      setPopularProducts(apiRes)
    } catch (error) {

    }
  }
  console.log(state, 'statetttt');

  React.useEffect(() => {
    initProductList()
    initProductListBestSelling()
  }, [])

  const screens = Grid.useBreakpoint()

  const responsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  const bannerArray = [
    {
      title: `Pastry Poetry. Coffee Canvas.`,
      desc: `Where French technique meets Indian heart, crafting tomorrow's classics today.
                  In our sunlit corner of Panchkula, a culinary revolution is taking shape. Here, antique copper
                  pots share space with gleaming espresso machines, while the aroma of Kerala vanilla beans
                  mingles with French butter. At Copper & Crumb, we're not just making pastries – we're crafting
                  experiences that bridge continents and generations.`,
      button: `Explore Our Menu`,
      link: `/products/search/all/1`,
      poster: HeroBanner.src,
      video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    },
    // {
    //   title: `Pastry Poetry. Coffee Canvas.`,
    //   desc: `Where French technique meets Indian heart, crafting tomorrow's classics today.
    //               In our sunlit corner of Panchkula, a culinary revolution is taking shape. Here, antique copper
    //               pots share space with gleaming espresso machines, while the aroma of Kerala vanilla beans
    //               mingles with French butter. At Copper & Crumb, we're not just making pastries – we're crafting
    //               experiences that bridge continents and generations.
    //   `,
    //   button: `Explore Our Menu`,
    //   link: `/products/search/1/1`,
    //   poster: blogImage.src,
    //   video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    // },
    // {
    //   title: `The Exhibition Kitchen`,
    //   desc: `Watch art come to life as our pastry team transforms simple ingredients into extraordinary
    //   creations. From morning lamination to afternoon chocolate work, witness the magic of craft in
    //   motion.
    //   `,
    //   button: `Explore Our Menu`,
    //   link: `/products/search/1/1`,
    //   poster: serviceImage.src,
    //   video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    // }
  ]
  let screenSize = screens.xxl ? 5 : screens.xl ? 4 : screens.lg ? 3 : screens.md ? 2 : screens.sm ? 1 : 1


  const [location, setLocation] = useState<any>({ lat: null, long: null, error: null });




  const getDetails = async (latitude: any, longitude: any) => {
    debugger
    //  setLoading(true)
      try {
      const url = `/api/location?latitude=${latitude}&longitude=${longitude}`
       const result: any = await fetch(url);
        const response = await result.json();
         console.log(response, "resultttt");
          const items = { is_home_address: true, home_lat: response?.data?.results[0]?.geometry?.location?.lat, home_lng: response?.data?.results[0]?.geometry?.location?.lng, home_address: response?.data?.results[0]?.formatted_address, };
          //  await updateHomeBanner(itemsss)
            setUserInfo({ ...userInfo, ...items })
            Toast.success("Update location successfully")
      }
      catch (error){

      }
    }

      useEffect(() => {
        if (!navigator.geolocation) {
          setLocation((prev: any) => ({ ...prev, error: "Geolocation is not supported" }));
          return;
        }

        const updateLocation = () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                error: null
              });
              getDetails(position.coords.latitude,position.coords.longitude)
            },
            (error) => {
              setLocation((prev: any) => ({ ...prev, error: error.message }));
            }
          );
        };

        // Initial fetch
        updateLocation();

        // Update location every 10 seconds
        const intervalId = setInterval(updateLocation, 30000);

        return () => clearInterval(intervalId); // Cleanup on unmount
      }, []);
      console.log(location, 'location')
      const [loading, setLoading] = useState(false)
      const handleSubmit = async (values: any) => {
        try {
          console.log(values, 'valuesss')
        } catch (error) {

        }
      }
      console.log(userInfo,'userinfoooooo')

      return (
        <section className="container mt-2">
          <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="contact-form">
              <div className="mb-5">
                <h3 className="fs-16">Address : <span className="text-danger">{userInfo?.home_address}</span></h3>
                <h4 className="fs-16">Current lat: <span className="text-danger">{userInfo?.home_lat}</span></h4>
                <h4 className="fs-16">Current lng: <span className="text-danger">{userInfo?.home_lng}</span></h4>
              </div>
              <AntForm size='large' onFinish={handleSubmit}>
                <Row gutter={[20, 8]}>
                  <Col span={24}>
                    <FormItem name={`start_point`} rules={[{ message: 'Please enter start point', required: true }]}>
                      <Input placeholder='Start point' />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem name={`end_point`} rules={[{ message: 'Please enter end point', required: true }]}>
                      <Input placeholder='End point' />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <Button loading={loading} block htmlType='submit' type='primary' className='px-5'>Start</Button>
                  </Col>
                </Row>
              </AntForm>
            </div>
          </Col>

        </section>
      );
    };
    Home.getLayout = function getLayout(page: ReactElement) {
      return (
        <CommonLayout>
          {page}
        </CommonLayout>
      )
    }
    export default Home;
