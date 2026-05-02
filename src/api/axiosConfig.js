import axios from "axios";

const api = axios.create({
  baseURL: "https://leighton-jubate-unpenuriously.ngrok-free.dev",
  withCredentials: true
});


export default api;
