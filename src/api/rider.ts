import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { ILocation, IPaginationData, IRating } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetRidersQuery = (filter: unknown) => {
  const result = useQuery<
    IPaginationData<
      Pick<
        IRider,
        "_id" | "fullName" | "email" | "displayName" | "email" | "currentlyWorking" | "phoneNumber"
      >
    >,
    Error
  >({
    queryKey: [QUERY_KEYS.RIDERS],
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

// export const useCreateRiderMutation = () => {
//   const result = useMutation<unknown, Error, IRiderCredentials>({
//     mutationFn: async (data) => {
//       const response = await https.post("/vendor/register", data);
//       return response.data.data;
//     },
//   });
//   return result;
// };

// export const useUpdateVendorMutation = (vendorId: string) => {
//   const result = useMutation<unknown, Error, IRiderCredentials>({
//     mutationFn: async (data) => {
//       const response = await https.post(`/vendor/update/${vendorId}`, data);
//       return response.data.data;
//     },
//   });
//   return result;
// };

export const useGetNearByRidersQuery = () => {
  const result = useQuery({
    queryKey: ["nearby-riders"],
    queryFn: async () => {
      const response = await https.get(
        `/rider/nearby-working?lng=3.4013347&lat=6.5378218&distanceInKM=7.9`
      );
      return response.data.data;
    },
  });
  return { isLoading: result.isPending, data: result.data, result };
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
