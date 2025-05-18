import https from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";

export interface DashboardFilter {
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
}

export const useGetDashboardQuery = (filter: DashboardFilter = {}) => {
  const result = useQuery({
    queryKey: ["dashboard", filter],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (filter.startDate) queryParams.append("startDate", filter.startDate);
      if (filter.endDate) queryParams.append("endDate", filter.endDate);
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

      const response = await https.get(`/dashboard${queryString}`);
      return response.data.data.data;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return {
    isLoading: result.isPending,
    data: result?.data,
    error: result.error,
    refetch: result.refetch,
  };
};

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

  const response = await https.get(`/dashboard/graph?${queryString}`);
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
