"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { toast, ToastOptions } from "react-toastify";

interface ToastContextType {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  };

  useEffect(() => {
    const handleOffline = () => {
      toast.error("Unable to connect. Please check your internet connection", {
        ...defaultOptions,
        position: "bottom-left",
        toastId: "offline-toast",
        autoClose: false,
      });
    };

    const handleOnline = () => {
      toast.dismiss("offline-toast");
      toast.success("Internet connection restored", {
        ...defaultOptions,
        position: "bottom-left",
        toastId: "online-toast",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const showSuccess = (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaultOptions, ...options });

  const showError = (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaultOptions, ...options });

  const showInfo = (message: string, options?: ToastOptions) =>
    toast.info(message, { ...defaultOptions, ...options });

  const showWarning = (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...defaultOptions, ...options });

  const contextValue = useMemo(() => ({ showSuccess, showError, showInfo, showWarning }), []);

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
