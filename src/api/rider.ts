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
      return response.data.data.riders;
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

interface NearByRidersQueryParams {
  lng?: number;
  lat?: number;
  distanceInKM?: number;
  orderId?: string;
}

export const useGetNearByRidersQuery = (
  { lng, lat, distanceInKM, orderId }: NearByRidersQueryParams = {},
  options: { skip?: boolean } = {}
) => {
  const result = useQuery({
    queryKey: ["nearby-riders", { lng, lat, distanceInKM, orderId }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (lng) params.append("lng", lng.toString());
      if (lat) params.append("lat", lat.toString());
      if (distanceInKM) params.append("distanceInKM", distanceInKM.toString());
      if (orderId) params.append("orderId", orderId);
      const response = await https.get(`/rider/nearby-working?${params.toString()}`);
      return response.data.data;
    },
    enabled: !options.skip,
  });
  return { isLoading: result.isPending, data: result.data, result };
};

export const useGetSingleRiderByIdQuery = (riderId: string | string[]) => {
  return useQuery<IRiderCredentials, Error>({
    queryKey: ["singleRider", riderId],
    queryFn: async () => {
      const response = await https.get(`/rider/${riderId}`);
      return response.data.data.order;
    },
    enabled: Boolean(riderId),
  });
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
