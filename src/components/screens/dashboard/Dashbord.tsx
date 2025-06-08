"use client";
import React, { useState } from "react";
import MetricsTab from "./MetricsTab";
import RecentTransactions from "./RecentTransac";
import Tag from "@/components/general/Tag";
import Link from "next/link";
import { Errand, Order, tag } from "@/types";
import { useGetErrandQuery } from "@/api/errand";
import { useGetOrdersQuery } from "@/api/order";
import { ITransaction, useGetTransactionQuery } from "@/api/transaction";
import { useGetDashboardQuery } from "@/api/dashboard";
import { format } from "date-fns";
import DateRangePicker from "@/components/ui/custom/Daterange";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Dashbord = () => {
  const { isLoading: isLoadingErrands, data: errandsData } = useGetErrandQuery({});
  const { isLoading: isLoadingOrders, data: ordersData } = useGetOrdersQuery({});
  const { isLoading: isLoadingTransac, data: TransacData } = useGetTransactionQuery({});
  const topErrands = errandsData ? errandsData.slice(0, 4) : [];
  const topOrders = ordersData ? ordersData.slice(0, 3) : [];
  const top10Transac = (TransacData?.data?.slice(0, 5) || []) as ITransaction[];
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(today);
  const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";
  const { isLoading: isLoadingDashboard, data: dashboardData } = useGetDashboardQuery({
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  const growthColor = (value?: string | number) => {
    if (typeof value === "string" && value.startsWith("-")) return "text-red-600";
    if (typeof value === "number" && value < 0) return "text-red-600";
    return "text-green-600";
  };

  return (
    <main className="flex flex-col p-6">
      <div className="flex md:flex-row items-center justify-between w-full mb-5">
        <h1 className="text-2xl font-bold">Hello John</h1>
        <div className="flex space-x-3 mb-4 items-center">
          <Select>
            <SelectTrigger className="border p-2 rounded w-40">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {/* {timeFrame === "custom" && ( */}
          <DateRangePicker
            className="border-2 border-black/40"
            fromDate={startDate}
            toDate={endDate}
            onApply={(from, to) => {
              setStartDate(from || undefined);
              setEndDate(to || undefined);
            }}
          />
          {/* )} */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-4">
        <section className="h-full w-full gap-6 flex flex-col">
          <div className="flex flex-row gap-4 justify-between items-center w-full">
            <div className="rounded-lg bg-ctm-primary-50 p-4 w-full flex flex-col">
              <h2 className="text-[#818386] mb-4">All Vendor</h2>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-2xl font-bold">
                  {isLoadingDashboard ? "Loading..." : (dashboardData?.vendors ?? 0)}
                </p>
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
                      fill="#000000"
                    />
                    <path
                      d="M4.39478 4.99979H7.60979C7.80479 4.99979 7.92479 4.78979 7.82479 4.62479L7.50479 4.07478C6.67979 2.63979 5.31978 2.63979 4.49478 4.07478L4.17479 4.62479C4.07979 4.78979 4.19978 4.99979 4.39478 4.99979Z"
                      fill="#000000"
                    />
                  </svg>
                  <p className={growthColor(dashboardData?.growth?.vendors)}>
                    {dashboardData?.growth?.vendors || "0 "}
                  </p>
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-[#FFEDD9] p-4 w-full flex flex-col">
              <h2 className="text-[#818386] mb-4">All Riders</h2>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-2xl font-bold">
                  {isLoadingDashboard ? "Loading..." : (dashboardData?.riders ?? 3)}
                </p>
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
                      fill="#000000"
                    />
                    <path
                      d="M4.39478 4.99979H7.60979C7.80479 4.99979 7.92479 4.78979 7.82479 4.62479L7.50479 4.07478C6.67979 2.63979 5.31978 2.63979 4.49478 4.07478L4.17479 4.62479C4.07979 4.78979 4.19978 4.99979 4.39478 4.99979Z"
                      fill="#000000"
                    />
                  </svg>
                  <p className={growthColor(dashboardData?.growth?.riders)}>
                    {dashboardData?.growth?.riders || "0"}
                  </p>
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-[#E6FFF4] p-4 w-full flex flex-col">
              <h2 className="text-[#818386] mb-4">All Customers</h2>
              <div className="flex flex-row gap-4 items-center">
                <p className="text-2xl font-bold">
                  {isLoadingDashboard ? "Loading..." : (dashboardData?.customers ?? 0)}
                </p>
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
                      fill="#000000"
                    />
                    <path
                      d="M4.39478 4.99979H7.60979C7.80479 4.99979 7.92479 4.78979 7.82479 4.62479L7.50479 4.07478C6.67979 2.63979 5.31978 2.63979 4.49478 4.07478L4.17479 4.62479C4.07979 4.78979 4.19978 4.99979 4.39478 4.99979Z"
                      fill="#000000"
                    />
                  </svg>
                  <p className={growthColor(dashboardData?.growth?.customers)}>
                    {dashboardData?.growth?.customers || "0 "}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <MetricsTab />
          <RecentTransactions data={top10Transac} loading={isLoadingTransac} />{" "}
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
            <div className="space-y-4">
              {isLoadingOrders ? (
                <p className="text-sm text-gray-500">Loading orders...</p>
              ) : topOrders.length === 0 ? (
                <p className="text-sm text-gray-500">No ongoing orders</p>
              ) : (
                topOrders.map((order: Order) => (
                  <div key={order._id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium text-gray-700">
                        {order.customer?.fullName || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{order.type} ·</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₦{Number(order.totalCost).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <Tag tag={order.status as tag} />
                    </div>
                  </div>
                ))
              )}
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
            {isLoadingErrands ? (
              <p className="text-sm text-gray-500">Loading errands...</p>
            ) : topErrands.length > 0 ? (
              topErrands.map((errand: Errand) => {
                const date = new Date(errand.createdAt);
                const formattedDate = format(date, "dd/MM/yyyy");
                const formattedTime = format(date, "hh:mm a");

                return (
                  <div
                    key={errand._id}
                    className="p-3 border rounded-md mb-2 border-gray-100 hover:bg-gray-50 flex justify-between"
                  >
                    <div
                      className="flex flex-col gap-4 basis-[50%]"
                      styl={{ border: "1px dashed blue" }}
                    >
                      <p className="font-medium text-gray-800 text-[16px]">
                        ID: #{errand._id.substring(0, 8)}
                      </p>
                      <p
                        className="text-[12.5px] text-gray-500  w-full"
                        styl={{ border: "1px solid orange" }}
                      >
                        {formattedDate} <span className="ml-[7px]">{formattedTime}</span>
                      </p>
                    </div>
                    <div
                      className="flex flex-col gap-4 justify-items-end text-xs"
                      styl={{ border: "1px solid red" }}
                    >
                      <div className="" styl={{ border: "1px solid blue" }}>
                        <p className="font-medium text-[16px] capitalize text-right">
                          {errand.type}
                        </p>
                      </div>

                      <div className="text-right" styl={{ border: "1px solid blue" }}>
                        <Tag tag={errand.status as tag} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No ongoing errands available.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashbord;
