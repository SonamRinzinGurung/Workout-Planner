import axios from "axios";

const axiosFetch = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

axiosFetch.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosFetch;
