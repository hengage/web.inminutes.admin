"use client";

import { Call } from "iconsax-react";
import { formatDOB } from "@/lib/utils";
import { Suspense } from "react";
import { MessageSquare } from "lucide-react";
import { useGetSingleCustomersQuery } from "@/api/customers";
import MetricsTab from "./MetricsTab";
import { ContactCard } from "@/components/general/ContactCard";
import CustomerCard from "./CustomerCard";

const CustomersTable = () => {
  // const {params} =

  const customerId =
    typeof window !== "undefined" ? window.location.pathname.split("/").pop() : undefined;

  const { data: singleCustomer } = useGetSingleCustomersQuery(customerId || "");

  return (
    <div>
      <div className="bg-ctm-background  rounded-md border-ctm-secondary-100 p-2 mt-6 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_500px] gap-4">
          <div className=" p-4 w-full grid gap-3">
            <CustomerCard singleCustomer={singleCustomer} />

            <ContactCard title="">
              <MetricsTab />
            </ContactCard>
          </div>
          <div className="grid gap-3">
            <ContactCard title="Contact Details">
              <div className="flex items-center gap-1">
                <div>
                  <h3 className="font-bold flex items-center gap-3 text-lg text-indigo-700 capitalize">
                    <Call size="15" color="#4338ca" /> <span> {singleCustomer?.phoneNumber}</span>
                  </h3>
                  <h3 className="font-normal flex items-center gap-3 text-base text-ctm-secondary-400 capitalize">
                    <MessageSquare size="15" color="#4338ca" />
                    <span>{singleCustomer?.email}</span>
                  </h3>
                </div>
              </div>
            </ContactCard>

            <ContactCard title="Address">
              <div className="flex items-center gap-1">
                <div>
                  <h3 className="font-bold flex items-center gap-3 text-lg text-indigo-700 capitalize">
                    {singleCustomer?.phoneNumber}
                  </h3>
                  <h3 className="font-normal flex items-center gap-3 text-base text-ctm-secondary-400 capitalize">
                    {singleCustomer?.email}
                  </h3>
                </div>
              </div>
            </ContactCard>
            <ContactCard title="Others">
              <div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-normal flex flex-col  gap-2 text-base capitalize">
                    <span>Display name</span>
                    <span>{singleCustomer?.displayName}</span>
                  </h3>
                  <h3 className="font-normal flex flex-col  gap-2 text-base capitalize">
                    <span> Date of birth</span>
                    <span>{formatDOB(singleCustomer?.dateOfBirth)}</span>
                  </h3>
                </div>
              </div>
            </ContactCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const Customers = () => (
  <Suspense>
    <CustomersTable />
  </Suspense>
);

export default Customers;
