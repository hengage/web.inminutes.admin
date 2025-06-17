import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IPaginationData } from "@/types";
import { useQuery } from "@tanstack/react-query";



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





export const useGetSingleErrandByIdQuery = (errandId: string | string[]) => {
  return useQuery<ErrandDetails, Error>({
    queryKey: ["singleErrand", errandId],
    queryFn: async () => {
      const response = await https.get(`/errand/${errandId}`);
      return response.data.data.errand;
    },
    enabled: Boolean(errandId),
  });
};

export const useGetErrandQuery = (filter: Record<string, string | string[] | number>) => {
  const result = useQuery<IPaginationData<ErrandRow>, Error>({
    queryKey: [QUERY_KEYS.ERRANDS, filter],
    queryFn: async () => {
      const response = await https.get(`/errand/list${stringifyQuery(filter)}`);
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

export type ErrandRow = {
  index?: number;
  _id: string;
  customer?: Customer;
  type?: string;
  status: string;
  [key: string]: string | number | undefined | Customer;
};


interface Customer {
  _id: string;
  fullName: string;
}

interface Item {
  product: string;
  quantity: number;
  cost: string; // Stored as string in JSON, could be parsed to number if needed
  vendor: string;
  addOns: string[];
}

interface Vendor {
  businessName: string | null;
  fullName: string | null;
}

interface Receiver {
  phoneNumber: string | null;
  name: string | null;
}

interface Rider {
  fullName: string | null;
}

export interface ErrandDetails {
  _id: string;
  customer: Customer;
  recipientPhoneNumber: string;
  rider: Rider | null;
  items: Item[];
  vendor: Vendor | null;
  receiver: Receiver | null;
  deliveryAddress: string;
  deliveryFee: string; // Stored as string in JSON
  serviceFee: string; // Stored as string in JSON
  totalProductsCost: string; // Stored as string in JSON
  totalCost: string; // Stored as string in JSON
  type: "instant" | "scheduled"; // Based on provided data
  status:
    | "pending"
    | "request confirmed"
    | "ready"
    | "active"
    | "in-transit"
    | "nearby"
    | "approved"
    | "arrived"; // Based on status array in original code
  createdAt: string | null; // ISO date string
  updatedAt: string | null; // ISO date string
}
