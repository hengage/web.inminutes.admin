"use client";
import { useGetWorkAreaQuery } from "@/api/rider";
import Image from "next/image";
import { Suspense } from "react";

// Define wallet interface

// Define WorkArea interface
interface WorkArea {
  name: string;
  maxSlotsRequired: number;
  active?: boolean;
}

// Assume a new hook for wallet data (replace with actual API hook)

const mockRiders = [
  {
    id: 1,
    name: "John Doe",
    image:
      "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    image:
      "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg",
  },
  {
    id: 3,
    name: "John Doe",
    image:
      "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg",
  },
  {
    id: 4,
    name: "John Doe",
    image:
      "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg",
  },
  {
    id: 5,
    name: "John Doe",
    image:
      "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg",
  },
];
const mockSessions = [
  { time: "9am - 12pm", active: true },
  { time: "9am - 12pm" },
  { time: "9am - 12pm" },
];

const Dashboard = () => {
  const { data: workArea } = useGetWorkAreaQuery();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar placeholder - to be implemented separately */}

      {/* Areas Section */}
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-x-auto w-full container mb-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-[#160A62] mb-4">Areas</h2>
          <div className="grid grid-cols-5 gap-4">
            {workArea?.map((area: WorkArea, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg text-center ${
                  area.active ? "bg-[#3F2BC3] text-white" : "bg-gray-50 text-gray-700"
                }`}
              >
                <p className="text-sm capitalize">{area.name}</p>
                <p className="text-2xl font-bold">{area.maxSlotsRequired}</p>
                <p className="text-xs">Max. Riders</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar and Riders Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="">
            <div className="bg-white rounded-lg shadow-md p-4 col-span-1">
              <div className="flex justify-between items-center mb-2">
                <button className="text-[#160A62]">&lt;</button>
                <h3 className="text-lg text-[#160A62] font-bold">September 2023</h3>
                <button className="text-[#160A62]">&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                {/* Days 28-30 */}
                {[
                  28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 25, 26,
                  27, 28, 29, 30, 1,
                ].map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-full ${
                      day === 10 ? "bg-[#3F2BC3] text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Sessions Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-[#160A62] mb-4">Sessions</h2>
              <div className="grid grid-cols-2 gap-4">
                {mockSessions.map((session, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg text-center ${
                      session.active ? "bg-[#3F2BC3] text-white" : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <p className="text-sm">{session.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Riders */}
          <div className="bg-white rounded-lg shadow-md p-4 ">
            <h2 className="text-xl font-bold text-[#160A62] mb-4">Riders</h2>
            <div className="space-y-4">
              {mockRiders.map((rider) => (
                <div key={rider.id} className="flex items-center space-x-4">
                  <Image
                    src={rider.image}
                    alt={rider.name}
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="text-sm font-semibold">{rider.name}</p>
                    <p className="text-xs text-gray-500">10</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkStation = () => (
  <Suspense>
    <Dashboard />
  </Suspense>
);

export default WorkStation;
