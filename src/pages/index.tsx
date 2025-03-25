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
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Carousel, Form, Grid } from "antd";
import CrumbIcons from "@/components/CrumbIcons";
import { ReactElement } from "react";
import CommonLayout from "@/components/common/CommonLayout";
import crumbApi from "@/utils/crumbApis";
// import video1 from "@/assets/videos/cori"
import { stringReplace } from "@/utils/crumbValidation";
import { GlobalContext } from "@/context/Provider";
import AddressComponents from "@/components/AddressComponents";
import AddressComponentsEnd from "@/components/AddressComponentEnd";
const Home = () => {

  const [state, setState] = useState({ data: [], count: 0 })
  const { userInfo, setUserInfo, Toast } = useContext(GlobalContext)
  const [popularProducts, setPopularProducts] = useState({ products: [], count: 0 })
  const screens = Grid.useBreakpoint()
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
    catch (error) {

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
          getDetails(position.coords.latitude, position.coords.longitude)
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
  const [is_start, setIs_start] = useState(false)
  

  const [pickup_location, setpickup_location] = useState({
    latitude: 0,
    longitude: 0,
    full_address: ""
  });
  const [destination_location, setdestination_location] = useState({
    latitude: 0,
    longitude: 0,
    full_address: ""
  });
  const handleSubmit = async (values: any) => {
    const payload = {
      "pickup_location": {
        "latitude": pickup_location?.latitude,
        "longitude": pickup_location?.latitude,
      },
      "destination_location": {
        "latitude": destination_location?.latitude,
        "longitude": destination_location?.longitude,
      }
    }
    try {
      setLoading(true)
      const apiRes = await crumbApi.Driver.startRide(payload)
      setIs_start(true)
      console.log(values, 'valuesss')
    } catch (error) {
Toast.error(error)
    } finally {
      setLoading(false)
    }
  }
  const handleEnd = async () => {
    setIs_start(false)
  }
  console.log(userInfo, 'userinfoooooo')
  const [addPickup, setAddPickup] = useState(true)



  return (
    <section className="container mt-2">
      {userInfo?.role == "USER" ?
        <Fragment>
          <TypographyTitle level={3}>Welcome back!</TypographyTitle>
        </Fragment>
        : <Fragment>

          {is_start ? <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="contact-form">
              <div className="mb-5">
                <h4 className="fs-16">Pickup: <span className="text-danger">{pickup_location?.full_address}</span></h4>
                <h4 className="fs-16">Destination: <span className="text-danger">{destination_location?.full_address}</span></h4>
              </div>
              <Button block onClick={handleEnd} loading={loading} type="primary">End</Button>

            </div>
          </Col> :
            <Col span={24} lg={12} xl={12} xxl={12}>
              <div className="contact-form">
                <div className="mb-5">
                  <h3 className="fs-16">Address : <span className="text-danger">{userInfo?.home_address}</span></h3>
                  <h4 className="fs-16">Current lat: <span className="text-danger">{userInfo?.home_lat}</span></h4>
                  <h4 className="fs-16">Current lng: <span className="text-danger">{userInfo?.home_lng}</span></h4>
                </div>
                <div role="button" className="shadow p-2 rounded text-center" onClick={() => setAddPickup(true)} >
                  <TypographyTitle level={5}>Enter pickup </TypographyTitle>
                </div>
                {pickup_location?.full_address ? <TypographyText className="mt-5">{pickup_location?.full_address}</TypographyText>:""}
                <div role="button" className="shadow p-2 rounded mt-4 text-center" onClick={() => setAddPickup(false)}>
                  <TypographyTitle level={5}>Enter destination </TypographyTitle>
                </div>
                {destination_location?.full_address ? <TypographyText className="mt-3">{destination_location?.full_address}</TypographyText>:""}
                <div className="mt-5">

                {addPickup ? <AddressComponents name="start_point" placeholder="Enter pickup location" type="START" setState={setpickup_location} state={pickup_location} value={pickup_location?.full_address} />:
                <AddressComponentsEnd name="end_point" placeholder="Enter destination location" type="END" setState={setdestination_location} state={destination_location} value={destination_location?.full_address} />}
                </div>

                <Button block onClick={handleSubmit} loading={loading} type="primary">Start</Button>

              </div>
            </Col>}
        </Fragment>}

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
