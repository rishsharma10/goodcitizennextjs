import {
  COMPANY_ADMIN,
  MEMBER,
  SUPER_ADMIN,
  TEAM_ADMIN,
} from "@/context/actionTypes";

var EmailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var UserNameRegEx = /^[a-zA-Z_]{0,60}$/;
var NumericNumberRegEx = /^[0-9]{0,20}$/;
var NumericResultRegEx = /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/;
var NameRegEx = /^[a-zA-Z \s()-]{0,60}$/;
var NumberRegEx = /^[0]?[789]\d{9}$/;
var IndNumberRegEx = /^((\+91)?|91)?[789][0-9]{9}/;
var PincodeRegEx = /^\d{6}$/;
var LatLngRegEx = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
var GstRegEx = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
var CountryRegEx = "India";
var UUIDRegEx =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;
var strongPasswordRegEx =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,16}$/;
var domainRegex = /^(?!:\/\/)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z0-9-]{2,}$/;
const email = (email: string) => {
  if (email.includes("+")) {
    return false;
  }
  return EmailRegEx.test(String(email).toLowerCase());
};
const numberDataTypeValidation = (str: string) => {
  return typeof str === "number";
};
const nameValidation = (str: string) => {
  if (str) {
    return NameRegEx.test(String(str).trim());
  }
  return false;
};
const UserNameValidation = (str: string) => {
  return UserNameRegEx.test(String(str).trim());
};
const MobileNumberValidation = (str: string) => {
  return NumberRegEx.test(str);
};
const NumberValidation = (str: string) => {
  return NumericNumberRegEx.test(str);
};
const ResultValidation = (str: string) => {
  return NumericResultRegEx.test(str);
};
const MobileNumberWithInValidation = (str: string) => {
  return IndNumberRegEx.test(str);
};
const FoodLicenseValidation = (str: string) => {
  // return FoodLicenseRegEx.test(str);
  return str;
};
const DrugLicenseValidation = (str: string) => {
  // return DrugLicenseRegEx.test(str);
  return str;
};
const GstValidation = (str: string) => {
  return GstRegEx.test(str);
};
export const textSlice = (string: string,screens:any) => {
  const length = screens.xxl ? 25 :screens?.md ? 10 : screens.sm ? 10 : 10
  return (
    string?.length >  length ? `${string?.slice(0,length)}...`:string
  );
};
const AddressValidation = (str: string) => {
  // return (String(str).length > 10) ? AddressRegEx.test(str) : false
  return String(str).trim().length > 10 ? str : false;
};
const PincodeValidation = (str: string) => {
  return PincodeRegEx.test(str);
};
const LatLngValidation = (str: string) => {
  return LatLngRegEx.test(str);
};
const CountryValidation = (str: string) => {
  return str === CountryRegEx;
};
const UuidValidation = (str: string) => {
  return UUIDRegEx.test(str);
};

const StringValidation = (str: string) => {
  return typeof str === "undefined"
    ? false
    : String(str).trim().length >= 3
    ? nameValidation(str)
    : false;
};
const ObjectValidation = (str: string) => {
  return typeof str === "object";
};
const LengthValidation = (str: string, length: number) => {
  return String(str).trim().length > length;
};

const strongPassword = (str: string) => {
  return strongPasswordRegEx.test(str);
};
const domainCheck=(str:string)=>{
  return strongPasswordRegEx.test(str)
}
export const stringReplace = (str: string) => {
  let newStr = str?.toLocaleLowerCase();
  return newStr?.replace(/ /g, "-");
};

const roundOffCeil = (count: number, limit: number) => {
  const RoundLimit = count / limit;
  const totalPage = Math.ceil(RoundLimit);
  return totalPage;
};
const showPrice = (price: number) => {
  var parts = price?.toFixed(2)?.toString();
  parts = parts?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts;
};
export const formatPricer = (number: number) => {
  if (number > 1000) {
    const formatter = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return formatter.format(number);
  } else {
    return `$${number}`;
  }
};
export const formatPrice = (num: number) => {
  if (num >= 1e9) {
    const rounded = (num / 1e9).toFixed(1);
    return `${rounded}B`;
  } else if (num >= 1e6) {
    const rounded = (num / 1e6).toFixed(1);
    return `${rounded}M`;
  } else if (num >= 1000) {
    const rounded = Math.round(num / 100) / 10;
    return `${rounded}K`;
  } else {
    return `${Number(num?.toString()).toFixed(2)}`;
  }
};
export const capitalizeFirstLetter = (string: any) => {
  const lower = string?.toLowerCase();
  return (
    string?.charAt(0)?.toUpperCase() + lower?.slice(1)?.split("_")?.join(" ")
  );
};
export const imgFormatGoogle = (name: string) => {
  if (String(name)?.startsWith(`https://`)) {
    return name;
  } else {
  }
};

export const uppercaseWords = (str: string) =>
  str
    ?.split("_")
    ?.join(" ")
    ?.toLowerCase()
    ?.replace(/^(.)|\s+(.)/g, (c) => c?.toUpperCase());
export const generateRandomString = () => {
  const prefix = "CR";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = prefix;

  for (let i = prefix.length; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

export const getRoleForUrl = (role: string) => {
  if (role == SUPER_ADMIN) {
    return "admin";
  } else if (role == COMPANY_ADMIN) {
    return "company";
  } else if (role == TEAM_ADMIN) {
    return "team";
  } else if (role == MEMBER) {
    return "member";
  } else {
    return role;
  }
};
export const getTypeForUrl = (role: string) => {
  if (role?.startsWith("/admin")) {
    return "SUPER_ADMIN";
  } else if (role?.startsWith("/company")) {
    return "COMPANY_ADMIN";
  } else if (role?.startsWith("/team")) {
    return "TEAM_ADMIN";
  } else if (role?.startsWith("/member")) {
    return "MEMBER";
  } else {
    return role;
  }
};
export const formatString = (str:string) => {
  return str
      ?.toLowerCase()  // Convert the entire string to lowercase
      ?.replace(/_/g, ' ')  // Replace underscores with spaces
      ?.replace(/\b\w/g, char => char?.toUpperCase());  // Capitalize the first letter of each word
}

const crumbValidations = {
  roundOffCeil,
  stringReplace,
  email,
  domainCheck,
  numberDataTypeValidation,
  nameValidation,
  UserNameValidation,
  capitalizeFirstLetter,
  MobileNumberValidation,
  NumberValidation,
  ResultValidation,
  MobileNumberWithInValidation,
  FoodLicenseValidation,
  DrugLicenseValidation,
  GstValidation,
  AddressValidation,
  PincodeValidation,
  LatLngValidation,
  CountryValidation,
  UuidValidation,
  StringValidation,
  ObjectValidation,
  LengthValidation,
  strongPassword,
  showPrice,
  strongPasswordRegEx,
};
export default crumbValidations;
