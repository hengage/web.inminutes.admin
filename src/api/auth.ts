import { useMutation } from "@tanstack/react-query";

import https from "@/lib/axios";

export const useLoginMutation = () => {
  const {
    isPending: isLoading,
    mutate: loginMutation,
    data,
  } = useMutation<VerifyResponse["admin"], Error, LoginCredentials>({
    mutationFn: async (data) => {
      const response = await https.post("/auth/login/request", data);
      return response.data.data;
    },
  });
  return { loginMutation, isLoading, data };
};

export const useVerifyOtpMutation = () => {
  const { isPending: isLoading, mutate: verifyOtpMutation } = useMutation<
    VerifyResponse,
    Error,
    OtpCredentials
  >({
    mutationFn: async (data) => {
      const response = await https.post("/auth/login/confirm", data);
      return response.data.data;
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

interface VerifyResponse {
  admin: {
    _id: string;
    email: string;
    otp: string;
  };
  token: string;
}
