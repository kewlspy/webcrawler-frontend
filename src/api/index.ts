import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
  headers: {
    Authorization: "Bearer dummy-token", // replace with real token later
  },
});

export default API;
