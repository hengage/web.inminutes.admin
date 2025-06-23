"use client";

import { formatDate, formatNaira } from "@/lib/utils";
import { Suspense } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { ContactCard } from "@/components/general/ContactCard";
import { useParams } from "next/navigation";
import { useGetSingleErrandByIdQuery } from "@/api/errand";
import Link from "next/link";
import { toast } from "react-toastify";
import { getErrandStatusIcon } from "@/lib/comon/order-utils";
import { ErrandStatus, useScrollToActiveStatus } from "@/lib/comon/constant";

const SingleErrandDetails = () => {
  const { errandId } = useParams();
  const { data: singleOrder } = useGetSingleErrandByIdQuery(errandId || "");

  // Mock coordinates (replace with geocoding logic based on deliveryAddress)
  // Mock coordinates as tuples [latitude, longitude]
  const pickupCoords: [number, number] = singleOrder?.pickupCoordinates?.coordinates || [
    4.7775, 7.054,
  ]; // Port Harcourt, Nigeria (example)
  const destinationCoords: [number, number] = singleOrder?.dropoffCoordinates?.coordinates || [
    5.4867, 7.0367,
  ]; // Owerri, Nigeria (example)
  const polyline = [pickupCoords, destinationCoords];

  // Custom marker icons
  const pickupIcon = icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Pickup icon
    iconSize: [38, 38],
  });
  const destinationIcon = icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/833/833472.png", // Destination icon
    iconSize: [38, 38],
  });

  const handleShareAddress = async () => {
    const address = singleOrder?.deliveryAddress || "No address available";

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(address);
        toast.success("Address copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy address");
      }
    } else {
      toast.error("Clipboard API not supported");
    }
  };

  const status = singleOrder?.status.toLowerCase();

  const statusMap = Object.values(ErrandStatus).reduce(
    (map, statusKey, index) => {
      const currentIndex = Object.values(ErrandStatus).findIndex(
        (key) => key.toLowerCase() === status
      );
      // Set to true for all statuses up to and including the current status
      map[statusKey] = currentIndex >= index;
      return map;
    },
    {} as Record<ErrandStatus, boolean>
  );

  // Scroll to active status on mount
  const activeStatusRef = useScrollToActiveStatus(singleOrder?.status);

  return (
    <div className="rounded-md border-ctm-secondary-100 p-2 mt-6 mb-2">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_500px] gap-6">
        {/* Left Column: Map and Tracking */}
        <div className="grid gap-3">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="border-b border-gray-200 mb-4 flex justify-between pb-4 items-center">
              <h3 className="font-bold text-xl text-[#160A62] capitalize">
                Errand Tracking ID:#{singleOrder?._id}
              </h3>
              <span className="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-[#3F2BC3]">
                <svg className="w-2 h-2 text-[#3F2BC3] mr-1" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                {singleOrder?.status}
              </span>
            </div>
            <div className="overflow-x-auto max-w-3xl w-full container mb-4">
              <div className="flex space-x-2 mb-4 pb-4">
                {Object.values(ErrandStatus).map((statusKey) => {
                  const isActive = statusMap[statusKey];
                  return (
                    <div
                      key={statusKey}
                      ref={isActive ? activeStatusRef : null} // Assign ref to active status
                      className={`flex-1 p-2 rounded-lg border border-gray-200 ${
                        isActive ? "bg-white" : "bg-gray-50"
                      } min-w-[200px]`}
                    >
                      <span className="inline-block mb-1">{getErrandStatusIcon(statusKey)}</span>
                      <p className={isActive ? "text-[#3F2BC3] font-medium" : "text-gray-500"}>
                        {statusKey
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={isActive ? "bg-[#3F2BC3] h-2 rounded-full" : "bg-gray-500"}
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <MapContainer
              center={pickupCoords}
              zoom={12}
              style={{ height: "300px", width: "100%" }}
              className="rounded-lg overflow-hidden"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={pickupCoords} icon={pickupIcon}>
                <Popup>Pickup Location</Popup>
              </Marker>
              <Marker position={destinationCoords} icon={destinationIcon}>
                <Popup>Destination</Popup>
              </Marker>
              <Polyline positions={polyline} color="blue" />
            </MapContainer>
          </div>
        </div>

        {/* Right Column: Details Cards */}
        <div className="grid gap-3">
          <ContactCard title="Payments">
            <div className="space-y-2">
              <div className="text-[#484D57] text-base flex justify-between">
                <span>Total Product Cost</span>
                <span> {formatNaira(singleOrder?.totalProductsCost)}</span>
              </div>
              <div className="text-[#484D57] text-base flex justify-between">
                <span>Delivery Fee</span>
                <span>{formatNaira(singleOrder?.dispatchFee)}</span>
              </div>
              <div className="text-[#160A62] text-base  flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>{formatNaira(singleOrder?.totalCost)}</span>
              </div>
            </div>
          </ContactCard>

          <ContactCard title="Delivery">
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Delivery date</span>
                <p>{singleOrder?.createdAt ? formatDate(singleOrder.createdAt) : ""}</p>
              </div>
              <div>
                <span className="font-semibold">Delivery address</span>
                <p>{singleOrder?.dropoffAddress}</p>
                <button onClick={handleShareAddress} className="text-[#3F2BC3] text-sm flex gap-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="12" fill="#EBEBEB" />
                    <path
                      d="M14.4 12.5396V15.0596C14.4 17.1596 13.56 17.9996 11.46 17.9996H8.94C6.84 17.9996 6 17.1596 6 15.0596V12.5396C6 10.4396 6.84 9.59961 8.94 9.59961H11.46C13.56 9.59961 14.4 10.4396 14.4 12.5396Z"
                      stroke="#3F2BC3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.0016 8.94V11.46C18.0016 13.56 17.1616 14.4 15.0616 14.4H14.4016V12.54C14.4016 10.44 13.5616 9.6 11.4616 9.6H9.60156V8.94C9.60156 6.84 10.4416 6 12.5416 6H15.0616C17.1616 6 18.0016 6.84 18.0016 8.94Z"
                      stroke="#3F2BC3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="underline">Copy address</span>
                </button>
              </div>
              <div>
                <span className="font-semibold">Delivery instructions</span>
                <p>{singleOrder?.instruction}</p>
              </div>
            </div>
          </ContactCard>

          <ContactCard title="Others" className="border-b border-gray-200 ">
            <div className="space-y-2">
              <div>
                <span className="text-[#484D57] text-base font-medium">Customer name</span>
                <Link href={`/customer/${singleOrder?._id}`}>
                  <p className="text-[#3F2BC3] text-lg capitalize underline ">
                    {singleOrder?.customer?.fullName}
                  </p>
                </Link>
              </div>
              <div>
                <span className="text-[#484D57] text-base font-medium">Rider name</span>
                <Link href={`/Rider/${singleOrder?._id}`}>
                  <p className="text-[#3F2BC3] text-lg capitalize underline ">
                    {singleOrder?.rider?.fullName}
                  </p>
                </Link>
              </div>
              <div>
                <span className="text-[#484D57] text-base font-medium">Receiver name</span>
                <p className="text-[#3F2BC3] text-lg capitalize underline ">
                  {singleOrder?.receiver?.name || "N/A"}
                </p>
                <p className="text-[#3F2BC3] text-lg capitalize underline ">
                  {singleOrder?.receiver?.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
          </ContactCard>
        </div>
      </div>
    </div>
  );
};

const ErrandDetails = () => (
  <Suspense>
    <SingleErrandDetails />
  </Suspense>
);

export default ErrandDetails;
