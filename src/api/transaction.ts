import https from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { stringifyQuery } from "@/lib/utils";
import { IPaginationData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionQuery = (filter: unknown) => {
  const result = useQuery<
    IPaginationData<
      Pick<ITransaction, "_id" | "reason" | "reference" | "amount" | "status" | "createdAt">
    >,
    Error
  >({
    queryKey: [QUERY_KEYS.TRANSAC, filter],
    queryFn: async () => {
      const response = await https.get(
        "/transaction/list" +
          `${stringifyQuery(filter as Record<string, string | string[] | number>)}`
      );
      return response.data.data.transactions;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    select: (data: any) => ({
      data: data.docs,
      total: data.totalDocs,
      page: data.page,
      limit: data.limit,
      totalPages: data.pagingCounter,
    }),
  });
  return {
    isLoading: result.isPending,
    data: result.data,
    error: result.error,
    result,
  };
};

export const useGetTransactionByIdQuery = (transactionId: string) => {
  return useQuery<ITransaction, Error>({
    queryKey: [QUERY_KEYS.TRANSAC, transactionId],
    queryFn: async () => {
      const response = await https.get(`/transaction/${transactionId}`);
      return response.data.data.transaction;
    },
    enabled: Boolean(transactionId),
  });
};

export interface ITransaction {
  _id: string;
  amount: string;
  reference: string;
  reason: string;
  status: string;
  createdAt: string;
  type?: string;
  [key: string]: string | number | boolean | null | undefined;
}
