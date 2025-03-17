
const sliceStr = (str: string, count: number) => {
    return str.length > count ? `${str.slice(0, count)}....${str.slice(str.length - count, str.length)}` : str
}
const capitalizeFirstLetter = (string: string) => {
    if (string) {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    } else {
        return `_`
    }
}


const uiSettings = {
    sliceStr,
    capitalizeFirstLetter,
}

export default uiSettings