// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.

// importScripts(
//   "https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js"
// );

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//   apiKey: "AIzaSyBsBNX84OqY8p7o8PDc1_noqercPiGRtdU",
//   authDomain: "sweet-play.firebaseapp.com",
//   databaseURL: "https://sweet-play-default-rtdb.firebaseio.com",
//   projectId: "sweet-play",
//   storageBucket: "sweet-play.appspot.com",
//   messagingSenderId: "625968247315",
//   appId: "1:625968247315:web:8648b99cf47adabffcc5e6",
//   measurementId: "G-4XCSE2RH82",
//   databaseURL: "https://sweet-play-default-rtdb.firebaseio.com",
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.

// const messaging = firebase.messaging();
// messaging.onMessage((payload) => {
//   console.log(payload);
// });
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/img/logo.svg",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
