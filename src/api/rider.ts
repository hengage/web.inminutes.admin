import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { ILocation, IPaginationData, IRating } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderRow } from "./order";
import { ErrandRow } from "./errand";
import { RiderData } from "@/lib/validators/rider";

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
    queryKey: [QUERY_KEYS.RIDERS, filter],
    queryFn: async () => {
      const response = await https.get(
        "/riders" + `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
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
export const useGetRidersApplicationQuery = (
  filter: Record<string, string | string[] | number>
) => {
  const result = useQuery<
    IPaginationData<
      Pick<
        IRider,
        "_id" | "fullName" | "email" | "displayName" | "email" | "currentlyWorking" | "phoneNumber"
      >
    >,
    Error
  >({
    queryKey: [QUERY_KEYS.RIDERS, filter],
    queryFn: async () => {
      const response = await https.get(`/riders${stringifyQuery(filter)}`);
      return response.data.data.riders;
    },
    enabled: Object.entries(filter).length > 0,
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
  const result = useMutation<unknown, Error, RiderData>({
    mutationFn: async (data) => {
      const response = await https.post("/rider/register", data);
      return response.data.data;
    },
  });
  return result;
};

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
      const response = await https.get(`/riders/nearby-working?${params.toString()}`);
      return response.data.data;
    },
    enabled: !options.skip,
  });
  return { isLoading: result.isPending, data: result.data, result };
};

export const useGetSingleRiderByIdQuery = (riderId: string | string[]) => {
  return useQuery({
    queryKey: ["singleRider", riderId],
    queryFn: async () => {
      const response = await https.get(`/riders/${riderId}`);
      return response.data.data?.rider;
    },
    enabled: Boolean(riderId),
  });
};

export const useGetRiderWalletQuery = (riderId: string | string[]) => {
  return useQuery({
    queryKey: ["rider-deliveries", riderId],
    queryFn: async () => {
      const response = await https.get(`/riders/${riderId}/wallet`);
      return response.data.data;
    },
    enabled: Boolean(riderId),
  });
};

export const useGetOrdersQuery = (
  filter: Record<string, string | string[] | number>,
  riderId: string | string[]
) => {
  const result = useQuery<IPaginationData<OrderRow>, Error>({
    queryKey: ["riders_order", filter, riderId],
    queryFn: async () => {
      const riderParam = `rider=${riderId}`;
      let filterString = stringifyQuery(filter);
      if (filterString.startsWith("?")) {
        filterString = filterString.replace("?", "&");
      } else if (filterString && !filterString.startsWith("&")) {
        filterString = `&${filterString}`;
      }
      const url = `/orders?${riderParam}${filterString}`;
      const response = await https.get(url);
      return response.data.data.orders;
    },
    enabled: Object.entries(filter).length > 0,
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

export const useGetErrandQuery = (
  filter: Record<string, string | string[] | number>,
  riderId: string | string[]
) => {
  const result = useQuery<IPaginationData<ErrandRow>, Error>({
    queryKey: [QUERY_KEYS.ERRANDS, filter],
    queryFn: async () => {
      const riderParam = `rider=${riderId}`;
      let filterString = stringifyQuery(filter);
      if (filterString.startsWith("?")) {
        filterString = filterString.replace("?", "&");
      } else if (filterString && !filterString.startsWith("&")) {
        filterString = `&${filterString}`;
      }
      const url = `/errands?${riderParam}${filterString}`;
      const response = await https.get(url);
      return response.data.data.errands;
    },
    enabled: Object.entries(filter).length > 0,
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

export const useGetWorkAreaQuery = () => {
  return useQuery({
    queryKey: ["work-area"],
    queryFn: async () => {
      const response = await https.get(`/riders/work-areas`);
      return response.data.data;
    },
  });
};

export const useGetSessionQuery = (date: string | string[], workAreaId: string | string[]) => {
  return useQuery({
    queryKey: ["rider-work-area", date, workAreaId],
    queryFn: async () => {
      const response = await https.get(`/riders/work-areas/${workAreaId}/sessions?date=${date}`);
      return response.data.data?.timeSlots;
    },
    enabled: Boolean(workAreaId) && Boolean(date),
  });
};

export const useGetSessionRiderQuery = (
  sessionId: string | string[],
  workAreaId: string | string[]
) => {
  return useQuery({
    queryKey: ["rider-work-area", sessionId, workAreaId],
    queryFn: async () => {
      const response = await https.get(
        `/riders/work-areas/${workAreaId}/sessions/${sessionId}/riders`
      );
      return response.data.data.bookedRiders;
    },
    enabled: Boolean(sessionId) && Boolean(workAreaId),
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
  currentlyWorking: boolean;
  rating: IRating;
  createdAt: string;
  approvalStatus: string;
  accountStatus: string;
}

export interface Rider {
  _id?: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
  profileImage?: string;
  totalOrders?: number;
  totalErrands?: number;
  lastUpdate?: string;
  status?: string;
  dateOfBirth?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  residentialAddress?: string;
  currentlyWorking?: boolean;
  accountStatus?: string;
  approvalStatus?: string;
  isDeleted?: boolean;
  location?: {
    coordinates: [number, number];
  };
  rating: IRating;
  totalDeliveries: number | string;
}
