"use client";
import { usePathname, useSearchParams as useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const useUrlState = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const allParams = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const allKeys = useMemo(() => searchParams.keys(), [searchParams]);
  const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);
  const checkParam = useCallback((key: string) => searchParams.has(key), [searchParams]);
  return { allParams, allKeys, getParam, checkParam, searchParams, pathname };
};

export default useUrlState;
