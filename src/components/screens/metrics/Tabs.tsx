"use client";
// import OrdersTable from "@/components/screens/order/OrderTable";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense, useState } from "react";

import VendorsTab from "./VendorsTab";
import RidersTab from "./RidersTab";
import ProductsTab from "./ProductsTab";
import CustomersTab from "./CustomersTab";
import DateRangePicker from "@/components/ui/custom/Daterange";

const Tabs = () => {
  const { hashParams, updateHashUrl } = useUrlHash();
  const today = new Date();
  new Date(today.getFullYear(), today.getMonth(), 1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeFrame, setTimeFrame] = useState("today");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
    if (value !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  // Defer hash URL generation to client-side
  const getTabLink = (tab: string) => ({
    pathname: "/metrics",
    query: { page: 1, limit: 30 },
    hash: updateHashUrl({ tab }).substring(1),
  });

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-primary-700">Metrics</h2>
        <div className="flex space-x-3 mb-4 items-center">
          <h3 className="font-bold text-lg text-[#484D57">Select date to filter:</h3>

          {/* {timeFrame === "custom" && ( */}
          <DateRangePicker
            className="border-2 border-black/40"
            fromDate={startDate ?? undefined}
            toDate={endDate ?? undefined}
            onApply={(from, to) => {
              setStartDate(from ?? null);
              setEndDate(to ?? null);
            }}
          />
        </div>
      </div>

      <Tab
        items={[
          {
            trigger: <Link href={getTabLink("0")}>Vendors</Link>,
            content: <VendorsTab />,
            key: "0",
          },
          {
            trigger: <Link href={getTabLink("1")}>Riders</Link>,
            content: <RidersTab />,
            key: "1",
          },
          {
            trigger: <Link href={getTabLink("2")}>Products</Link>,
            content: <ProductsTab />,
            key: "2",
          },
          {
            trigger: <Link href={getTabLink("3")}>Customers</Link>,
            content: <CustomersTab />,
            key: "3",
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
