"use client";

import axios, { AxiosInstance } from "axios";
import { getCookie, setCookie } from "./cookies";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface DecodedToken {
  exp: number;
}

// Function to check if the token is expired
async function isTokenExpired(): Promise<boolean> {
  const token = await getCookie(process.env.NEXT_PUBLIC_SESSION_KEY!);
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return true;
  }
}

// async function refreshToken() {
//   try {
//     const response = await axiosInstance.post("/auth/refresh-token");
//     const newToken = response.data.token;

//     if (newToken) {
//       setCookie("bz-session", newToken);
//     }

//     return newToken;
//   } catch (error) {
//     console.error("Token refresh failed", error);
//     await logoutUser();
//     return null;
//   }
// }

async function logoutUser() {
  await setCookie(process.env.NEXT_PUBLIC_SESSION_KEY!, "");

  toast.error("Session expired. Please sign in again.", {
    toastId: "session-expired",
  });

  redirect("/");
}

// Create a base Axios instance
const createBaseAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor (checks token expiration)
  instance.interceptors.request.use(
    async (config) => {
      if (await isTokenExpired()) {
        console.warn("Token expired. Logging out user.");
        await logoutUser();
        return Promise.reject(new Error("Session expired. Please sign in again."));
      }

      const token = await getCookie(process.env.NEXT_PUBLIC_SESSION_KEY!);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) =>
      Promise.reject(
        new Error(error.response?.data?.message || "Something went wrong. Please try again.")
      )
  );

  instance.interceptors.response.use(
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

  // Response interceptor (handles token expiration)
  // instance.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     const token = await getCookie("bz-session");

  //     if (error.response?.status === 401 && !originalRequest._retry && token) {
  //       originalRequest._retry = true;
  //       const newToken = await refreshToken();
  //       if (newToken) {
  //         originalRequest.headers.Authorization = `${newToken}`;
  //         return instance(originalRequest);
  //       }
  //     }

  //     console.error("API Error:", error.response?.data || error.message);
  //     return Promise.reject(
  //       new Error(error.response?.data?.message || "Something went wrong. Please try again.")
  //     );
  //   }
  // );

  return instance;
};
const https = createBaseAxiosInstance(process.env.NEXT_PUBLIC_API_URL!);
export default https;
