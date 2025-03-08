import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const https: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

// Extend Axios request config to include custom properties
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  intercept?: boolean;
}

https.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const { intercept = true } = config;
  if (!intercept) return config;

  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = token;

  return config;
});

export default https;
