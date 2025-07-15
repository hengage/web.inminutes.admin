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
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date | null>(today);

  // Defer hash URL generation to client-side
  const getTabLink = (tab: string) => ({
    pathname: "/metrics",
    query: { page: 1, limit: 30 },
    hash: updateHashUrl({ tab }).substring(1),
  });

  const handleDateRangeChange = (from: Date | null, to: Date | null) => {
    if (from && to) {
      setStartDate(from);
      setEndDate(to);
    }
  };

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
            onApply={handleDateRangeChange}
          />
        </div>
      </div>

      <Tab
        items={[
          {
            trigger: <Link href={getTabLink("0")}>Vendors</Link>,
            content: <VendorsTab startDate={startDate} endDate={endDate} />,
            key: "0",
          },
          {
            trigger: <Link href={getTabLink("1")}>Riders</Link>,
            content: <RidersTab startDate={startDate} endDate={endDate} />,
            key: "1",
          },
          {
            trigger: <Link href={getTabLink("2")}>Products</Link>,
            content: <ProductsTab startDate={startDate} endDate={endDate} />,
            key: "2",
          },
          {
            trigger: <Link href={getTabLink("3")}>Customers</Link>,
            content: <CustomersTab startDate={startDate} endDate={endDate} />,
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
