import { useMutation } from "@tanstack/react-query";

import https from "@/lib/axios";

export const useLoginMutation = () => {
  const { isPending, mutate: loginMutation } = useMutation({
    mutationFn: async () => {
      const response = await https.post<LoginCredentials>("/auth/login/request");
      return response.data;
    },
  });
  return { loginMutation, isPending };
};

export const useVerifyOtpMutation = () => {
  const { isPending, mutate: verifyOtpMutation } = useMutation({
    mutationFn: async () => {
      const response = await https.post<OtpCredentials>("/auth/login/confirm");
      return response.data;
    },
  });
  return { verifyOtpMutation, isPending };
};

interface LoginCredentials {
  email: string;
}

interface OtpCredentials {
  email: string;
  otp: string;
}
