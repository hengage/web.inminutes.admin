import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetErrandQuery = (filter = {}) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.ERRANDS, filter],
    queryFn: async () => {
      const response = await https.get("/errand/list" + `${stringifyQuery(filter)}`);
      return response.data.data.docs;
    },
  });

  return {
    isLoading: result.isPending,
    data: result.data,
    error: result.error,
    result,
  };
};

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
