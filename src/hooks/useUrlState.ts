"use client";
import { usePathname, useSearchParams as useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const useUrlState = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const allParams = useMemo(() => {
    const params: Record<string, string | string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      if (key in params) {
        // If the key already exists, convert to array if needed and append
        params[key] = Array.isArray(params[key])
          ? [...(params[key] as string[]), value]
          : [params[key] as string, value];
      } else {
        params[key] = value;
      }
    }
    return params;
  }, [searchParams]);
  const allKeys = useMemo(() => searchParams.keys(), [searchParams]);
  const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);
  const getAllParams = useCallback((key: string) => searchParams.getAll(key), [searchParams]);
  const checkParam = useCallback((key: string) => searchParams.has(key), [searchParams]);
  return { allParams, allKeys, getParam, checkParam, searchParams, pathname, getAllParams };
};

export default useUrlState;
