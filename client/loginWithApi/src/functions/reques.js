import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// request.interceptors.request.use(
//   (config) => {
//     const tok = JSON.parse(
//       JSON.parse(localStorage.getItem("persist:root"))?.user
//     )?.currentUser?.token;
//     if (tok) {
//       const token = `${tok}`;
//       config.headers["token"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
