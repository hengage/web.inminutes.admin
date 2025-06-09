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
      <div className="rounded-md border-ctm-secondary-100 p-2 mt-6 mb-2">
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
                  <h3 className=" flex items-center gap-3 text-lg text-[#656667]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="16" fill="#F1F2F3" />
                      <path
                        d="M23.976 21.064C23.976 21.352 23.912 21.648 23.776 21.936C23.64 22.224 23.464 22.496 23.232 22.752C22.84 23.184 22.408 23.496 21.92 23.696C21.44 23.896 20.92 24 20.36 24C19.544 24 18.672 23.808 17.752 23.416C16.832 23.024 15.912 22.496 15 21.832C14.08 21.16 13.208 20.416 12.376 19.592C11.552 18.76 10.808 17.888 10.144 16.976C9.488 16.064 8.96 15.152 8.576 14.248C8.192 13.336 8 12.464 8 11.632C8 11.088 8.096 10.568 8.288 10.088C8.48 9.6 8.784 9.152 9.208 8.752C9.72 8.248 10.28 8 10.872 8C11.096 8 11.32 8.048 11.52 8.144C11.728 8.24 11.912 8.384 12.056 8.592L13.912 11.208C14.056 11.408 14.16 11.592 14.232 11.768C14.304 11.936 14.344 12.104 14.344 12.256C14.344 12.448 14.288 12.64 14.176 12.824C14.072 13.008 13.92 13.2 13.728 13.392L13.12 14.024C13.032 14.112 12.992 14.216 12.992 14.344C12.992 14.408 13 14.464 13.016 14.528C13.04 14.592 13.064 14.64 13.08 14.688C13.224 14.952 13.472 15.296 13.824 15.712C14.184 16.128 14.568 16.552 14.984 16.976C15.416 17.4 15.832 17.792 16.256 18.152C16.672 18.504 17.016 18.744 17.288 18.888C17.328 18.904 17.376 18.928 17.432 18.952C17.496 18.976 17.56 18.984 17.632 18.984C17.768 18.984 17.872 18.936 17.96 18.848L18.568 18.248C18.768 18.048 18.96 17.896 19.144 17.8C19.328 17.688 19.512 17.632 19.712 17.632C19.864 17.632 20.024 17.664 20.2 17.736C20.376 17.808 20.56 17.912 20.76 18.048L23.408 19.928C23.616 20.072 23.76 20.24 23.848 20.44C23.928 20.64 23.976 20.84 23.976 21.064Z"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-miterlimit="10"
                      />
                    </svg>

                    <span> {singleCustomer?.phoneNumber}</span>
                  </h3>
                  <h3 className=" pt-3 flex items-center gap-3 text-base text-[#656667]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="16" fill="#F1F2F3" />
                      <path
                        d="M16.0004 12.7995V7.99951L14.4004 9.59951"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 7.99951L17.6 9.59951"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.0008 15.9995C8.80078 15.9995 8.80078 17.4315 8.80078 19.1995V19.9995C8.80078 22.2075 8.80078 23.9995 12.8008 23.9995H19.2008C22.4008 23.9995 23.2008 22.2075 23.2008 19.9995V19.1995C23.2008 17.4315 23.2008 15.9995 20.0008 15.9995C19.2008 15.9995 18.9768 16.1675 18.5608 16.4795L17.7448 17.3435C16.8008 18.3515 15.2008 18.3515 14.2488 17.3435L13.4408 16.4795C13.0248 16.1675 12.8008 15.9995 12.0008 15.9995Z"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.4004 15.9994V14.3994C10.4004 12.7914 10.4004 11.4634 12.8004 11.2314"
                        stroke="#160A62"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21.5992 15.9994V14.3994C21.5992 12.7914 21.5992 11.4634 19.1992 11.2314"
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
                  <h3 className=" flex items-center gap-3 text-lg text-[#656667]">
                    {singleCustomer?.phoneNumber}
                  </h3>
                  <h3 className="flex items-center gap-3 text-base text-[#656667]">
                    {singleCustomer?.email}
                  </h3>
                </div>
              </div>
            </ContactCard>
            <ContactCard title="Others">
              <div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-normal flex flex-col  gap-2 text-base capitalize">
                    <span className='font-semibold'>Display name</span>
                    <span>{singleCustomer?.displayName}</span>
                  </h3>
                  <h3 className="font-normal flex flex-col  gap-2 text-base capitalize">
                    <span className="font-semibold"> Date of birth</span>
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
