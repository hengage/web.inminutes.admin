"use client";
import React, { useState } from "react";
import Tab from "@/components/ui/custom/Tabs";
import { Customers, Riders, Timeframe, Vendors } from "./DashboardChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateRangePicker from "@/components/ui/custom/Daterange";

const MetricsTab = () => {
  const [timeFrame, setTimeFrame] = useState("today");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
    if (value !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full h-full flex flex-col">
      <h3 className="text-lg font-bold mb-4">Metric Summary</h3>
      <div className="flex space-x-3 w-full mb-4 items-center">
        <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
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

        {timeFrame === "custom" && (
          <div className="flex items-center w-[300px]">
            <DateRangePicker
              fromDate={startDate ?? undefined}
              toDate={endDate ?? undefined}
              onApply={(from, to) => {
                setStartDate(from);
                setEndDate(to);
              }}
              className="border-2 border-black/40"
            />
          </div>
        )}
      </div>
      <Tab
        items={[
          {
            key: "0",
            trigger: (
              <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                Vendors
              </button>
            ),
            content: (
              <Vendors timeFrame={timeFrame as Timeframe} startDate={startDate} endDate={endDate} />
            ),
          },
          {
            key: "1",
            trigger: (
              <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                Riders
              </button>
            ),
            content: (
              <Riders timeFrame={timeFrame as Timeframe} startDate={startDate} endDate={endDate} />
            ),
          },
          {
            key: "2",
            trigger: (
              <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                Customers
              </button>
            ),
            content: (
              <Customers
                timeFrame={timeFrame as Timeframe}
                startDate={startDate}
                endDate={endDate}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default MetricsTab;
