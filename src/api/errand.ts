import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IPaginationData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "query-string";

export const useGetSingleErrandQuery = (errandId: string) => {
  return useQuery({
    queryKey: ["singleErrand", errandId],
    queryFn: async () => {
      const response = await https.get(`/errand/${errandId}`);
      const data = response?.data?.data?.errand;
      return data;
    },
    enabled: !!errandId,
  });
};

export const useGetSingleErrandByIdQuery = (errandId: string | string[]) => {
  return useQuery<ErrandDetails, Error>({
    queryKey: ["singleErrand", errandId],
    queryFn: async () => {
      const response = await https.get(`/errands/${errandId}`);
      return response.data.data.errand;
    },
    enabled: Boolean(errandId),
  });
};

export const useGetErrandQuery = (filter: Record<string, string | string[] | number>) => {
  const result = useQuery<IPaginationData<ErrandRow>, Error>({
    queryKey: [QUERY_KEYS.ERRANDS, filter],
    queryFn: async () => {
      const response = await https.get(`/errands${stringifyQuery(filter)}`);
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

export const useGetOngoingErrandsQuery = (filter: Record<string, string | string[] | number>) => {
  const result = useQuery<IPaginationData<ErrandRow>, Error>({
    queryKey: ["errands", filter],
    queryFn: async () => {
      const queryWithOngoing = { ...filter, onlyOngoing: "true" };
      const queryStringified = qs.stringify(queryWithOngoing, {
        skipNull: true,
        skipEmptyString: true,
      });
      const url = `/errands${queryStringified ? `?${queryStringified}` : ""}`;
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

  return {
    isLoading: result.isPending,
    data: result.data,
    result,
  };
};

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

export const useReAssignErrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { errandId: string; data: { riderId: string | null } }>({
    mutationFn: async ({ errandId, data }) => {
      const response = await https.patch(`/errands/${errandId}/assign-rider`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};

export type ErrandRow = {
  index?: number;
  _id: string;
  customer?: Customer;
  type?: string;
  status: string;
  [key: string]: string | number | undefined | Customer;
};

interface Customer {
  _id: string;
  fullName: string;
}

interface Item {
  product: string;
  quantity: number;
  cost: string; // Stored as string in JSON, could be parsed to number if needed
  vendor: string;
  addOns: string[];
}

interface Vendor {
  businessName: string | null;
  fullName: string | null;
}

interface Receiver {
  phoneNumber: string | null;
  name: string | null;
}

interface Rider {
  fullName: string | null;
}

interface PickupCoordinates {
  coordinates: [number, number]; // [latitude, longitude]
}

interface DropoffCoordinates {
  coordinates: [number, number]; // [latitude, longitude]
}

export interface ErrandDetails {
  _id: string;
  customer: Customer;
  recipientPhoneNumber: string;
  rider: Rider | null;
  items: Item[];
  vendor: Vendor | null;
  receiver: Receiver | null;
  deliveryAddress?: string;
  instruction?: string;
  dropoffAddress: string;
  pickupCoordinates: PickupCoordinates;
  dropoffCoordinates: DropoffCoordinates;
  dispatchFee: string; // Stored as string in JSON
  serviceFee: string; // Stored as string in JSON
  totalProductsCost: string; // Stored as string in JSON
  totalCost: string; // Stored as string in JSON
  type: "instant" | "scheduled"; // Based on provided data
  status:
    | "pending"
    | "request confirmed"
    | "ready"
    | "active"
    | "in-transit"
    | "nearby"
    | "approved"
    | "arrived"; // Based on status array in original code
  createdAt: string | null; // ISO date string
  updatedAt: string | null; // ISO date string
}
