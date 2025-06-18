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
import { useReAssignOrderMutation } from "@/api/order";
import { toast } from "react-toastify";
import { useGetNearByRidersQuery } from "@/api/rider";
import { useParams } from "next/navigation";

const Tabs = () => {
  const { orderId } = useParams<{ orderId?: string }>();

  const [selectedRider, setSelectedRider] = useState("");
  const { data: riders, isLoading } = useGetNearByRidersQuery();

  const { mutateAsync: reassignOrder } = useReAssignOrderMutation();

  const handleAssignOrders = async (riderId: string | null) => {
    if (!orderId) {
      toast.error("Order ID is missing");
      return;
    }

    try {
      await reassignOrder({
        orderId,
        data: { riderId },
      });
      toast.success("Order reassigned successfully");
      setSelectedRider(""); // Reset selected rider
    } catch (err) {
      toast.error("Error reassigning order");
    }
  };

  const radioItems = riders
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      riders.map((rider: any) => ({
        value: rider._id,
        label: rider.fullName,
      }))
    : [];

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
              items={radioItems}
              selectedItem={selectedRider}
              onSubmit={(value) => handleAssignOrders(value)} // Trigger reassignment on Apply
              showSearchBox={true}
              searchPlaceholder="Search for rider"
              addButtonText="Re-assign" // Customize button text
              disabled={isLoading}
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
