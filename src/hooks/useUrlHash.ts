"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const parseHashParams = (hash: string) => {
  return hash
    .substring(1) // Remove #
    .split("&")
    .reduce(
      (acc, param) => {
        const [key, value] = param.split("=");
        if (key) acc[key] = decodeURIComponent(value || "");
        return acc;
      },
      {} as Record<string, string>
    );
};

const serializeHashParams = (params: Record<string, string>) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};

const updateHashUrl = (newValues: Record<string, string>, replaceAll = false) => {
  let hashParams = new URLSearchParams();

  if (!replaceAll) {
    // Preserve existing hash values
    hashParams = new URLSearchParams(window.location.hash.replace("#", ""));
  }

  // Update or add new values
  Object.entries(newValues).forEach(([key, value]) => {
    hashParams.set(key, value);
  });

  return `#${hashParams.toString()}`;
};

const useUrlHash = () => {
  const [hashParams, setHashParams] = useState<Record<string, string>>({});
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const handleHashChange = () => {
      setHashParams(parseHashParams(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    setHashParams(parseHashParams(window.location.hash));
  }, [pathname, searchParams]);

  const updateHash = useCallback((newParams: Record<string, string>) => {
    const currentParams = parseHashParams(window.location.hash);
    const mergedParams = { ...currentParams, ...newParams };
    window.location.hash = serializeHashParams(mergedParams);
  }, []);

  return { hashParams, updateHash, updateHashUrl };
};

export default useUrlHash;
