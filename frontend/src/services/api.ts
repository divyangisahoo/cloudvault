import axios from "axios";

const API = axios.create({
  baseURL: "http://13.234.113.197:8000"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.token = token;
  }
  return req;
});

export default API;
