"use client";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";
import { CustomButton as Button } from "@/components/ui/custom/button";
import Customers from "./CustomersTable";
import CustomerErrands from "./CustomerErrandsTable";
import CustomerOrders from "./CustomersOrderTable";
import PageHeader from "@/components/general/PageHeader";

const Tabs = () => {
  const { hashParams, updateHashUrl } = useUrlHash();
  const customerId =
    typeof window !== "undefined" ? window.location.pathname.split("/").pop() : undefined;

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <PageHeader title="Customers Details" />
        <span className="flex gap-2 items-center justify-end">
          {(hashParams.tab === "0" || !hashParams.tab) && (
            <>
              <Button variant="ctm-outline" asChild className="border-2">
                <Link href={"/customer/update"}>Update</Link>
              </Button>
            </>
          )}
        </span>
      </div>

      <Tab
        items={[
          {
            trigger: (
              <Link
                href={{
                  pathname: `/customer/${customerId}`,
                  query: { page: 1, limit: 30 },
                  hash: updateHashUrl({ tab: "0" }).substring(1),
                }}
              >
                Customer Info
              </Link>
            ),
            content: <Customers />,
            key: "0",
          },
          {
            trigger: (
              <Link
                href={{
                  pathname: `/customer/${customerId}`,
                  query: { page: 1, limit: 30 },
                  hash: updateHashUrl({ tab: "1" }).substring(1),
                }}
              >
                Orders
              </Link>
            ),
            content: <CustomerOrders />,
            key: "1",
          },
          {
            trigger: (
              <Link
                href={{
                  pathname: `/customer/${customerId}`,
                  query: { page: 1, limit: 30 },
                  hash: updateHashUrl({ tab: "2" }).substring(1),
                }}
              >
                Errands
              </Link>
            ),
            content: <CustomerErrands />,
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
