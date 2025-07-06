"use client";
import React from "react";

type Metric = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

type TopListItem = {
  name: string;
  subLabel?: string;
  percentage?: number;
  value?: string;
};

type SummaryCardProps = {
  title?: string;
  subTitle?: string;
  title2?: string;
  metrics?: Metric[];
  topList?: TopListItem[];
  onSeeAll?: () => void;
};

type MiniTableSummaryProps = {
  title: string;
  subText?: string;
  topList: TopListItem[];
  onSeeAll?: () => void;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  subTitle,
  title2,
  metrics = [],
  topList = [],
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-[#160A62] mb-4">{title}</h2>
      {title2 && <h3 className="text-base text-[#656667]">{title2}</h3>}

      {/* Metrics Section */}
      {title2 && (
        <div className="grid mt-12 grid-cols-2 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="">
              <div className="w-10 h-10 mxauto mb-2 bg-[#EEEBFF] rounded flex items-center justify-center">
                <span className="text-gray-500">{metric.icon}</span>
              </div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="text-2xl font-bold text-[#160A62]">{metric.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Top List Section */}
      {topList.length > 0 && (
        <div>
          <div className="flex justify-between border-b pb-2 items-center mb-4">
            <h2 className="text-xl font-bold text-[#160A62] ">{subTitle}</h2>
          </div>
          <div className="space-y-2">
            {topList.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="text-sm text-gray-700">{item.name}</p>
                  {item.subLabel && <p className="text-xs text-gray-500">{item.subLabel}</p>}
                </div>
                <div className="text-right">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#3F2BC3] h-2.5 rounded-full"
                      style={{ width: `${item.percentage || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;

export const MiniTable = ({ title, subText, topList }: MiniTableSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-[#160A62] border-b pb-2 mb-4">{title}</h2>
      <div className="grid grid-cols-[50px_1fr_200px]  border-b pb-2 text-sm text-[#160A62] font-semibold mb-2">
        <span>S/N</span>
        <span>{subText} name</span>
        <span>Popularity</span>
      </div>
      <div className="space-y-2">
        {topList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[50px_1fr_200px] text-sm text-gray-700 py-2 border-b"
          >
            <span className="text-gray-500">{index + 1}</span>
            <span>{item.name}</span>
            <div className="text-right flex items-center gap-3">
              <div className="w-24 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#3F2BC3] h-2.5 rounded-full"
                  style={{ width: `${item.percentage || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1 border p-2 px-4 rounded border-[#0D0D0E]">
                {item.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
