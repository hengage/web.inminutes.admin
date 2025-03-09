import { useMutation } from "@tanstack/react-query";

import https from "@/lib/axios";

export const useLoginMutation = () => {
  const {
    isPending: isLoading,
    mutate: loginMutation,
    data,
  } = useMutation({
    mutationFn: async (data: LoginCredentials) => {
      const response = await https.post("/auth/login/request", data);
      return response.data;
    },
  });
  return { loginMutation, isLoading, data };
};

export const useVerifyOtpMutation = () => {
  const { isPending: isLoading, mutate: verifyOtpMutation } = useMutation({
    mutationFn: async (data: OtpCredentials) => {
      const response = await https.post("/auth/login/confirm", data);
      return response.data;
    },
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
    },
  });
  return { verifyOtpMutation, isLoading };
};

interface LoginCredentials {
  email: string;
}

interface OtpCredentials {
  email: string;
  otp: string;
}
