import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAJB89IbILQu7pD4YWmwGKNaul121wOKBI",
  authDomain: "good--citizen.firebaseapp.com",
  projectId: "good--citizen",
  storageBucket: "good--citizen.firebasestorage.app",
  messagingSenderId: "590150775885",
  appId: "1:590150775885:web:f068191134a27467911804",
  measurementId: "G-XS0JSZ2P99"
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
        vapidKey: `BJQFl756KDDQOf00sOrjCSstf0q1EszeuH3MTpoUizkRANM4Bzf4dZBrsQ5H0Fcq-5L5WkaNxpkgH3Yz2ppT1_k`,
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