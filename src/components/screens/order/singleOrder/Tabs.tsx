"use client";
// import Tab from "@/components/ui/custom/Tabs";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { CustomButton as Button } from "@/components/ui/custom/button";
import PageHeader from "@/components/general/PageHeader";
import OrderDetails from "./SingleOrderDetails";
import { Trash } from "lucide-react";
import PopOver from "@/components/ui/custom/PopOver";
import RadioItems from "@/components/ui/custom/radio/RadioItems";

const riders = [
  { value: "john1", label: "John Doe" },
  { value: "john2", label: "John Doe" },
  { value: "john3", label: "John Doe" },
  { value: "john4", label: "John Doe" },
  { value: "john5", label: "John Doe" },
];

const Tabs = () => {
  const [selectedRider, setSelectedRider] = useState("");

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <PageHeader title="Order Details" />
        <div className="flex gap-2 items-center justify-end">
          <PopOver
            trigger={
              <Button className="bg-[#3F2BC3] stroke-ctm-secondary-300" variant={"ctm-primary"}>
                Re-assign Order
              </Button>
            }
            className="bg-ctm-background  border border-ctm-primary-500  rounded-[16px] p-1"
          >
            <RadioItems
              onSubmit={(value) => {
                setSelectedRider(value ?? "");
              }}
              selectedItem={selectedRider}
              items={riders}
              showSearchBox={true}
              searchPlaceholder="Search for rider"
              addButtonText="Re-assign"
            />
          </PopOver>
          <Button variant="ctm-outline" asChild className="border-2">
            <Link href={"/order/update"}>Update</Link>
          </Button>
          <Button variant="ctm-outline" asChild className="border-2 border-[#DA3030]">
            <Link href={"#/order/update"}>
              <Trash className="text-[#DA3030]" />
            </Link>
          </Button>
        </div>
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
