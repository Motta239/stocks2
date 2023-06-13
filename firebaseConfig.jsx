import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNdKAM88Buf6xhxCMo8olC0vlOHsX4hZc",
  authDomain: "stocks-b36a6.firebaseapp.com",
  projectId: "stocks-b36a6",
  storageBucket: "stocks-b36a6.appspot.com",
  messagingSenderId: "619848504907",
  appId: "1:619848504907:web:2bfa02c2867cf765151fce",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCihGRTCo0_smyRaNAmjs3O4b5i9BuSK80",
//   authDomain: "stocks2-711d1.firebaseapp.com",
//   projectId: "stocks2-711d1",
//   storageBucket: "stocks2-711d1.appspot.com",
//   messagingSenderId: "46424592008",
//   appId: "1:46424592008:web:6d1a3f3238bba49944993d",
// };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
