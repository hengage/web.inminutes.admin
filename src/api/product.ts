import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IListItem, IPaginationData } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  cost: string | number;
  category: ICategory;
  status: "Approved" | "Pending" | "Rejected";
  vendor: string | null;
  productCode: string;
  createdAt: string;
}

/**
 * Product filter parameters
 */
export interface ProductFilter {
  search?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
  priceRange?: {
    min?: number;
    max?: number;
  };
  page?: number;
  limit?: number;
}

/**
 * Hook to fetch products with filtering and pagination
 */
export const useGetProductsQuery = (filter: ProductFilter = {}) => {
  const result = useQuery<
    IPaginationData<
      Pick<IProduct, "_id" | "name" | "vendor" | "cost" | "category" | "status" | "createdAt">
    >,
    Error
  >({
    queryKey: [QUERY_KEYS.PRODUCTS, filter],
    queryFn: async () => {
      const response = await https.get(
        "/product/list" + `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data.products;
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
  return { isLoading: result.isPending, data: result.data, result, refetch: result.refetch };
};

/**
 * Hook to fetch a single product by ID
 */
export const useGetProductByIdQuery = (productId: string | string[]) => {
  return useQuery<IProductDetails, Error>({
    queryKey: [QUERY_KEYS.PRODUCTS, productId],
    queryFn: async () => {
      const response = await https.get(`/product/${productId}`);
      return response.data.data.product;
    },
    enabled: Boolean(productId),
  });
};

export const useGetProductCategoriesQuery = (filter?: unknown) => {
  const result = useQuery<IPaginationData<ICategory>, Error>({
    queryKey: [QUERY_KEYS.Categories],
    queryFn: async () => {
      const response = await https.get(
        "/product/categories" +
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

export const useGetCategoriesQuery = (filter: unknown = {}) => {
  const result = useQuery<
    IPaginationData<Pick<ICategory, "_id" | "name" | "productCount" | "subcategoryCount">>,
    Error
  >({
    queryKey: [QUERY_KEYS.Categories, filter],
    queryFn: async () => {
      const response = await https.get(
        "/product/categories" +
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
  return { isLoading: result.isPending, data: result.data, result, refetch: result.refetch };
};

export const useCreateCategorytMutation = () => {
  return useMutation<unknown, Error, Partial<ICategory>>({
    mutationFn: async (data) => {
      const response = await https.post("/product/category", data);
      return response.data.data;
    },
  });
};

/**
 * Hook to update an existing product
 */
export const useUpdateProductMutation = () => {
  return useMutation<unknown, Error, { productId: string; data: Partial<IProduct> }>({
    mutationFn: async ({ productId, data }) => {
      const response = await https.put(`/product/${productId}`, data);
      return response.data.data;
    },
  });
};

/**
 * Hook to delete a product
 */
export const useDeleteProductMutation = () => {
  return useMutation<unknown, Error, string>({
    mutationFn: async (productId) => {
      const response = await https.delete(`/product/${productId}`);
      return response.data.data;
    },
  });
};

/**
 * Hook to update product status
 */
export const useUpdateProductStatusMutation = () => {
  return useMutation<
    unknown,
    Error,
    { productId: string; status: "Approved" | "Pending" | "Rejected" }
  >({
    mutationFn: async ({ productId, status }) => {
      const response = await https.patch(`/products/${productId}/status`, { status });
      return response.data.data;
    },
  });
};

export interface ICategory {
  _id: string;
  name: string;
  image?: string;
  subcategoryCount?: string;
  productCount?: string;
}

export interface IAddOn {
  item: string;
  cost: string | number;
}

export interface IProductDetails {
  _id: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  cost: string | number;
  tags: string[];
  addOns: IAddOn[];
  category: ICategory;
  vendor: string | null;
  status: "Approved" | "Pending" | "Rejected";
  isDeleted: boolean;
  createdAt: string;
}
