import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF1UdxgWUkJng_WQoXcVQVZ4PGivM04t4",
  authDomain: "ai-notion-88b37.firebaseapp.com",
  projectId: "ai-notion-88b37",
  storageBucket: "ai-notion-88b37.firebasestorage.app",
  messagingSenderId: "101701476642",
  appId: "1:101701476642:web:acb7f7ff34fdb8c87dc57b"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);