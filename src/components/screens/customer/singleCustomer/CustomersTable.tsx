"use client";

import { formatDOB } from "@/lib/utils";
import { Suspense } from "react";
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
                  <h3 className="font-bold flex items-center gap-3 text-lg text-[#656667] capitalize">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.976 15.064C17.976 15.352 17.912 15.648 17.776 15.936C17.64 16.224 17.464 16.496 17.232 16.752C16.84 17.184 16.408 17.496 15.92 17.696C15.44 17.896 14.92 18 14.36 18C13.544 18 12.672 17.808 11.752 17.416C10.832 17.024 9.912 16.496 9 15.832C8.08 15.16 7.208 14.416 6.376 13.592C5.552 12.76 4.808 11.888 4.144 10.976C3.488 10.064 2.96 9.152 2.576 8.248C2.192 7.336 2 6.464 2 5.632C2 5.088 2.096 4.568 2.288 4.088C2.48 3.6 2.784 3.152 3.208 2.752C3.72 2.248 4.28 2 4.872 2C5.096 2 5.32 2.048 5.52 2.144C5.728 2.24 5.912 2.384 6.056 2.592L7.912 5.208C8.056 5.408 8.16 5.592 8.232 5.768C8.304 5.936 8.344 6.104 8.344 6.256C8.344 6.448 8.288 6.64 8.176 6.824C8.072 7.008 7.92 7.2 7.728 7.392L7.12 8.024C7.032 8.112 6.992 8.216 6.992 8.344C6.992 8.408 7 8.464 7.016 8.528C7.04 8.592 7.064 8.64 7.08 8.688C7.224 8.952 7.472 9.296 7.824 9.712C8.184 10.128 8.568 10.552 8.984 10.976C9.416 11.4 9.832 11.792 10.256 12.152C10.672 12.504 11.016 12.744 11.288 12.888C11.328 12.904 11.376 12.928 11.432 12.952C11.496 12.976 11.56 12.984 11.632 12.984C11.768 12.984 11.872 12.936 11.96 12.848L12.568 12.248C12.768 12.048 12.96 11.896 13.144 11.8C13.328 11.688 13.512 11.632 13.712 11.632C13.864 11.632 14.024 11.664 14.2 11.736C14.376 11.808 14.56 11.912 14.76 12.048L17.408 13.928C17.616 14.072 17.76 14.24 17.848 14.44C17.928 14.64 17.976 14.84 17.976 15.064Z"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-miterlimit="10"
                      />
                    </svg>
                    <span> {singleCustomer?.phoneNumber}</span>
                  </h3>
                  <h3 className="font-normal flex items-center gap-3 text-base text-ctm-secondary-400 capitalize">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0004 6.79951V1.99951L8.40039 3.59951"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 1.99951L11.6 3.59951"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.00078 9.99951C2.80078 9.99951 2.80078 11.4315 2.80078 13.1995V13.9995C2.80078 16.2075 2.80078 17.9995 6.80078 17.9995H13.2008C16.4008 17.9995 17.2008 16.2075 17.2008 13.9995V13.1995C17.2008 11.4315 17.2008 9.99951 14.0008 9.99951C13.2008 9.99951 12.9768 10.1675 12.5608 10.4795L11.7448 11.3435C10.8008 12.3515 9.20078 12.3515 8.24878 11.3435L7.44078 10.4795C7.02478 10.1675 6.80078 9.99951 6.00078 9.99951Z"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.40039 9.99945V8.39945C4.40039 6.79145 4.40039 5.46345 6.80039 5.23145"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.5992 9.99945V8.39945C15.5992 6.79145 15.5992 5.46345 13.1992 5.23145"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{singleCustomer?.email}</span>
                  </h3>
                </div>
              </div>
            </ContactCard>

            <ContactCard title="Address">
              <div className="flex items-center gap-1">
                <div>
                  <h3 className="font-bold flex items-center gap-3 text-lg text-[#656667] capitalize">
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
