"use client";
import { useGetWorkAreaQuery, useGetSessionQuery, useGetSessionRiderQuery } from "@/api/rider";
import Image from "next/image";
import { Suspense, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

// Define interfaces
interface WorkArea {
  _id: string;
  name: string;
  maxSlotsRequired: number;
  active?: boolean;
}

interface Session {
  _id: string;
  session: string;
  active?: boolean;
}

interface Rider {
  _id: string;
  fullName: string;
  image: string;
}

const Dashboard = () => {
  const { data: workAreas, isLoading: isWorkAreaLoading } = useGetWorkAreaQuery();
  const [selectedWorkAreaId, setSelectedWorkAreaId] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  // Fetch sessions for the selected work area and date
  const { data: sessions, isLoading: isSessionsLoading } = useGetSessionQuery(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    selectedWorkAreaId || ""
  );

  // Fetch riders for the selected session and work area
  const { data: sessionRiders, isLoading: isRidersLoading } = useGetSessionRiderQuery(
    selectedSessionId || "",
    selectedWorkAreaId || ""
  );

  // Handle work area selection
  const handleWorkAreaClick = (workAreaId: string) => {
    setSelectedWorkAreaId(workAreaId);
    setSelectedSessionId(null); // Reset session when work area changes
  };

  // Handle session selection
  const handleSessionClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  if (isWorkAreaLoading) {
    return <div>Loading work areas...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 overflow-x-auto w-full container mb-4">
        {/* Areas Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-[#160A62] mb-4">Areas</h2>
          <div className="grid grid-cols-5 gap-4">
            {workAreas?.map((area: WorkArea) => (
              <div
                key={area._id}
                className={`p-4 rounded-lg text-center cursor-pointer ${
                  area._id === selectedWorkAreaId
                    ? "bg-[#3F2BC3] text-white"
                    : "bg-gray-50 text-gray-700"
                }`}
                onClick={() => handleWorkAreaClick(area._id)}
              >
                <p className="text-sm capitalize">{area.name}</p>
                <p className="text-2xl font-bold">{area.maxSlotsRequired}</p>
                <p className="text-xs">Max. Riders</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar and Sessions Section */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-[#160A62] mb-4">Calendar</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
                showYearSwitcher={true}
                yearRange={12}
                className="!w-full max-w-none rounded-lg"
                selectedClassName="bg-[#160A62] rounded-full text-white"
                todayClassName="bg-gray-200  rounded-full text-gray-800"
                buttonNextClassName="text-[#160A62]"
                buttonPreviousClassName="text-[#160A62]"
                captionLabelClassName="text-[#160A62] font-bold"
              />
            </div>

            {/* Sessions Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-[#160A62] mb-4">Sessions</h2>
              {isSessionsLoading ? (
                <div>Loading sessions...</div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {sessions?.length === 0 && (
                    <div className="text-gray-500">No sessions available for this date.</div>
                  )}
                  {sessions?.map((session: Session) => (
                    <div
                      key={session._id}
                      className={`p-4 border rounded-lg text-center cursor-pointer transition-colors ${
                        session._id === selectedSessionId
                          ? "bg-[#3F2BC3] text-white"
                          : "bg-[#FDFDFD] text-[#34383E] "
                      }`}
                      onClick={() => handleSessionClick(session._id)}
                    >
                      <p className="text-sm">{session.session}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Riders Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-[#160A62] mb-4">Riders</h2>
            {isRidersLoading ? (
              <div>Loading riders...</div>
            ) : (
              <div className="space-y-4">
                {sessionRiders?.length === 0 && (
                  <div className="text-center text-gray-500">
                    No riders available for this session.
                  </div>
                )}

                {sessionRiders?.map((rider: Rider) => (
                  <div key={rider._id} className="flex items-center space-x-4">
                    <Image
                      src={
                        "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg"
                      }
                      alt={rider.fullName}
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                    <div
                      onClick={() => router.push(`rider/${rider?._id}`)}
                      className="cursor-pointer"
                    >
                      <p className="text-sm capitalize font-semibold">{rider.fullName}</p>
                      <p className="text-xs text-gray-500">ID: {rider._id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkStation = () => (
  <Suspense fallback={<div>Loading dashboard...</div>}>
    <Dashboard />
  </Suspense>
);

export default WorkStation;
