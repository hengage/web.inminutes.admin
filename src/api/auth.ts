import { useMutation, useQuery } from "@tanstack/react-query";

import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { IListItem } from "@/types";

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

export const useCreateAdminMutation = () => {
  const { isPending: isLoading, mutate: createAdminMutation } = useMutation<
    VerifyResponse["admin"],
    Error,
    ICreateAdmin
  >({
    mutationFn: async (data) => {
      const response = await https.post("/auth", data);
      return response.data.data;
    },
  });
  return { createAdminMutation, isLoading };
};

export const useGetRolesQuery = () => {
  const { isPending: isLoading, data } = useQuery<IListItem[], Error>({
    queryKey: [QUERY_KEYS.ROLES],
    queryFn: async () => {
      const response = await https.get("/auth/roles");
      return response.data.map((role: string) => ({ label: role, value: role }));
    },
  });
  return { isLoading, data };
};

interface LoginCredentials {
  email: string;
}

interface OtpCredentials {
  email: string;
  otp: string;
}

export interface ICreateAdmin {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface VerifyResponse {
  admin: {
    _id: string;
    email: string;
    otp: string;
  };
  token: string;
}
