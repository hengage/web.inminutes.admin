"use client";
import React, { useState } from "react";
// import { format } from "date-fns";

import SummaryCard, { MiniTable } from "./SummaryCard";
import MiniTableSummary from "./MiniTableSummary";
import { Timeframe, Vendors } from "./DashboardChart";
const VendorsTab = () => {
  const today = new Date();
  new Date(today.getFullYear(), today.getMonth(), 1);
  const [timeFrame, setTimeFrame] = useState("today");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
    if (value !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const metrics = [
    {
      label: "Total Vendor",
      value: 200,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.8141 7.99714V14.091C14.8141 14.4767 14.6608 14.8467 14.3881 15.1195C14.1153 15.3923 13.7453 15.5455 13.3595 15.5455H4.63809C4.25245 15.5453 3.88267 15.392 3.61004 15.1192C3.33742 14.8465 3.18428 14.4766 3.18428 14.091V7.99714M5.72755 6.63641L6.09118 2.45459M5.72755 6.63641C5.72755 8.74695 8.99882 8.74695 8.99882 6.63641M5.72755 6.63641C5.72755 8.94623 1.97846 8.46913 2.50355 6.45604L3.26355 3.54186C3.34477 3.23061 3.52688 2.95506 3.78138 2.75833C4.03588 2.5616 4.34842 2.45478 4.67009 2.45459H13.3275C13.6492 2.45478 13.9618 2.5616 14.2163 2.75833C14.4708 2.95506 14.6529 3.23061 14.7341 3.54186L15.4941 6.45604C16.0192 8.46986 12.2701 8.94623 12.2701 6.63641M8.99882 6.63641V2.45459M8.99882 6.63641C8.99882 8.74695 12.2701 8.74695 12.2701 6.63641M12.2701 6.63641L11.9065 2.45459"
            stroke="#484D57"
            strokeWidth="1.45455"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Vendor Applicants",
      value: 50,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.82 6.27286V13.3638C14.82 15.5456 13.5181 16.2729 11.9109 16.2729H6.09268C4.48541 16.2729 3.18359 15.5456 3.18359 13.3638V6.27286C3.18359 3.90922 4.48541 3.36377 6.09268 3.36377C6.09268 3.81468 6.27448 4.22195 6.57266 4.52013C6.87085 4.81831 7.27814 5.00013 7.72905 5.00013H10.2745C11.1763 5.00013 11.9109 4.26559 11.9109 3.36377C13.5181 3.36377 14.82 3.90922 14.82 6.27286Z"
            stroke="#484D57"
            strokeWidth="1.45455"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.91 3.36366C11.91 4.26548 11.1754 5.00002 10.2736 5.00002H7.72816C7.27725 5.00002 6.86996 4.8182 6.57178 4.52002C6.2736 4.22184 6.0918 3.81457 6.0918 3.36366C6.0918 2.46184 6.82634 1.72729 7.72816 1.72729H10.2736C10.7245 1.72729 11.1318 1.90912 11.43 2.2073C11.7282 2.50548 11.91 2.91275 11.91 3.36366Z"
            stroke="#484D57"
            strokeWidth="1.81818"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.0918 9.72729H9.00089"
            stroke="#484D57"
            strokeWidth="1.81818"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.0918 12.6362H11.91"
            stroke="#484D57"
            strokeWidth="1.81818"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Vendor Categories",
      value: 14,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.47867 11.5647L6.77322 14.8592C8.12594 16.2119 10.3223 16.2119 11.6823 14.8592L14.875 11.6665C16.2278 10.3138 16.2278 8.1174 14.875 6.7574L11.5732 3.47013C10.8823 2.77922 9.92958 2.40831 8.95503 2.45922L5.31867 2.63377C3.86413 2.69922 2.70776 3.85558 2.63504 5.30286L2.46049 8.93922C2.41685 9.92104 2.78776 10.8738 3.47867 11.5647Z"
            stroke="#484D57"
            strokeWidth="1.45455"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.35529 9.16468C8.35945 9.16468 9.17347 8.35066 9.17347 7.3465C9.17347 6.34235 8.35945 5.52832 7.35529 5.52832C6.35114 5.52832 5.53711 6.34235 5.53711 7.3465C5.53711 8.35066 6.35114 9.16468 7.35529 9.16468Z"
            stroke="#484D57"
            strokeWidth="1.81818"
            strokeLinecap="round"
          />
          <path
            d="M9.89844 12.8009L12.8075 9.89185"
            stroke="#484D57"
            strokeWidth="1.81818"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Sub-Categories",
      value: 20,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.34369 2.52734H11.6637C12.1582 2.52734 12.7764 2.86916 13.0382 3.29098L16.0782 8.14916C16.3691 8.62189 16.3401 9.36371 16.0055 9.80734L12.2383 14.8255C11.9692 15.1819 11.3873 15.4728 10.9437 15.4728H3.34369C2.07096 15.4728 1.30009 14.0764 1.96918 12.9928L3.98369 9.77098C4.25278 9.34189 4.25278 8.64371 3.98369 8.21462L1.96918 4.9928C1.30009 3.92371 2.07823 2.52734 3.34369 2.52734Z"
            stroke="#484D57"
            strokeWidth="1.45455"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const topVendors = [
    { name: "Genesis Foods", percentage: 46 },
    { name: "Genesis Foods", percentage: 50 },
    { name: "Genesis Foods", percentage: 46 },
    { name: "Genesis Foods", percentage: 90 },
    { name: "Genesis Foods", percentage: 46 },
  ];

  const customersData = [
    { name: "Jane Doe", deliveries: 200 },
    { name: "Jane Doe", deliveries: 200 },
    { name: "Jane Doe", deliveries: 200 },
    { name: "Jane Doe", deliveries: 200 },
    { name: "Jane Doe", deliveries: 200 },
  ];

  return (
    <main className="flex flex-col p-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4">
        <section className="h-full w-full gap-6 flex flex-col">
          <div className="bg-white rounded-lg p-4 w-full h-full flex flex-col">
            <h3 className="text-base text-[#2E323A] mb-4">Total Vendors</h3>
            <h2 className="text-xl font-bold text-[#160A62] ">200</h2>

            <Vendors timeFrame={timeFrame as Timeframe} startDate={startDate} endDate={endDate} />
          </div>
        </section>
        <section className="h-full w-full gap-8 flex flex-col">
          <SummaryCard title2="Vendors Summary" metrics={metrics} />
        </section>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <MiniTable
          title="Top 5 Vendors"
          subText="Vendors"
          topList={topVendors}
          onSeeAll={() => alert("See all vendors")}
        />
        <MiniTableSummary
          title="Top 5 Categories"
          subText="Number of vendors"
          subTitle="Category"
          data={customersData}
        />
      </div>
    </main>
  );
};

export default VendorsTab;
