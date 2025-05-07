"use client";
import React from "react";
import MetricsTab from "./MetricsTab";
import RecentTransactions from "./RecentTransac";
import Tag from "@/components/general/Tag";
import Link from "next/link";
import { DatePicker } from "@/components/ui/custom/date/DatePicker";
import { tag } from "@/types";
const ongoingOrdersData = [
  {
    id: "#5567BER042",
    date: "18/09/2019",
    time: "07:58 pm",
    accountStatus: "picked-up",
    additionalStatus: "Instant",
  },
  {
    id: "#6437B9KVMD",
    date: "28/10/2019",
    time: "01:40 pm",
    accountStatus: "in-transit",
    additionalStatus: "Scheduled",
  },
  {
    id: "#73219RV6FD",
    date: "16/08/2019",
    time: "06:41 pm",
    accountStatus: "pending",
    additionalStatus: "Instant",
  },
  {
    id: "#73219RV6FD",
    date: "16/08/2019",
    time: "06:41 pm",
    accountStatus: "ready",
    additionalStatus: "Instant",
  },
];
// const ongoingErrandsData = [
//   {
//     id: "#5567BER042",
//     date: "18/09/2019",
//     time: "07:58 pm",
//     accountStatus: "scheduled",
//     additionalStatus: "in-transit",
//   },
//   {
//     id: "#6437B9KVMD",
//     date: "18/09/2019",
//     time: "07:59 pm",
//     accountStatus: "instant",
//     additionalStatus: "delivered",
//   },
//   {
//     id: "#6437B9KVMD",
//     date: "18/09/2019",
//     time: "07:59 pm",
//     accountStatus: "scheduled",
//     additionalStatus: "pending",
//   },
// ];
const Dashbord = () => {
  return (
    <main className="flex flex-col  p-6">
      <div className="flex flex-row items-center justify-between w-full mb-5">
        <h1 className="text-2xl font-bold">Hello John</h1>
        <div>
          <DatePicker placeholder="26\10\2022" triggerclassName="" />
        </div>{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-4 ">
        <section className="h-full w-full gap-6 flex flex-col">
          <div className="flex flex-row gap-4 justify-between items-center w-full">
            <div className="rounded-lg bg-ctm-primary-50 p-4 w-full  flex flex-col">
              <h2 className="text-[#818386] mb-4">All Riders</h2>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-2xl font-bold">200</p>
                <span className="rounded-lg bg-white px-1 flex w-fit items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.66508 9H7.33508C8.99509 9 9.67009 7.825 8.84509 6.39L8.47509 5.75C8.38509 5.595 8.22009 5.5 8.04008 5.5H3.96008C3.78008 5.5 3.61508 5.595 3.52508 5.75L3.15508 6.39C2.33008 7.825 3.00508 9 4.66508 9Z"
                      fill="#DA3030"
                    />
                    <path
                      d="M4.39478 4.99979H7.60979C7.80479 4.99979 7.92479 4.78979 7.82479 4.62479L7.50479 4.07478C6.67979 2.63979 5.31978 2.63979 4.49478 4.07478L4.17479 4.62479C4.07979 4.78979 4.19978 4.99979 4.39478 4.99979Z"
                      fill="#DA3030"
                    />
                  </svg>
                  <p className="text-[#DA3030]">12.8%</p>
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-[#FFEDD9] p-4 w-full  flex flex-col">
              <h2 className="text-[#818386] mb-4">All Riders</h2>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-2xl font-bold">200</p>
                <span className="rounded-lg bg-white px-1 flex w-fit items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.66508 9H7.33508C8.99509 9 9.67009 7.825 8.84509 6.39L8.47509 5.75C8.38509 5.595 8.22009 5.5 8.04008 5.5H3.96008C3.78008 5.5 3.61508 5.595 3.52508 5.75L3.15508 6.39C2.33008 7.825 3.00508 9 4.66508 9Z"
                      fill="#578921"
                    />
                    <path
                      d="M4.39478 4.99979H7.60979C7.80479 4.99979 7.92479 4.78979 7.82479 4.62479L7.50479 4.07478C6.67979 2.63979 5.31978 2.63979 4.49478 4.07478L4.17479 4.62479C4.07979 4.78979 4.19978 4.99979 4.39478 4.99979Z"
                      fill="#578921"
                    />
                  </svg>
                  <p className="text-[#578921]">12.8%</p>
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-[#E6FFF4] p-4 w-full  flex flex-col">
              <h2 className="text-[#818386] mb-4">All Customers</h2>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-2xl font-bold">200</p>
                <span className="rounded-lg bg-white px-1 flex w-fit items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.66508 9H7.33508C8.99509 9 9.67009 7.825 8.84509 6.39L8.47509 5.75C8.38509 5.595 8.22009 5.5 8.04008 5.5H3.96008C3.78008 5.5 3.61508 5.595 3.52508 5.75L3.15508 6.39C2.33008 7.825 3.00508 9 4.66508 9Z"
                      fill="#DA3030"
                    />
                    <path
                      d="M4.39478 4.99979H7.60979C7.80479 4.99979 7.92479 4.78979 7.82479 4.62479L7.50479 4.07478C6.67979 2.63979 5.31978 2.63979 4.49478 4.07478L4.17479 4.62479C4.07979 4.78979 4.19978 4.99979 4.39478 4.99979Z"
                      fill="#DA3030"
                    />
                  </svg>
                  <p className="text-[#DA3030]">12.8%</p>
                </span>
              </div>
            </div>
          </div>
          <MetricsTab />
          <RecentTransactions />{" "}
        </section>
        <section className="h-full w-full gap-6 flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Ongoing Orders</h3>
              <Link
                href="/orders"
                className="text-sm text-ctm-primary-500 hover:text-ctm-primary-500"
              >
                See all
              </Link>
            </div>
            <div className="space-y-1">
              {ongoingOrdersData.map((order, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm">ID:{order.id}</p>
                    <p className="text-xs text-gray-500">
                      {order.date} {order.time}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <h2 className="font-semibold text-sm mb-2">{order.additionalStatus}</h2>
                    <Tag tag={order.accountStatus.toLowerCase() as tag} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Ongoing Errands</h3>
              <Link
                href="/errands"
                className="text-sm text-ctm-primary-500 hover:text-ctm-primary-500"
              >
                See all
              </Link>
            </div>
            <div className="space-y-1">
              {ongoingOrdersData.map((order, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm">ID:{order.id}</p>
                    <p className="text-xs text-gray-500">
                      {order.date} {order.time}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <h2 className="font-semibold text-sm mb-2">{order.additionalStatus}</h2>
                    <Tag tag={order.accountStatus.toLowerCase() as tag} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashbord;
