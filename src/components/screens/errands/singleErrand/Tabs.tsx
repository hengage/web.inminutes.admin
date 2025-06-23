/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { Suspense, useMemo, useState } from "react";
import { CustomButton as Button } from "@/components/ui/custom/button";
import PageHeader from "@/components/general/PageHeader";
import { Trash } from "lucide-react";
import PopOver from "@/components/ui/custom/PopOver";
import ErrandDetails from "./singleErrandDetails";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useReAssignErrandMutation,
  useGetNearByRidersQuery,
  useGetSingleErrandByIdQuery,
} from "@/api/errand";
import Radio from "@/components/ui/custom/radio/Radio";
import { RadioGroup } from "@/components/ui/radio-group";
import { CustomInput } from "@/components/ui/custom/input";
import { Icon } from "@/components/ui/Icon";
import { Button as GenericButton } from "@/components/ui/button";

const Tabs = () => {
  const { errandId } = useParams<{ errandId?: string }>();
  const [selectedRider, setSelectedRider] = useState("");
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { refetch } = useGetSingleErrandByIdQuery(errandId || "");
  const router = useRouter();

  const { data: riders, isLoading } = useGetNearByRidersQuery(
    {
      lng: 3.4013347,
      lat: 6.5378218,
      distanceInKM: 7.9,
    },
    { skip: !isPopOverOpen }
  );
  const { mutateAsync: reassignOrder, isPending } = useReAssignErrandMutation();

  const handleAssignOrders = async (riderId: string | null) => {
    if (!errandId) {
      toast.error("Order ID is missing");
      return;
    }

    try {
      const res = (await reassignOrder({
        errandId,
        data: { riderId },
      })) as { status?: boolean };
      if (res?.status) {
        setIsPopOverOpen(false);
        toast.success("Errand reassigned successfully");
        setSelectedRider(""); // Reset selected rider
      }
    } catch (err) {
      toast.error("Error reassigning order");
    }
  };

  const filteredRiders = useMemo(() => {
    if (!riders) return [];
    return riders.filter((rider: any) =>
      rider.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [riders, searchQuery]);

  const handleClose = () => {
    setIsPopOverOpen(false);
    setSelectedRider("");
    setSearchQuery(""); // Optional: Reset search query on close
  };

  const handleRefresh = () => {
    refetch(); // Trigger refetch of singleOrder data
  };

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <PageHeader onBack={() => router.push("/errand")} title="Errand Details" />
        <div className="flex gap-2 items-center justify-end">
          <PopOver
            open={isPopOverOpen}
            onOpenChange={setIsPopOverOpen}
            trigger={
              <Button
                className="bg-[#3F2BC3] stroke-ctm-secondary-300"
                variant={"ctm-primary"}
                onClick={() => setIsPopOverOpen(true)}
              >
                Re-assign Order
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-4 w-96"
          >
            <div className="flex flex-col gap-4">
              {/* Search Input */}
              <CustomInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for rider"
                slotAfter={<Icon name="arrow-down" height={16} width={16} />}
              />

              {/* Rider Radio Group */}
              <RadioGroup
                value={selectedRider}
                onValueChange={(value) => setSelectedRider(value)}
                disabled={isLoading}
                className="flex flex-col gap-2 max-h-60 overflow-y-auto"
              >
                {filteredRiders.length === 0 && !isLoading && (
                  <p className="text-gray-500">No riders found</p>
                )}
                {isLoading ? (
                  <p className="text-gray-500">Loading riders...</p>
                ) : (
                  filteredRiders.map((rider: any) => (
                    <Radio key={rider._id} value={rider._id} label={rider.fullName} />
                  ))
                )}
              </RadioGroup>

              {/* Re-assign Button */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAssignOrders(selectedRider)}
                  disabled={isLoading || !selectedRider || isPending}
                  className="bg-ctm-primary-500 text-white rounded-lg p-2 hover:bg-ctm-primary-600 disabled:opacity-50"
                >
                  {isPending ? "Please wait" : "Re-assign"}
                </Button>
                <Button onClick={handleClose} variant={"ctm-outline"}>
                  Cancel
                </Button>
              </div>
            </div>
          </PopOver>
          <GenericButton
            onClick={handleRefresh}
            className="border border-ctm-primary-500 bg-background shadow-sm hover:bg-transparent  text-ctm-primary-500 "
          >
            Refresh
          </GenericButton>
          <Button variant="ctm-outline" asChild className="border-2 border-[#DA3030]">
            <Link href={"#/order"}>
              <Trash className="text-[#DA3030]" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="w-full">
        <ErrandDetails />
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
