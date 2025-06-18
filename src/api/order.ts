import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IPaginationData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "query-string";

export const useGetDashboardOrdersQuery = (filter = {}) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, filter],
    queryFn: async () => {
      const response = await https.get("/orders" + `${stringifyQuery(filter)}`);
      return response.data.data.orders.docs;
    },
  });

  return {
    isLoading: result.isPending,
    data: result.data,
    error: result.error,
    result,
  };
};

export const useGetSingleOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: ["singleErrand", orderId],
    queryFn: async () => {
      const response = await https.get(`/orders/${orderId}`);
      const data = response?.data?.data?.order;
      return data;
    },
    enabled: !!orderId,
  });
};

export const useGetSingleOrderByIdQuery = (orderId: string | string[]) => {
  return useQuery<OrderDetails, Error>({
    queryKey: ["singleOrder", orderId],
    queryFn: async () => {
      const response = await https.get(`/orders/${orderId}`);
      return response.data.data.order;
    },
    enabled: Boolean(orderId),
  });
};

export const useGetOrdersQuery = (filter: Record<string, string | string[] | number>) => {
  const result = useQuery<IPaginationData<OrderRow>, Error>({
    queryKey: ["orders", filter],
    queryFn: async () => {
      const response = await https.get(`/orders${stringifyQuery(filter)}`);
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

export const useGetOngoingOrdersQuery = (filter: Record<string, string | string[] | number>) => {
  const result = useQuery<IPaginationData<OrderRow>, Error>({
    queryKey: ["orders", filter],
    queryFn: async () => {
      const queryWithOngoing = { ...filter, onlyOngoing: "true" };
      const queryStringified = qs.stringify(queryWithOngoing, {
        skipNull: true,
        skipEmptyString: true,
      });
      const url = `/orders${queryStringified ? `?${queryStringified}` : ""}`;
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

export const useReAssignOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { orderId: string; data: { riderId: string | null } }>({
    mutationFn: async ({ orderId, data }) => {
      const response = await https.patch(`/orders/${orderId}/assign-rider`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};

export type OrderRow = {
  index?: number;
  _id: string;
  rider?: Customer;
  type?: string;
  status: string;
  [key: string]: string | number | undefined | Customer;
};

// export interface OrderDetails {
//   _id: string;
//   customer: {
//     _id: string;
//     fullName: string;
//     displayName: string;
//     email: string;
//   };
//   rider: {
//     _id: string;
//     fullName: string;
//     displayName: string;
//     email: string;
//   } | null;
//   totalProductsCost: string;
//   totalCost: string;
//   type: string;
//   status: string;
//   createdAt: string;
// }

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

interface Rider {
  fullName: string | null;
}

export interface OrderDetails {
  _id: string;
  customer: Customer;
  recipientPhoneNumber: string;
  rider: Rider | null;
  items: Item[];
  vendor: Vendor | null;
  deliveryAddress: string;
  deliveryFee: string; // Stored as string in JSON
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
