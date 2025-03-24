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
  const handleSubmit = async (values: any) => {
    try {
      console.log(values, 'valuesss')
    } catch (error) {

    }
  }
  console.log(userInfo, 'userinfoooooo')

  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [form] = Form.useForm()
  const placeInputRef = React.useRef(null as any)


  function loadGoogleMapScript(callback: any) {
    debugger
    if (
      typeof (window as any).google === "object" &&
      typeof (window as any).google.maps === "object"
    ) {
      callback();
    } else {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD4MHXWLSqsVoZ7kIF3Bq1pVKMlUTO4HOU&libraries=places`;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", callback);
    }
  }
  const runTry = (cb: any) => {
    loadGoogleMapScript(() => {
      cb();
    });
  };
  const initPlaceAPI = () => {
    debugger
    if (placeInputRef?.current) {
      let autocomplete = new (window as any).google.maps.places.Autocomplete(
        placeInputRef?.current?.input
      );
      autocomplete.addListener("place_changed", async () => {
        let place = autocomplete.getPlace();
        // console.log(place?.geometry);
        if (!place.geometry) {
          Toast.warning("Please enter a valid location");
          return;
        }
        const address = place?.address_components;
        const coordinate = place?.geometry?.location;

        console.log(coordinate, "coordinate________");
        console.log(coordinate?.lng(), "lng___________");
        console.log(coordinate?.lat(), "lat______________");

        let items: any = {};
        if (Array.isArray(address) && address?.length > 0) {
          let zipIndex = address.findIndex((res) =>
            res.types.includes("postal_code")
          );
          let administrativeAreaIndex = address?.findIndex((res) =>
            res?.types.includes("administrative_area_level_1", "political")
          );
          let localityIndex = address?.findIndex((res) =>
            res?.types?.includes("locality", "political")
          );
          let countryIndex = address?.findIndex((res) =>
            res?.types?.includes("country", "political")
          );

          if (zipIndex > -1) {
            items.postal_code = address[zipIndex]?.long_name;
          }
          if (administrativeAreaIndex > -1) {
            items.state = address[administrativeAreaIndex]?.long_name;
          }
          if (localityIndex > -1) {
            items.city = address[localityIndex]?.long_name;
          }
          if (countryIndex > -1) {
            items.country = address[countryIndex]?.long_name;
          }
          const heheheh = {
            address: place.formatted_address,
            country: items?.country,
            state: items?.state,
            city: items?.city,
            postal_code: items?.postal_code,
          } as any;
          const errors = form.getFieldsError();
          if (errors.length) {
            form?.setFields(
              errors.flatMap((res: any) => {
                if (!(res.name[0] in heheheh)) return [];
                console.log(
                  !!heheheh[res.name[0]],
                  heheheh[res.name[0]],
                  heheheh,
                  res.name
                );
                return {
                  name: res.name,
                  errors: !!heheheh[res.name[0]]
                    ? []
                    : [
                      `Please enter ` +
                      res.name[0].toString().replace("_", " "),
                    ],
                };
              })
            );
          }
          console.log(items);

          form?.setFieldValue("house_no", place.formatted_address);
          form?.setFieldValue("country", items?.country);
          form?.setFieldValue("state", items?.state);
          form?.setFieldValue("city", items?.city);
          form?.setFieldValue("pin_code", items?.postal_code);
          // form?.setFieldValue("lat", coordinate?.lat());
          // form?.setFieldValue("lng", coordinate?.lng());
        }

        if (!coordinate?.lat() || !coordinate?.lng()) {
          Toast.warning("Please select a valid location from the autocomplete");
        } else {
          form?.setFieldValue("lat", coordinate?.lat());
          form?.setFieldValue("lng", coordinate?.lng());
        }
      });
    }
  };

  React.useEffect(() => {
    runTry(() => {
      setTimeout(() => {
        initPlaceAPI();
      }, 0);
    });
  }, []);

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
            <Col span={24} >
                <FormItem name='street_address'>
                  {/* <Input onFocus={(e) => e.target.select()} name='address' ref={(ref: any) => placeInputRef.current = ref} placeholder='Address' /> */}
                  <Input
          className="custom-input"
          name="address"
          ref={(ref:any) => (placeInputRef.current = ref)}
          id="Address"
          placeholder="Enter your address"
        />
                </FormItem>
              </Col>
              {/* <Col span={24}>
                    <FormItem name={`end_point`} rules={[{ message: 'Please enter end point', required: true }]}>
                      <Input placeholder='End point' />
                    </FormItem>
                  </Col> */}
              <Col span={24} >
                <FormItem name='street_address1'>
                  <Input onFocus={(e) => e.target.select()} name='address' ref={(ref: any) => placeInputRef.current = ref} placeholder='Address' />
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
