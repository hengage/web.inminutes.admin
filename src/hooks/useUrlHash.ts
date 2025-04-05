"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const useUrlHash = () => {
  const [hash, setHash] = useState(() =>
    typeof window !== undefined ? window.location.hash.substring(1) : ""
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleHashChange = () => {
      setHash(typeof window !== undefined ? window.location.hash.substring(1) : "");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const updateHash = useCallback((newHash: string) => {
    if (newHash.startsWith("#")) {
      window.location.hash = newHash;
    } else {
      window.location.hash = `#${newHash}`;
    }
  }, []);
  useEffect(() => {
    setHash(window.location.hash.substring(1));
  }, [pathname, searchParams]);

  return { hash, updateHash };
};

export default useUrlHash;
