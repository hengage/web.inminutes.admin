"use client";
import VendorsTable from "@/components/screens/vendor/VendorsTable";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";

const Tabs = () => {
  const { hash } = useUrlHash();

  return (
    <Tab
      items={[
        {
          trigger: (
            <Link href={{ pathname: "/vendor", query: { page: 1, limit: 10 }, hash: "0" }}>
              All Vendors
            </Link>
          ),
          content: <VendorsTable />,
          key: "0",
        },
        {
          trigger: (
            <Link href={{ pathname: "/vendor", query: { page: 1, limit: 10 }, hash: "1" }}>
              All Categories
            </Link>
          ),
          content: <></>,
          key: "1",
        },
        {
          trigger: (
            <Link href={{ pathname: "/vendor", query: { page: 1, limit: 10 }, hash: "2" }}>
              All Applications
            </Link>
          ),
          content: <></>,
          key: "2",
        },
      ]}
      value={hash.length > 0 ? hash : "0"}
    />
  );
};

const TabExport = () => (
  <Suspense>
    <Tabs />
  </Suspense>
);

export default TabExport;
