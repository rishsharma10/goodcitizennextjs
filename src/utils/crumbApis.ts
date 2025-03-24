import _superagent, { search } from "superagent";
const SuperagentPromise = require("superagent-promise");
const superagent = SuperagentPromise(_superagent, global.Promise);

// export const API_ROOT = "https://copper-crumb.wloper.com/api/";
// export const BUCKET_ROOT = "https://copper-crumb.wloper.com/public/storage/products/";

export const API_ROOT = "http://localhost:3001/v1/";
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
  login: (info: any) => requests.post("app/login", info),
  signUp: (info: any) => requests.post("app/signup", info),
  verifyOtp: (info: any) => requests.patch("app/verify/otp", info),
};
const Driver = {
  startRide: () => requests.get("driver/start-ride"),
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
  Driver,
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
