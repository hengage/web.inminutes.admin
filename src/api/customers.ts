import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IPaginationData } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCustomersQuery = (filter: unknown) => {
  const result = useQuery<
    IPaginationData<Pick<ICustomer, "_id" | "email" | "phoneNumber" | "fullName">>,
    Error
  >({
    queryKey: [QUERY_KEYS.CUSTOMERS],
    queryFn: async () => {
      const response = await https.get(
        `/customer/list${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data.customers;
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
export const useGetCustomersOrdersQuery = (
  filter: Record<string, string | string[] | number>,
  customerId: string
) => {
  const result = useQuery<IPaginationData<OrderRow>, Error>({
    queryKey: ["customer-orders", customerId, filter],
    queryFn: async () => {
      const response = await https.get(
        `/order/list?customer=${customerId}${stringifyQuery(filter)}`
      );
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

export const useGetCustomersErrandsQuery = (
  filter: Record<string, string | string[] | number>,
  customerId: string
) => {
  const result = useQuery<IPaginationData<OrderRow>>({
    queryKey: ["customer-errand", customerId, filter],
    queryFn: async () => {
      const response = await https.get(
        `/errand/list?customer=${customerId}${stringifyQuery(filter)}`
      );
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

export const useGetCustomersSummaryQuery = () => {
  return useQuery({
    queryKey: ["customer-summary"],
    queryFn: async () => {
      const response = await https.get(`/customer/summary`);
      const data = response.data?.data?.summary;
      return data;
    },
  });
};

export const useGetSingleCustomersQuery = (customerId: string) => {
  return useQuery<
    Pick<Customer, "_id" | "email" | "phoneNumber" | "fullName" | "displayName" | "dateOfBirth">,
    Error
  >({
    queryKey: ["singleCustomer", customerId],
    queryFn: async () => {
      const response = await https.get(`/customer/${customerId}`);
      const data = response?.data?.data?.customer;
      return data;
    },
    enabled: !!customerId,
  });
};

export const useDeleteCustomerMutation = (customerId: string) => {
  const result = useMutation<unknown, Error, ICustomer>({
    mutationFn: async () => {
      const response = await https.delete(`/customer/${customerId}/delete`);
      return response.data.data;
    },
  });
  return result;
};

export interface ICustomer {
  _id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
}

export interface Customer {
  _id?: string;
  fullName?: string;
  createdAt?: string;
  profileImage?: string;
  totalOrders?: number;
  totalErrands?: number;
  lastUpdate?: string;
  status?: string;
  dateOfBirth?: string;
  displayName?: string;
  phoneNumber?: string;
  email?: string;
}

export type ErrandRow = {
  index?: number;
  _id: string;
  pickupAddress?: string;
  type?: string;
  status: string;
  [key: string]: string | number | undefined;
};
export type OrderRow = {
  index?: number;
  _id: string;
  rider?: Customer;
  type?: string;
  status: string;
  [key: string]: string | number | undefined | Customer;
};
