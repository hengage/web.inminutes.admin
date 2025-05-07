// components/dashboard/MetricsTab.jsx
import Tab from "@/components/ui/custom/Tabs";
import React from "react";
import { Customers, Riders, Vendors } from "./DashboardChart";

const MetricsTab = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-full flex flex-col">
      <div>
        <h3 className="text-lg font-bold mb-4">Metric Summary</h3>
      </div>
      <div>
        <Tab
          items={[
            {
              trigger: (
                <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                  Vendors
                </button>
              ),
              content: <Vendors />,
              key: "0",
            },
            {
              trigger: (
                <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                  Riders
                </button>
              ),
              content: <Riders />,
              key: "1",
            },
            {
              trigger: (
                <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                  Customers
                </button>
              ),
              content: <Customers />,
              key: "2",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MetricsTab;
