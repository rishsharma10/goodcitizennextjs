importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js")

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBMO0jYTKNlkYisZDzFCcjdgZl7dakgnZ4",
    authDomain: "goodcitizenwebdemo.firebaseapp.com",
    projectId: "goodcitizenwebdemo",
    storageBucket: "goodcitizenwebdemo.firebasestorage.app",
    messagingSenderId: "485129384065",
    appId: "1:485129384065:web:ab5710fe91ac1dff6edd80",
    measurementId: "G-3EHFJ9DR5R"
  };

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload?.data?.title
  const notificationOptions = {
    body: payload?.data?.message,
  }
})
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
     "[firebase-messaging-sw.js] Received background message ",
     payload,
  );
  // Customize notification here
  var notificationTitle = payload.data.title;  // Or `payload.notification` depending on what the payload is
  var notificationOptions = {
     body: payload.data.body,
     icon: 'https://processify-prod.s3.ap-southeast-2.amazonaws.com/uploads/original/logo_1728553559738_1728553559740.png',
     data: { url: 'https://staging.wellcarebnb.com/login' },  // The URL which we are going to use later
     actions: [{ action: "https://staging.wellcarebnb.com/", title: "Read Now" }],
  };

  return self.registration.showNotification(
     notificationTitle,
     notificationOptions,
  );
});