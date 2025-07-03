"use client";
import Tab from "@/components/ui/custom/Tabs";
import useUrlHash from "@/hooks/useUrlHash";
import Link from "next/link";
import React, { Suspense } from "react";
import { CustomButton as Button } from "@/components/ui/custom/button";
import RiderDetails from "./SingleRiderDetails";
import PageHeader from "@/components/general/PageHeader";
import { useParams, useRouter } from "next/navigation";
import PopOver from "@/components/ui/custom/PopOver";
import { Trash } from "lucide-react";
import RiderWallet from "./WalletDetailes";
import RiderActivityTable from "./RiderActivityTable";

const Tabs = () => {
  const { hashParams, updateHashUrl } = useUrlHash();
  const router = useRouter();
  const { riderId } = useParams<{ riderId?: string }>();

  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <PageHeader onBack={() => router.push("/rider")} title="Rider Details" />
        <div className="flex gap-2 items-center justify-end">
          {(hashParams.tab === "0" || !hashParams.tab) && (
            <>
              <PopOver
                // open={isPopOverOpen}
                // onOpenChange={setIsPopOverOpen}
                trigger={
                  <Button
                    className="bg-[#3F2BC3] stroke-ctm-secondary-300"
                    variant={"ctm-primary"}
                    // onClick={() => setIsPopOverOpen(true)}
                  >
                    Restrict Rider
                  </Button>
                }
                className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-4 w-96"
              >
                <div>loading...</div>
                {/* <div className="flex flex-col gap-4">
              <CustomInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for rider"
                slotAfter={<Icon name="arrow-down" height={16} width={16} />}
              />

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
                  <p className="text-gray-500">Getting nearby riders...</p>
                ) : (
                  filteredRiders.map((rider: any) => (
                    <Radio key={rider._id} value={rider._id} label={rider.fullName} />
                  ))
                )}
              </RadioGroup>

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
            </div> */}
              </PopOver>
            </>
          )}

          <Button disabled variant="ctm-outline" asChild className="border-2">
            <Link href={"/rider/update"}>Update</Link>
          </Button>
          {(hashParams.tab === "0" || !hashParams.tab) && (
            <>
              <Button variant="ctm-outline" asChild className="border-2 border-[#DA3030]">
                <Link href={"#/rider"}>
                  <Trash className="text-[#DA3030]" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <Tab
        items={[
          {
            trigger: (
              <Link
                href={{
                  pathname: `/rider/${riderId}`,
                  query: { page: 1, limit: 30 },
                  hash: updateHashUrl({ tab: "0" }).substring(1),
                }}
              >
                Rider Info
              </Link>
            ),
            content: <RiderDetails />,
            key: "0",
          },
          {
            trigger: (
              <Link
                href={{
                  pathname: `/rider/${riderId}`,
                  query: { page: 1, limit: 30 },
                  hash: updateHashUrl({ tab: "1" }).substring(1),
                }}
              >
                Deliveries
              </Link>
            ),
            content: <RiderActivityTable />,
            key: "1",
          },
          {
            trigger: (
              <Link
                href={{
                  pathname: `/rider/${riderId}`,
                  query: { page: 1, limit: 30 },
                  hash: updateHashUrl({ tab: "2" }).substring(1),
                }}
              >
                Wallet
              </Link>
            ),
            content: <RiderWallet />,
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
