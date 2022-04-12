import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import config from './config.js'

const db = getFirestore(initializeApp(config.firebaseConfig));
export default db;