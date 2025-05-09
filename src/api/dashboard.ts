import https from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";

export const useGetDashboardQuery = ({}) => {
  const result = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await https.get("/dashboard");
      return response.data.data;
    },
  });

  return {
    isLoading: result.isPending,
    data: result.data,
    error: result.error,
    result,
  };
};

import axios from "axios";

const fetchGraphData = async (
  filter: Record<string, string | number | null | Date | boolean | undefined>
) => {
  const queryString = new URLSearchParams(
    Object.entries(filter).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    )
  ).toString();

  const response = await axios.get(`/api/dashboard/graph?${queryString}`);
  return response.data.data;
};

export const useGetGraphDataQuery = (
  filter: Record<string, string | number | null | Date | boolean | undefined>
) => {
  return useQuery({
    queryKey: ["graphData", filter],
    queryFn: () => fetchGraphData(filter),
    staleTime: 5 * 60 * 1000,
  });
};
