import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetOrdersQuery = (filter = {}) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, filter],
    queryFn: async () => {
      const response = await https.get("/order/list" + `${stringifyQuery(filter)}`);
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

export const useGetCustomersOrdersQuery = () => {
  const result = useQuery({
    queryKey: ["orders", ],
    queryFn: async () => {
      const response = await https.get(
        `/order/list`
      );
      console.log(response, 'response' ) 
      return response.data.data.orders;
    },
    
  });
  console.log(result, 'fffg')
  return { isLoading: result.isPending, data: result.data, result };
};
// export const useGetCustomersOrdersQuery = (filter) => {
//   const result = useQuery({
//     queryKey: ["orders",  filter],
//     queryFn: async () => {
//       const response = await https.get(
//         `/order/list${stringifyQuery(filter)}`
//       );
//       console.log(response, 'response' ) 
//       return response.data.data.orders;
//     },
    
//   });
//   console.log(result, 'fffg')
//   return { isLoading: result.isPending, data: result.data, result };
// };
// export const useGetCustomersOrdersQuery = (
//   filter: Record<string, string | string[] | number>,
// ) => {
//   const result = useQuery({
//     queryKey: ["orders",  filter],
//     queryFn: async () => {
//       const response = await https.get(
//         `/order/list${stringifyQuery(filter)}`
//       );
//       console.log(response, 'response' ) 
//       return response.data.data.orders;
//     },
//     enabled: Object.entries(filter).length > 0,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     select: (data: any) => ({
//       data: data.docs,
//       total: data.totalDocs,
//       page: data.page,
//       limit: data.limit,
//       totalPages: data.pagingCounter,
//     }),
//   });
//   console.log(result, 'fffg')
//   return { isLoading: result.isPending, data: result.data, result };
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
