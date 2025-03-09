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

https.interceptors.response.use(
  (response) => response, // Pass successful responses unchanged
  (error) => {
    const { response } = error;

    // Default error message
    let errorMessage = "An unexpected error occurred. Please try again.";

    if (response) {
      // Extract message if available
      errorMessage = response.data?.message || errorMessage;
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out. Please try again.";
    }

    // Return a rejected promise with the extracted error message
    return Promise.reject(new Error(errorMessage));
  }
);

https.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const { intercept = true } = config;
  if (!intercept) return config;

  const token = sessionStorage.getItem("token");
  if (token) config.headers["Authorization"] = token;

  return config;
});

export default https;
