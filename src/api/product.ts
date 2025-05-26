/* eslint-disable @typescript-eslint/no-explicit-any */
import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IListItem, IPaginationData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  cost: string | number;
  category: ICategory;
  status: "Approved" | "Pending" | "Rejected";
  vendor: vendor;
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

export const useGetReviewingProductsQuery = (
  filter: Record<string, string | string[] | number> = {}
) => {
  const result = useQuery<
    IPaginationData<
      Pick<IProduct, "_id" | "name" | "vendor" | "cost" | "category" | "status" | "createdAt">
    >,
    Error
  >({
    queryKey: [QUERY_KEYS.PRODUCTS, "reviewing", filter],
    queryFn: async () => {
      const finalFilter = { ...filter };
      delete finalFilter.status;
      const query = stringifyQuery({ ...finalFilter, status: "pending" });
      const response = await https.get(`/product/list${query}`);
      return response.data.data.products;
    },
    enabled: true,

    select: (data: any) => ({
      data: data.docs,
      total: data.totalDocs,
      page: data.page,
      limit: data.limit,
      totalPages: data.totalPages,
    }),
  });

  return {
    isLoading: result.isPending,
    data: result.data,
    result,
    refetch: result.refetch,
  };
};

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

export const useGetProductCategoriesQuery = (
  filter: Record<string, string | number | string[]> = { page: 1, limit: 25 }
) => {
  const finalFilter = {
    page: 1,
    limit: 25,
    ...filter,
  };
  const query = stringifyQuery(finalFilter);
  const result = useQuery<IPaginationData<ICategory>, Error>({
    queryKey: [QUERY_KEYS.Categories, finalFilter],
    queryFn: async () => {
      const response = await https.get(`/product/categories${query}`);
      return response.data.data;
    },
    enabled: true,
  });

  const item: IListItem[] = (result.data?.data ?? []).map((e) => ({
    label: e.name,
    value: e._id,
  }));

  return { ...result, item };
};

export const useGetCategoriesQuery = (filter: unknown = {}) => {
  const result = useQuery<
    IPaginationData<Pick<ICategory, "_id" | "name" | "totalProducts">>,
    Error
  >({
    queryKey: [QUERY_KEYS.Categories, filter],
    queryFn: async () => {
      const response = await https.get(
        "/product/categories" +
          `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data;
    },
    enabled: filter
      ? Object.entries(filter as Record<string, string | string[] | number>).length > 0
      : true,

    select: (data: any) => ({
      data: data.data,
      total: data.total,
      page: data.page,
      limit: data.limit,
      totalPages: data.pages,
    }),
  });
  return { isLoading: result.isPending, data: result.data, result, refetch: result.refetch };
};
export const useGetSubCategoriesQuery = (categoryId: string) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.SubCategory, categoryId],
    queryFn: async () => {
      const response = await https.get(`/product/category/${categoryId}/sub-categories`);
      return response.data.data;
    },
    enabled: Boolean(categoryId),
  });

  return {
    isLoading: result.isPending,
    data: result.data,
    error: result.error,
    result,
  };
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Partial<ICategory>>({
    mutationFn: async (data) => {
      const response = await https.post("/product/category", data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.Categories] });
    },
  });
};

export interface CreateSubCategoryPayload {
  subCategoryName: string;
  categoryId: string;
}

export const useCreateSubCategorytMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateSubCategoryPayload>({
    mutationFn: async (data) => {
      const response = await https.post(`/product/sub-category`, {
        subCategoryName: data.subCategoryName,
        categoryId: data.categoryId,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SubCategory] });
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (productId) => {
      const response = await https.delete(`/product/${productId}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};

export const useUpdateProductStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { productId: string; approve: boolean }>({
    mutationFn: async ({ productId, approve }) => {
      const response = await https.put(`/product/${productId}/approval`, { approve });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};

export interface ICategory {
  _id: string;
  name: string;
  image?: string;
  totalProducts?: string;
}

export interface IAddOn {
  item: string;
  cost: string | number;
}
export interface vendor {
  _id: string;
  businessName: string;
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
  vendor: vendor;
  status: "Approved" | "Pending" | "Rejected";
  isDeleted: boolean;
  createdAt: string;
}
