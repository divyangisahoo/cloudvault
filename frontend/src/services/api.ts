import axios from "axios";

const API = axios.create({
  baseURL: "http://13.127.198.104:8000"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.token = token;
  }
  return req;
});

export default API;
