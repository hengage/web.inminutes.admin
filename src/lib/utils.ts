import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeData(data: string) {
  return Buffer.from(data).toString("base64");
}

export function decodeData(data: string) {
  return Buffer.from(data, "base64").toString("utf-8");
}

interface UrlParams {
  params: Record<string, string | number | string[]>;
  query: Record<string, string | string[] | number>;
}

interface UrlQueryParams {
  params: Record<string, string | number>;
  key: string;
  value: string | string[] | null;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  return qs.stringifyUrl(
    {
      url: window.location.href,
      query: {
        ...params,
        [key]: value,
      },
    },
    { skipNull: true }
  );
}

export function stringifyUrl(query: UrlParams["query"]) {
  return qs.stringifyUrl(
    {
      url: `${window.location.host}/${window.location.pathname}`,
      query: {
        ...query,
      },
    },
    { skipNull: true }
  );
}

export function stringifyQuery(query: UrlParams["query"]) {
  return qs.stringifyUrl(
    {
      url: "",
      query: {
        ...query,
      },
    },
    { skipNull: true }
  );
}

export const stringContains = (value: string, secondValue: string) => {
  return value?.toLowerCase().includes(secondValue?.toLowerCase());
};

export function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Add this function near the top, after imports
export function formatDOB(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // fallback if invalid date
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
