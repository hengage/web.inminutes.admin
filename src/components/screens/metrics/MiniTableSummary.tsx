"use client";
import React from "react";

type MiniTableSummaryProps = {
  title: string;
  subTitle?: string;
  subText?: string;
  data?: {
    fullName?: string;
    deliveries?: number;
    totalDeliveries?: number;
    riderId?: string;
    categoryName?: string;
    categoryId?: string;
    vendorCount?: number;
    productCount?: number;
  }[];
};

const MiniTableSummary = ({ title, subTitle, subText, data = [] }: MiniTableSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-[#160A62] border-b pb-2 mb-4">{title}</h2>

      {/* Table Header */}
      <div className="grid grid-cols-[50px_1fr_100px] border-b pb-2 text-sm text-[#160A62] font-semibold mb-2">
        <span>S/N</span>
        <span>{subTitle} name</span>
        <span>{subText}</span>
      </div>

      {/* Table Body */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={index || item?.riderId || item?.categoryId}
            className="grid grid-cols-[50px_1fr_100px] text-sm text-[#656667] py-2 border-b"
          >
            <span className="text-[#656667]">{index + 1}</span>
            <span className="capitalize">{item.fullName || item?.categoryName}</span>
            <span className="text-[#160A62] font-bold">
              {item.deliveries || item?.vendorCount || item?.totalDeliveries || item?.productCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniTableSummary;
