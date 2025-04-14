import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IListItem, ILocation, IPaginationData, IRating } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

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
    queryKey: [QUERY_KEYS.VENDORS],
    queryFn: async () => {
      const response = await https.get(
        "/vendor/list" + `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data.vendors;
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

export const useGetCategoriesQuery = (filter?: unknown) => {
  const result = useQuery<IPaginationData<ICategory>, Error>({
    queryKey: [QUERY_KEYS.Categories],
    queryFn: async () => {
      const response = await https.get(
        "/vendor/categories" +
          `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data.categories;
    },
    enabled: filter
      ? Object.entries(filter as Record<string, string | string[] | number>).length > 0
      : true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (data: any) => ({
      data: data.categories,
      total: data.total,
      page: data.page,
      limit: data.limit,
      totalPages: data.pages,
    }),
  });
  const item: IListItem[] = (result.data?.data ?? [])?.map((e) => ({
    label: e.name,
    value: e._id,
  }));
  return { ...result, item };
};

export const useGetSubCategoriesQuery = (category: string) => {
  const result = useQuery<ICategory[], Error>({
    queryKey: [QUERY_KEYS.SubCategory, category],
    queryFn: async () => {
      const response = await https.get("/vendor/categories/" + `${category}/sub-categories`);
      return response.data.data;
    },
    enabled: Boolean(category),
  });
  const item: IListItem[] = (result.data ?? [])?.map((e) => ({ label: e.name, value: e._id }));
  return { ...result, item };
};

export const useCreateVendorMutation = () => {
  const result = useMutation<unknown, Error, IVendorCredentials>({
    mutationFn: async (data) => {
      const response = await https.post("/vendor/register", data);
      return response.data.data;
    },
  });
  return result;
};

export const useUpdateVendorMutation = (vendorId: string) => {
  const result = useMutation<unknown, Error, IVendorCredentials>({
    mutationFn: async (data) => {
      const response = await https.post(`/vendor/update/${vendorId}`, data);
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

export interface IVendor {
  _id: string;
  businessName: string;
  businessLogo: string;
  email: string;
  phoneNumber: string;
  address: string;
  location: ILocation;
  h3Index: string;
  residentialAddress: string;
  category: ICategory;
  subCategory: string;
  paymentOptions: [];
  accountStatus: "active";
  approved: false;
  rating: IRating;
  createdAt: string;
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  subcategoryCount?: string;
  vendorCount?: string;
}
