"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateRangePicker from "@/components/ui/custom/Daterange";
import { DeliveriesSummary, Timeframe } from "../../dashboard/DashboardChart";

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
      <div className="flex justify-between">
        <h3 className="text-lg w-full  text-[#160A62] font-bold mb-4">Deliveries Summary</h3>
        <div className="flex  justify-between  mb-4 items-center">
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
      </div>

     

      <DeliveriesSummary
        timeFrame={timeFrame as Timeframe}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default MetricsTab;
