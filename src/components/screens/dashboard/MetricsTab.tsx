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
import { DatePicker } from "@/components/ui/custom/date/DatePicker";

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
    <div className="bg-white rounded-lg p-4 w-full flex flex-col">
      <h3 className="text-lg font-bold mb-4">Metric Summary</h3>
      <div className="flex flex-wrap gap-4 mb-4">
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
          <div className="flex gap-4">
            <div>
              <label className="block text-sm mb-2">Start Date</label>
              <DatePicker
                value={startDate}
                onSelect={(date: Date | null | undefined) => {
                  if (date !== undefined) {
                    setStartDate(date);
                  }
                }}
                className="border p-2 rounded w-40"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">End Date</label>
              <DatePicker
                value={endDate}
                onSelect={(date: Date | null | undefined) => {
                  if (date !== undefined) {
                    setEndDate(date);
                  }
                }}
                className="border p-2 rounded w-40"
              />
            </div>
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
