// import { Customer } from "@/components/screens/customer/singleCustomer/CustomerCard";
import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { ILocation, IPaginationData } from "@/types";
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
export const useUpdateVendorMutation = (vendorId: string) => {
  const result = useMutation<unknown, Error, IVendorCredentials>({
    mutationFn: async (data) => {
      const response = await https.post(`/customer/update/${vendorId}`, data);
      return response.data.data;
    },
  });
  return result;
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

export interface IVendorCredentials {
  businessName: string;
  businessLogo: string;
  email: string;
  phoneNumber: string;
  address: string;
  location: ILocation["coordinates"] | null;
  residentialAddress: string;
  category: string;
  subCategory?: string;
}

export interface ICustomer {
  _id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  subcategoryCount?: string;
  vendorCount?: string;
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
