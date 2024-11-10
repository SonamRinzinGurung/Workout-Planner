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

axiosFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (
      error?.response.status === 401 &&
      error?.response.data.msg === "Token is not valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
);

export default axiosFetch;
