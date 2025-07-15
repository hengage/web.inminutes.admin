import https from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetTopCustomersQuery = () => {
  return useQuery({
    queryKey: ["top-customers"],
    queryFn: async () => {
      const response = await https.get(`/metrics/customers/top`);
      return response.data.data;
    },
  });
};
export const useGetCustomersSummaryQuery = () => {
  return useQuery({
    queryKey: ["top-customers-summary"],
    queryFn: async () => {
      const response = await https.get(`/metrics/customers/summary`);
      return response.data.data;
    },
  });
};
export const useGetCustomersChartQuery = ({
  fromDate,
  toDate,
}: {
  fromDate: Date | null;
  toDate: Date | null;
}) => {
  return useQuery({
    queryKey: ["customers-chart", fromDate?.toISOString(), toDate?.toISOString()],
    queryFn: async () => {
      // Convert dates to ISO string format (e.g., 2024-01-15)
      const fromDateStr = fromDate ? fromDate.toISOString().split("T")[0] : "";
      const toDateStr = toDate ? toDate.toISOString().split("T")[0] : "";
      const response = await https.get(
        `/metrics/customers/chart?fromDate=${fromDateStr}&toDate=${toDateStr}`
      );
      return response.data.data;
    },
    enabled: !!fromDate && !!toDate,
  });
};

export const useGetTopRidersQuery = () => {
  return useQuery({
    queryKey: ["top-riders"],
    queryFn: async () => {
      const response = await https.get(`/metrics/riders/top`);
      return response.data.data;
    },
  });
};
export const useGetRidersSummaryQuery = () => {
  return useQuery({
    queryKey: ["top-riders-summary"],
    queryFn: async () => {
      const response = await https.get(`/metrics/riders/summary`);
      return response.data.data;
    },
  });
};
export const useGetRidersChartQuery = ({
  fromDate,
  toDate,
}: {
  fromDate: Date | null;
  toDate: Date | null;
}) => {
  return useQuery({
    queryKey: ["riders-chart", fromDate?.toISOString(), toDate?.toISOString()],
    queryFn: async () => {
      // Convert dates to ISO string format (e.g., 2024-01-15)
      const fromDateStr = fromDate ? fromDate.toISOString().split("T")[0] : "";
      const toDateStr = toDate ? toDate.toISOString().split("T")[0] : "";
      const response = await https.get(
        `/metrics/riders/chart?fromDate=${fromDateStr}&toDate=${toDateStr}`
      );
      return response.data.data;
    },
    enabled: !!fromDate && !!toDate,
  });
};

export const useGetTopVendorsCatQuery = () => {
  return useQuery({
    queryKey: ["top-vendors-cat"],
    queryFn: async () => {
      const response = await https.get(`/metrics/vendors/categories/top`);
      return response.data.data;
    },
  });
};

export const useGetTopVendorsQuery = () => {
  return useQuery({
    queryKey: ["top-vendors"],
    queryFn: async () => {
      const response = await https.get(`/metrics/vendors/top`);
      return response.data.data;
    },
  });
};

export const useGetVendorsSummaryQuery = () => {
  return useQuery({
    queryKey: ["top-vendors-summary"],
    queryFn: async () => {
      const response = await https.get(`/metrics/vendors/summary`);
      return response.data.data;
    },
  });
};
export const useGetVendorsChartQuery = ({
  fromDate,
  toDate,
}: {
  fromDate: Date | null;
  toDate: Date | null;
}) => {
  return useQuery({
    queryKey: ["vendors-chart", fromDate?.toISOString(), toDate?.toISOString()],
    queryFn: async () => {
      // Convert dates to ISO string format (e.g., 2024-01-15)
      const fromDateStr = fromDate ? fromDate.toISOString().split("T")[0] : "";
      const toDateStr = toDate ? toDate.toISOString().split("T")[0] : "";
      const response = await https.get(
        `/metrics/vendors/chart?fromDate=${fromDateStr}&toDate=${toDateStr}`
      );
      return response.data.data;
    },
    enabled: !!fromDate && !!toDate,
  });
};

export const useGetTopProductsQuery = () => {
  return useQuery({
    queryKey: ["top-products"],
    queryFn: async () => {
      const response = await https.get(`/metrics/products/top`);
      return response.data.data;
    },
  });
};
export const useGetProductsSummaryQuery = () => {
  return useQuery({
    queryKey: ["top-products-summary"],
    queryFn: async () => {
      const response = await https.get(`/metrics/products/summary`);
      return response.data.data;
    },
  });
};

export const useGetTopProductsCatQuery = () => {
  return useQuery({
    queryKey: ["top-products-cat"],
    queryFn: async () => {
      const response = await https.get(`/metrics/products/categories/top`);
      return response.data.data;
    },
  });
};
export const useGetProductsChartQuery = ({
  fromDate,
  toDate,
}: {
  fromDate: Date | null;
  toDate: Date | null;
}) => {
  return useQuery({
    queryKey: ["products-chart", fromDate?.toISOString(), toDate?.toISOString()],
    queryFn: async () => {
      // Convert dates to ISO string format (e.g., 2024-01-15)
      const fromDateStr = fromDate ? fromDate.toISOString().split("T")[0] : "";
      const toDateStr = toDate ? toDate.toISOString().split("T")[0] : "";
      const response = await https.get(
        `/metrics/products/chart?fromDate=${fromDateStr}&toDate=${toDateStr}`
      );
      return response.data.data;
    },
    enabled: !!fromDate && !!toDate,
  });
};
