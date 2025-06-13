"use client";
// import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";
import { CustomButton as Button } from "@/components/ui/custom/button";
import PageHeader from "@/components/general/PageHeader";
import OrderDetails from "./SingleOrderDetails";

const Tabs = () => {
  const { hashParams } = useUrlHash();

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <PageHeader title="Order Details" />
        <span className="flex gap-2 items-center justify-end">
          {(hashParams.tab === "0" || !hashParams.tab) && (
            <>
              <Button variant="ctm-outline" asChild className="border-2">
                <Link href={"/order/update"}>Update</Link>
              </Button>
            </>
          )}
        </span>
      </div>

      <div className="w-full">
        <OrderDetails />
      </div>
    </main>
  );
};

const TabExport = () => (
  <Suspense>
    <Tabs />
  </Suspense>
);

export default TabExport;
