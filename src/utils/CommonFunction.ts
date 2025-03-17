import { NextRouter } from "next/router"
import crumbApi from "./crumbApis"
import React from "react"

export const ImageUploadApi = async (key: string, image: any) => {
    // debugger
    let apiRes: any
    let err: any
    try {
        apiRes = await crumbApi.Common.uploadFile(key, image)
    } catch (error) {
        err = error
    } finally {
        return { filename: apiRes?.file_name, message: apiRes?.message || err?.response?.body?.message }
    }
}



export const uploadImages = async (files: Array<{ file: any, name: string, cover_image?: boolean, loading: boolean }>, handleError: (message: string) => void) => {
    const rowData = [] as Array<{
        index: number,
        cover_image: boolean,
        name: string
    }>
    // let selected = [...files]
    // let imageError = false
    return await Promise.all(
        files.map(async (imageRes: any, index) => {
            if (typeof imageRes?._id === 'string') {
                // rowData.push({
                //     index: index,
                //     cover_image: imageRes?.cover_image,
                //     name: imageRes.name
                // })
                return { name: imageRes.name, cover_image: imageRes?.cover_image }
            } else {
                const apiRes = await ImageUploadApi('file', imageRes.file)
                if (!apiRes.filename) {
                    // imageError = true
                    return index + 1
                } else {
                    return { name: apiRes.filename, cover_image: imageRes.cover_image }
                }

            }
        })
    )
    // if (imageError) return ''
    // return rowData?.sort((a, b) => a.index - b.index).map((res) => { return { name: res.name, cover_image: res?.cover_image, } })
}
export const onKeyDownPrevent = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
        keyEvent.preventDefault();
    }
}
export const querySearch = (name: string, value: any, router: NextRouter) => {

    let [url] = router.asPath.split("?")
    let oldQuery = {} as any;
    if (typeof value !== 'object') {
        oldQuery = router.query
    } else {
        console.log('value', value);

        Object.entries({ ...router.query, ...value }).forEach(([key, value]) => {
            if (value) {
                oldQuery[key] = value
            }
        })
    }
    if (typeof value !== 'object' && value) {
        oldQuery[name] = value
    } else {
        delete oldQuery[name]
    }

    let redirect = { pathname: !isNaN(+url.slice(-1)) ? `${url.slice(0, -1)}1` : url, query: { ...oldQuery } } as any
    if (!router.pathname.includes('page')) {
        delete redirect['pathname']
    } else {
        delete redirect.query['page']
    }
    router.push(redirect)
}


export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
    // State and setters for debounced value
    React.useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}
export const isEmpty = (value: any) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && (Array.isArray(value) ? value.length : Object.keys(value).length === 0)) ||
    (typeof value === 'string' && value.trim().length === 0);

export const numberConvertToReadable = (currency: string, n: number, d: number, screen: any) => {
    if (screen?.lg && n < 100000) return (currency === "USD" ? '$' : currency ? "£sd" : '') + ' ' + new Intl.NumberFormat("en-US").format(n)
    // if (screen?.lg && n < 100000) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format(n)

    let x = ('' + n).length, p = Math.pow
    d = p(10, d)
    x -= x % 3
    return (currency === "USD" ? '$' : currency ? "£sd" : '') + ' ' + Math.round(n * d / p(10, x)) / d + [" ", " K", " M", " B", " T", " Quad", " Quin"][x / 3]
}
export const numberConvertToArea = (areaSquare: number) => areaSquare < 43560 ? areaSquare + ' sqr ft.' : areaSquare < 107639 ? (areaSquare / 43560).toFixed(2) + ' acre' : (parseFloat
    (areaSquare.toString()) / 107639).toFixed(2) + ' hectare';
export const getCookie = (cname: string) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
