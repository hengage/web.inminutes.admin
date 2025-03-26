export interface IListItem {
  label: string;
  value: string;
}

export interface ICheckboxListItem extends IListItem {
  checked: boolean;
}

export interface pageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

export type tag =
  | "pending"
  | "ready"
  | "active"
  | "in-transit"
  | "nearby"
  | "picked-up"
  | "cancelled"
  | "abandoned"
  | "failed"
  | "inactive"
  | "delivered"
  | "successful"
  | "arrived"
  | "approved"
  | "rejected";

export type tagTypes = "primary" | "error" | "success" | "warning";
