import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  get,
  set,
  child,
} from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBsBNX84OqY8p7o8PDc1_noqercPiGRtdU",
  authDomain: "sweet-play.firebaseapp.com",
  databaseURL: "https://sweet-play-default-rtdb.firebaseio.com",
  projectId: "sweet-play",
  storageBucket: "sweet-play.appspot.com",
  messagingSenderId: "625968247315",
  appId: "1:625968247315:web:8648b99cf47adabffcc5e6",
  measurementId: "G-4XCSE2RH82",
  databaseURL: "https://sweet-play-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const messaging = {
  msg: getMessaging(app),
  getToken: getToken,
};

// onMessage((payload) => {
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

export const fire = {
  dbRef,
  onValue,
  get,
  child,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  set,
};
