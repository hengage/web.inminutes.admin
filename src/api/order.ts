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
