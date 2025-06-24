"use client";
// import OrdersTable from "@/components/screens/order/OrderTable";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";

import CancelledErrand from "./CancelledErrandTable";
import OngoingErrand from "./OngoingErrandTable";
import Errands from "./ErrandTable";

const Tabs = () => {
  const { hashParams, updateHashUrl } = useUrlHash();

  // Defer hash URL generation to client-side
  const getTabLink = (tab: string) => ({
    pathname: "/errand",
    query: { page: 1, limit: 30 },
    hash: updateHashUrl({ tab }).substring(1),
  });

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-primary-700">Errands</h2>
      </div>
      <Tab
        items={[
          {
            trigger: <Link href={getTabLink("0")}>All Errands</Link>,
            content: <Errands />,
            key: "0",
          },
          {
            trigger: <Link href={getTabLink("1")}>Ongoing</Link>,
            content: <OngoingErrand />,
            key: "1",
          },
          {
            trigger: <Link href={getTabLink("2")}>Cancelled</Link>,
            content: <CancelledErrand />,
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
