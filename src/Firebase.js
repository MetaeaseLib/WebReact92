import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDikVPfth0oUoe6Yl4Q2NjqxaMG0ajpgM",
  authDomain: "metaeasegitwebapi01.firebaseapp.com",
  projectId: "metaeasegitwebapi01",
  storageBucket: "metaeasegitwebapi01.appspot.com",
  messagingSenderId: "936475463598",
  appId: "1:936475463598:web:fd308c120ce06473a8023f",
  measurementId: "G-T0PX4WSRY5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .catch((error) => {console.log(error)})
};

export const projectId = firebaseConfig.projectId;

// If you want to add a handler.
//
//export const signInWithGoogle = (handler) => {
//  return () => {
//    signInWithPopup(auth, provider).then(handler)
//    .catch((error) => {console.log(error)})
//  };
//};
