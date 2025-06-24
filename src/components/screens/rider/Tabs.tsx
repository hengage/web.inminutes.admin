"use client";
import RidersTable from "@/components/screens/rider/RidersTable";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";
import Applicants from "./ApplicantsTable";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { Icon } from "@/components/ui/Icon";

const Tabs = () => {
  const { hashParams, updateHashUrl } = useUrlHash();

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-primary-700">Riders</h2>
        <span className="flex gap-2 items-center justify-end">
          {hashParams.tab === "0" && (
            <>
              <Button
                variant="ctm-primary"
                slotBefore={<Icon name="add" height={16} width={16} />}
                asChild
              >
                <Link href={"/rider/create"}>Create Rider</Link>
              </Button>

              <Button variant="ctm-outline" asChild className="border-2">
                <Link href={"/rider/update"}>Update</Link>
              </Button>
            </>
          )}
          {hashParams.tab === "1" && (
            <>
              <Button
                variant="ctm-primary"
                slotBefore={<Icon name="add" height={16} width={16} />}
                asChild
              >
                <Link href={"/rider/create"}>New Category</Link>
              </Button>

              <Button variant="ctm-outline" asChild className="border-2">
                <Link href={"/rider/update"}>Update</Link>
              </Button>
            </>
          )}
          {hashParams.tab === "2" && (
            <>
              <Button variant="ctm-outline" asChild className="border-2">
                <Link href={"/rider/update"}>Update</Link>
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
                  pathname: "/Rider",
                  query: { page: 1, limit: 10 },
                  hash: updateHashUrl({ tab: "0" }).substring(1),
                }}
              >
                All Riders
              </Link>
            ),
            content: <RidersTable />,
            key: "0",
          },
          {
            trigger: (
              <Link
                href={{
                  pathname: "/Rider",
                  query: { page: 1, limit: 10 },
                  hash: updateHashUrl({ tab: "1" }).substring(1),
                }}
              >
                Work Slots
              </Link>
            ),
            content: <></>,
            key: "1",
          },
          {
            trigger: (
              <Link
                href={{
                  pathname: "/Rider",
                  query: { page: 1, limit: 10 },
                  hash: updateHashUrl({ tab: "2" }).substring(1),
                }}
              >
                Rider Applications
              </Link>
            ),
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
