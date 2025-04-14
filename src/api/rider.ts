import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { ILocation, IPaginationData, IRating } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetRidersQuery = (filter: unknown) => {
  const result = useQuery<IPaginationData<Pick<IRider, "fullName" | "phoneNumber">>, Error>({
    queryKey: [QUERY_KEYS.VENDORS],
    queryFn: async () => {
      const response = await https.get(
        "/rider/list" + `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data.vendors;
    },
    enabled: Object.entries(filter as Record<string, string | string[] | number>).length > 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (data: any) => ({
      data: data.docs,
      total: data.totalDocs,
      page: data.page,
      limit: data.limit,
      totalPages: data.pagingCounter,
    }),
  });
  return { isLoading: result.isPending, data: result.data, result };
};

export const useCreateRiderMutation = () => {
  const result = useMutation<unknown, Error, IRiderCredentials>({
    mutationFn: async (data) => {
      const response = await https.post("/vendor/register", data);
      return response.data.data;
    },
  });
  return result;
};

export const useUpdateVendorMutation = (vendorId: string) => {
  const result = useMutation<unknown, Error, IRiderCredentials>({
    mutationFn: async (data) => {
      const response = await https.post(`/vendor/update/${vendorId}`, data);
      return response.data.data;
    },
  });
  return result;
};

export interface IRiderCredentials {
  businessName: string;
  businessLogo: string;
  email: string;
  phoneNumber: string;
  address: string;
  location: ILocation["coordinates"] | null;
  residentialAddress: string;
  category: string;
  subCategory?: string;
}

export interface IRider {
  _id: string;
  fullName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  location: ILocation;
  dateOfBirth: string;
  residentialAddress: string;
  currentlyWorking: false;
  rating: IRating;
  createdAt: string;
  approvalStatus: string;
  accountStatus: string;
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  subcategoryCount?: string;
  vendorCount?: string;
}
