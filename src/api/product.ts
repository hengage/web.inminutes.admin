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
  category: ICategory;
  status: "Approved" | "Pending" | "Rejected";
  vendor: {
    _id: string;
    businessName: string;
  };
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
  const result = useQuery<IPaginationData<IProduct>, Error>({
    queryKey: [QUERY_KEYS.PRODUCTS, filter],
    queryFn: async () => {
      const response = await https.get(
        "/products" + stringifyQuery(filter as Record<string, string | string[] | number>)
      );
      return response.data.data;
    },
    select: (data) => ({
      data: data.products || [],
      total: data.totalDocs || 0,
      page: data.page || 1,
      limit: data.limit || 10,
      totalPages: data.totalPages || 1,
    }),
  });

  return {
    isLoading: result.isPending,
    data: result.data,
    error: result.error,
    refetch: result.refetch,
  };
};

/**
 * Hook to fetch a single product by ID
 */
export const useGetProductByIdQuery = (productId: string) => {
  return useQuery<IProduct, Error>({
    queryKey: [QUERY_KEYS.PRODUCTS, productId],
    queryFn: async () => {
      const response = await https.get(`/products/${productId}`);
      return response.data.data;
    },
    enabled: Boolean(productId),
  });
};

/**
 * Hook to fetch product categories
 */
export const useGetProductCategoriesQuery = () => {
  const result = useQuery<ICategory[], Error>({
    queryKey: [QUERY_KEYS.Categories],
    queryFn: async () => {
      const response = await https.get("/products/categories");
      return response.data.data.categories;
    },
  });
  const categoryItems: IListItem[] = (result.data || []).map((category) => ({
    label: category.name,
    value: category._id,
  }));

  return {
    isLoading: result.isPending,
    categories: result.data,
    categoryItems,
    error: result.error,
  };
};

/**
 * Hook to create a new product
 */
export const useCreateProductMutation = () => {
  return useMutation<unknown, Error, Partial<IProduct>>({
    mutationFn: async (data) => {
      const response = await https.post("/products", data);
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
      const response = await https.put(`/products/${productId}`, data);
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
      const response = await https.delete(`/products/${productId}`);
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
  image: string;
}
