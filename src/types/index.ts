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
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginationData<T> extends IPagination {
  data: T[];
}

export interface IFilter {
  search?: string;
  category?: string;
  subCategory?: string;
  page: number;
  limit: number;
  startDate?: string;
  endDate?: string;
}

export type tag =
  | "pending"
  | "ready"
  | "success"
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

export interface ILocation {
  coordinates: number[];
  type: "Point";
}

export interface IRating {
  totalRatingSum: number;
  ratingCount: number;
  averageRating: number;
}

export interface Order {
  _id: string;
  createdAt: string;
  additionalStatus: string;
  accountStatus: string;
  customer?: {
    fullName: string;
  };
  totalCost: number;
  status: string;
  type: string;
}

export interface Errand {
  _id: string;
  createdAt: string;
  additionalStatus: string;
  accountStatus: string;
  customer: {
    fullName: string;
  };
  receiver: {
    name: string;
  };
  type: string;
  packageType: string[];
  dispatchFee: string;
  status: string;
}
