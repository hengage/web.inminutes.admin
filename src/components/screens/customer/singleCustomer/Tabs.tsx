"use client";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";
import { CustomButton as Button } from "@/components/ui/custom/button";
import Customers from "./CustomersTable";
// import { Icon } from "@/components/ui/Icon";
// import Customers from "./CustomersTable";
// import Applicants from "./ApplicantsTable";
// import Customers from "./CustomersTable";

const Tabs = () => {
  const { hashParams, updateHashUrl } = useUrlHash();

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-primary-700">Customers</h2>
        <span className="flex gap-2 items-center justify-end">
          {(hashParams.tab === "0" || !hashParams.tab) && (
            <>
              {/* <Button
                variant="ctm-primary"
                slotBefore={<Icon name="add" height={16} width={16} />}
                asChild
              >
                <Link href={"/customer/create"}>Create Customer</Link>
              </Button> */}

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
                  pathname: "/customer",
                  query: { page: 1, limit: 10 },
                  hash: updateHashUrl({ tab: "0" }).substring(1),
                }}
              >
                All Customers
              </Link>
            ),
            content: <Customers />,
            key: "0",
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
