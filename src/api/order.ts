import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IPaginationData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IVendor } from "./vendors";

// export const useGetOrdersQuery = (filter = {}) => {
//   const result = useQuery({
//     queryKey: [QUERY_KEYS.ORDERS, filter],
//     queryFn: async () => {
//       const response = await https.get("/order/list" + `${stringifyQuery(filter)}`);
// console.log(response, 'resdj')
// console.log(response?.data?.data, 'resdj')

//       console.log(response.data.orders.docs, "response.data.orders.docs");
//       return response.data.orders.docs;
//     },
//   });

//   console.log(result?.data, 'resulfrtrtrtmr')

//   return {
//     isLoading: result.isPending,
//     data: result.data,
//     error: result.error,
//     result,
//   };
// };

export const useGetVendorsQuery = (filter: unknown) => {
  const result = useQuery<
    IPaginationData<
      Pick<
        IVendor,
        | "_id"
        | "businessName"
        | "businessLogo"
        | "category"
        | "email"
        | "accountStatus"
        | "createdAt"
      >
    >,
    Error
  >({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: async () => {
      const response = await https.get(
        "/order/list" + `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data.orders;
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

// export const useGetOrdersQuery = (filter = {}) => {
//   const result = useQuery({
//     queryKey: [QUERY_KEYS.ORDERS, filter],
//     queryFn: async () => {
//       const response = await https.get("/order/list" + `${stringifyQuery(filter)}`);
//       console.log(response, "response from api");

//       // Transform the response to match DataTable's expected structure
//       return {
//         data: response.data.data.orders.docs, // Wrap docs in a data property
//         totalDocs: response.data.data.orders.totalDocs,
//         totalPages: response.data.data.orders.totalPages,
//         page: response.data.data.orders.page,
//         limit: response.data.data.orders.limit,
//       };
//     },
//     enabled: typeof window !== "undefined",
//   });

//   return {
//     isLoading: result.isPending,
//     data: result.data,
//     error: result.error,
//     result,
//   };
// };

export const useGetSingleOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: ["singleErrand", orderId],
    queryFn: async () => {
      const response = await https.get(`/order/${orderId}`);
      const data = response?.data?.data?.order;
      return data;
    },
    enabled: !!orderId,
  });
};


export const useGetOrdersQuery = (filter = {}) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, filter],
    queryFn: async () => {
      const response = await https.get("/order/list" + `${stringifyQuery(filter)}`);
      console.log(response, "response from api");

      return {
        data: response.data.data.orders.docs,
        totalDocs: response.data.data.orders.totalDocs,
        totalPages: response.data.data.orders.totalPages,
        page: response.data.data.orders.page,
        limit: response.data.data.orders.limit,
      };
    },
    enabled: typeof window !== "undefined",
  });

  console.log(result?.data, "result.data");

  return {
    isLoading: result.isPending,
    data: result.data,
    error: result?.error,
    result,
  };
};

export interface OrderRow {
  _id: string;
  customer: {
    _id: string;
    fullName: string;
    displayName: string;
    email: string;
  };
  rider: {
    _id: string;
    fullName: string;
    displayName: string;
    email: string;
  } | null;
  totalProductsCost: string;
  totalCost: string;
  type: string;
  status: string;
  createdAt: string;
}