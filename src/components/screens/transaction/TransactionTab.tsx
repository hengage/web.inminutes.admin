"use client";
import React, { useState } from "react";
import Tab from "@/components/ui/custom/Tabs";

import Transaction from "./Transaction";

const TransactionTab = () => {
  const [activeTab, setActiveTab] = useState<string>("0");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">Transactions</h1>
      </div>

      <div>
        <Tab
          value={activeTab}
          onValueChange={handleTabChange}
          items={[
            {
              trigger: (
                <button className="px-4 py-2 text-sm font-medium hover:text-indigo-700">
                  All Transactions
                </button>
              ),
              content: <Transaction />,
              key: "0",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TransactionTab;
