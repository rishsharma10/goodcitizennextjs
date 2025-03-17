import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBMO0jYTKNlkYisZDzFCcjdgZl7dakgnZ4",
    authDomain: "goodcitizenwebdemo.firebaseapp.com",
    projectId: "goodcitizenwebdemo",
    storageBucket: "goodcitizenwebdemo.firebasestorage.app",
    messagingSenderId: "485129384065",
    appId: "1:485129384065:web:ab5710fe91ac1dff6edd80",
    measurementId: "G-3EHFJ9DR5R"
  };

let app: any;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
}
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
export const getFirebaseMessageToken = async () => {
  let isSupport = await isSupported();
  if (isSupport) {
    const messaging = getMessaging(app);
    try {
      let tokenId = await getToken(messaging, {
        vapidKey: `BKOHMWz4Wj9-vJ338k26CQZ9syw2q9UEVxjy_Do0x0k2tGvHEZmOJUUFsZfY-c53KJLkeiFEbiDIfv7E6TEd3js`,
      });
      return { tokenId };
    } catch (error) {
      return { error };
    }
  } else {
    return { error: " Notification Not Supported" };
  }
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    console.log(messaging, 'messageListener');
    onMessage(messaging, (payload) => {
      console.log(payload, 'payload');
      resolve(payload);
    });
  });
export default app