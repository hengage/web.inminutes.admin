"use client";
// import OrdersTable from "@/components/screens/order/OrderTable";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";
import Categories from "./CategoriesTable";
import Applicants from "./ApplicantsTable";
import { CustomButton as Button } from "@/components/ui/custom/button";

import dynamic from "next/dynamic";

const OrdersTable = dynamic(() => import("@/components/screens/order/OrderTable"), {
  ssr: false, // Disable SSR for this component
});



const Tabs = () => {
  const { hashParams, updateHashUrl } = useUrlHash();

  // Defer hash URL generation to client-side
  const getTabLink = (tab: string) => ({
    pathname: "/order",
    query: { page: 1, limit: 30 },
    hash: updateHashUrl({ tab }).substring(1),
  });

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-primary-700">Orders</h2>
        <span className="flex gap-2 items-center justify-end">
          <Button disabled variant="ctm-outline" asChild className="border-2">
            <Link aria-disabled="true" href={"/order/update"}>
              Update
            </Link>
          </Button>
        </span>
      </div>
      <Tab
        items={[
          {
            trigger: <Link href={getTabLink("0")}>All Orders</Link>,
            content: <OrdersTable />,
            key: "0",
          },
          {
            trigger: <Link href={getTabLink("1")}>Ongoing</Link>,
            content: <Categories />,
            key: "1",
          },
          {
            trigger: <Link href={getTabLink("2")}>Cancelled</Link>,
            content: <Applicants />,
            key: "2",
          },
        ]}
        value={hashParams.tab ?? "0"}
      />
    </main>
  );
};

const TabExport = () => (
  <Suspense>
    <Tabs />
  </Suspense>
);

export default TabExport;
