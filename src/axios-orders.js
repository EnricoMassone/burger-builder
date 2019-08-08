import axios from "axios";

const firebaseDbUrl = process.env.REACT_APP_FIREBASE_DB_URL;
const instance = axios.create({
  baseURL: firebaseDbUrl
});

export default instance;