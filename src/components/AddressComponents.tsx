import React, { useEffect, useState } from 'react'
import { AntForm, Button, Col, Divider, FormItem, Input, Row, Select, SelectOption, Space, TypographyText, TypographyTitle } from '@/lib/AntRegistry'
import Image from 'next/image'
import Check from '@/assets/icon/successful.svg'
import { GlobalContext } from '@/context/Provider'
import { useRouter } from 'next/router'
import { Form, Spin, Input as AntInput } from 'antd'
import CountryCode from '@/utils/CountryCode.json'
import { Option } from 'antd/lib/mentions'

const AddressComponents = ({ placeholder, type, state, setState, value, name }: any) => {
    const { userInfo, Toast, setUserInfo, setLoading, loading } = React.useContext(GlobalContext)
    const router = useRouter()
    const [shortCountryName, setShortCountryName] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [form] = Form.useForm()
    const placeInputRef = React.useRef(null as any)


    function loadGoogleMapScript(callback: any) {
        if (
            typeof (window as any).google === "object" &&
            typeof (window as any).google.maps === "object"
        ) {
            callback();
        } else {
            const googleMapScript = document.createElement("script");
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBioMK31w2-759jRzfev6Tpkdj9pe2eKrw&libraries=places`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener("load", callback);
        }
    }
    console.log(lat, lng, 'lnnnnn');

    const initPlaceAPI = () => {
        loadGoogleMapScript(() => {
            if (placeInputRef) {
                let autocomplete = new (window as any).google.maps.places.Autocomplete(placeInputRef?.current?.input, {
                    componentRestrictions: { country: "IN" }, // Restrict to USA
                    types: ["geocode"], // Limit to geographic locations
                });
                new (window as any).google.maps.event.addListener(
                    autocomplete,
                    "place_changed",
                    () => {
                        let place = autocomplete.getPlace();
                        let formatAddress = place.formatted_address;
                        const address = place.address_components;
                        console.log(place, 'placeplace');

                        let lat = place.geometry?.location.lat();
                        let lng = place.geometry?.location.lng();
                        setLat(lat);
                        setLng(lng);
                        // console.log(address, 'address');

                        // Extract the city name
                        const allowedCities = ["Chandigarh", "Panchkula", "Sahibzada Ajit Singh Nagar"];
        let cityName = "";
        place.address_components.forEach((component: any) => {
            if (component.types.includes("locality") || component.types.includes("administrative_area_level_3")) {
                cityName = component.long_name;
            }
        });

        console.log("Selected City:", cityName);

        // Restrict selection to allowed cities
        if (!allowedCities.includes(cityName)) {
            Toast.warning(`Only Chandigarh, Panchkula, and Mohali locations are allowed.`);
            placeInputRef.current.value = ""; // Clear input if location is not allowed
            return;
        }


                        let items: any = {};
                        if (Array.isArray(address) && address.length > 0) {
                            let zipIndex = address.findIndex((res) =>
                                res.types.includes("postal_code")
                            );
                            let administrativeAreaIndex = address.findIndex((res) =>
                                res.types.includes("administrative_area_level_1", "political")
                            );
                            let localityIndex = address.findIndex((res) =>
                                res.types.includes("locality", "political")
                            );
                            let countryIndex = address.findIndex((res) =>
                                res.types.includes("country", "political")
                            );
                            let premiseIndex = address.findIndex((res) =>
                                res.types.includes("premise", "street_number")
                            );
                            if (zipIndex > -1) {
                                items.pin_code = address[zipIndex].long_name;
                            }
                            if (administrativeAreaIndex > -1) {
                                items.state = address[administrativeAreaIndex].long_name;
                            }
                            if (localityIndex > -1) {
                                items.city = address[localityIndex].long_name;
                            }
                            if (countryIndex > -1) {
                                items.country = address[countryIndex].long_name;
                            } if (countryIndex > -1) {
                                items.shortCountryName = address[countryIndex].short_name;
                            }
                            if (premiseIndex > -1) {
                                items.apartment_number = address[premiseIndex].long_name;
                            }
                            items.full_address = formatAddress;
                            if (type == "START") {
                                setState({
                                    latitude: lat,
                                    longitude: lng,
                                    full_address: items.full_address
                                })
                                form.setFieldValue(name, items?.full_address)
                            } else {
                                setState({
                                    latitude: lat,
                                    longitude: lng,
                                    full_address: items.full_address
                                })
                                form.setFieldValue(name, items?.full_address)
                            }
                            // setShortCountryName(items.shortCountryName)
                            // console.log(items.city, "cityy");
                            // form.setFieldValue('city', items.city)
                            // form.setFieldValue('street_address', items.full_address)
                            // form.setFieldValue('country', items.country)
                            // form.setFieldValue('state', items.state)
                        }
                    }
                );
            }
        });
    };
    useEffect(() => { initPlaceAPI() }, []);
    console.log(value, "valueee")

    return (
        <>
            <AntForm form={form}>
                <FormItem name={name}>
                    <AntInput size='large' value={value} onFocus={(e) => e.target.select()} name='address' ref={(ref: any) => placeInputRef.current = ref} placeholder={placeholder} />
                </FormItem>
            </AntForm>

        </>

    )
}

export default AddressComponents