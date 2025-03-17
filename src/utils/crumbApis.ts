import _superagent, { search } from "superagent";
const SuperagentPromise = require("superagent-promise");
const superagent = SuperagentPromise(_superagent, global.Promise);

// export const API_ROOT = "https://copper-crumb.wloper.com/api/";
// export const BUCKET_ROOT = "https://copper-crumb.wloper.com/public/storage/products/";

export const API_ROOT = "https://admin.copperandcrumb.in/api/";
export const BUCKET_ROOT = "https://copper-crumb.wloper.com/public/storage/products/";


export const CURRENCY = '₹'

export const PHONE_NUMBER_LINK = `919915708181`
export const INSTAGRAM_LINK = 'https://www.instagram.com/copperandcrumb.in/'
export const FACEBOOK_LINK = 'https://www.facebook.com'
export const WHATSPP_LINK = `https://api.whatsapp.com/send/?phone=${PHONE_NUMBER_LINK}&text=Hi, I have a quick question. Could you please help me with this? Thanks!&type=phone_number&app_absent=0`

const API_FILE_ROOT_MEDIUM = `${BUCKET_ROOT}/medium/`;
const API_FILE_ROOT_ORIGINAL = `${BUCKET_ROOT}/original/`;
const API_FILE_ROOT_SMALL = `${BUCKET_ROOT}/small/`;
const API_FILE_ROOT_AUDIO = `${BUCKET_ROOT}/audio/`;
const API_FILE_ROOT_VIDEO = `${BUCKET_ROOT}/video/`;
const API_FILE_ROOT_DOCUMENTS = `${BUCKET_ROOT}/documents/`;
const API_FILE_ROOT_DB_BACKUP = `${BUCKET_ROOT}/backup/`;
const API_FILE_ROOT_DOCS = `${BUCKET_ROOT}/docs/`;

const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;

let token: any = null;
const tokenPlugin = (req: any) => {
  if (token) {
    req.set("Authorization", `Bearer ${token}`);
  }
};

const requests = {
  // del: (url: string,body:any) =>
  //   superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  del: (url: string, body: any) =>
    superagent
      .del(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  delMultiple: (url: string, body: any) =>
    superagent
      .del(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  get: (url: string) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url: string, body: any) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url: string, body: any) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  file: (url: string, key: string, file: any) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .attach(key, file)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth = {
  login: (info: any) => requests.post("v1/login", info),
  signUp: (info: any) => requests.post("v1/register", info),
  validateCoupon: (info: any) => requests.post("v1/validate-coupon", info),
  updateAddress: (info: any) => requests.put("v1/update-profile-address", info),
  profile: () => requests.get(`v1/customer-details`),
  logout: () => requests.put("user/logout", {}),
  changePassword: (info: any) => requests.put("user/change/password", info),
  forgotPassword: (value: any) => requests.put("user/forget/password", value),
  resendOtp: (value: any) => requests.post("user/resend/email/otp", value),
  resendOtpPhone: (value: any) => requests.put("user/resend/phone/otp", value),
  verifyOtp: (info: any) => requests.post("user/otp/verify", info),
  verifyEmail: (info: any) => requests.post("user/verify/email", info),
  verifyPhone: (info: any) => requests.post("user/verify/phone", info),
  customerContact: (info: any) => requests.post("v1/customer/contact", info),
  newsletter: (info: any) => requests.post("v1/newsletter/subscribe", info),
};
const Product = {
  list: () => requests.get("v1/products"),
  popular: () => requests.get("v1/popular-products"),
  details: (id: any) => requests.get(`v1/product/${id}`),
}
const Category = {
  list: () => requests.get("v1/categories"),
  productList: (id: number) => requests.get(`v1/category-product/${id}`),
}
const Cart = {
  list: () => requests.get("v1/cart"),
  update: (info: any) => requests.post("v1/cart/add", info),
  add: (info: any) => requests.post("v1/cart/add", info),
  remove: (info: any) => requests.post("v1/cart/remove", info),
}

const Common = {
  uploadFile: (key: string, file: any) =>
    requests.file(`uploads/file`, key, file),
  uploadFileMultiple: (key: string, file: any) =>
    requests.file(`Upload/do_spaces_file_upload_multiple`, key, file),
  dbBackup: () => requests.post(`admin/db/backup`, {}),
  listing: (q?: string) => requests.get(`user/homepage${q ? "?" + q : ""}`),
};

const FILES = {
  audio: (filename: string) =>
    filename?.startsWith("http")
      ? filename
      : `${API_FILE_ROOT_AUDIO}${filename}`,
  video: (filename: string) =>
    filename?.startsWith("http")
      ? filename
      : `${API_FILE_ROOT_VIDEO}${filename}`,
  imageOriginal: (filename: string, alt: any) =>
    filename
      ? filename?.startsWith("http")
        ? filename
        : `${API_FILE_ROOT_ORIGINAL}${filename}`
      : alt,
  imageMedium: (filename: string, alt: any) =>
    filename
      ? filename?.startsWith("http")
        ? filename
        : `${API_FILE_ROOT_MEDIUM}${filename}`
      : alt,
  imageSmall: (filename: string, alt?: any) =>
    filename
      ? filename?.startsWith("http")
        ? filename
        : `${API_FILE_ROOT_SMALL}${filename}`
      : alt,
  document: (filename: string, alt?: any) =>
    filename
      ? filename?.startsWith("http")
        ? filename
        : `${API_FILE_ROOT_DOCUMENTS}${filename}`
      : alt,


  //
};

const crumbApi = {
  Auth,
  Product,
  Cart,
  Category,
  API_ROOT,
  API_FILE_ROOT_DB_BACKUP,
  API_FILE_ROOT_SMALL,
  API_FILE_ROOT_MEDIUM,
  API_FILE_ROOT_DOCS,
  API_FILE_ROOT_ORIGINAL,
  API_FILE_ROOT_VIDEO,
  API_FILE_ROOT_DOCUMENTS,
  Common,
  BUCKET_ROOT,
  FILES,
  token,
  encode,
  setToken: (_token?: string) => {
    token = _token;
  },
};

export default crumbApi;
