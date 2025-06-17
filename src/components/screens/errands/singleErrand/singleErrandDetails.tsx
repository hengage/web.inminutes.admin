"use client";

import { formatDate, formatNaira } from "@/lib/utils";
import {  Suspense } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { ContactCard } from "@/components/general/ContactCard";
import { useParams } from "next/navigation";
import TransitIcon from "@/components/ui/transit-icon";
import { useGetSingleErrandByIdQuery } from "@/api/errand";

const SingleErrandDetails = () => {
  const { errandId } = useParams();
  const { data: singleOrder } = useGetSingleErrandByIdQuery(errandId || "");

  console.log(singleOrder, "singleOrder");

  // Mock coordinates (replace with geocoding logic based on deliveryAddress)
  // Mock coordinates as tuples [latitude, longitude]
  const pickupCoords: [number, number] = [4.8156, 7.0498]; // Port Harcourt, Nigeria (example)
  const destinationCoords: [number, number] = [5.4833, 7.0333]; // Owerri, Nigeria (example)
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

  const status = singleOrder?.status.toLowerCase();
  const isInTransit = status === "in-transit";
  const isNearby = status === "nearby";
  const isArrived = status === "arrived";

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
            <div className="flex space-x-2 mb-4 pb-4">
              <div
                className={`flex-1 p-2 rounded-lg  border border-gray-200 ${
                  isInTransit ? "bg-white" : "bg-gray-50"
                }`}
              >
                <span className="inline-block mb-1">
                  <TransitIcon />
                </span>
                <p className={isInTransit ? "text-[#3B82F6] font-medium" : "text-gray-500"}>
                  In-transit
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-[#3B82F6] h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div
                className={`flex-1 p-2 rounded-lg  border border-gray-200 ${
                  isNearby ? "bg-white" : "bg-gray-50"
                }`}
              >
                <span className="inline-block mb-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.627 20.5938C11.6129 20.5859 11.5978 20.5807 11.585 20.5723L11.4844 20.4912L3.50977 12.5156C3.47009 12.4759 3.43726 12.4289 3.40625 12.373L11.627 20.5938ZM20.5947 12.373C20.5638 12.4286 20.5317 12.476 20.4922 12.5156L12.5166 20.4912C12.477 20.5307 12.4296 20.5628 12.374 20.5938L12.8848 20.084L20.085 12.8838L20.5947 12.373ZM14.6328 11.999L12 14.6318L9.36816 11.999L12 9.36719L14.6328 11.999ZM11.1172 3.91602L3.91699 11.1162L3.40625 11.626C3.41418 11.6117 3.42021 11.597 3.42871 11.584L3.50977 11.4834L11.46 3.5332C11.5199 3.47328 11.5782 3.4323 11.6318 3.40039L11.1172 3.91602ZM12.3691 3.40039C12.4022 3.42002 12.4382 3.44118 12.4736 3.4707L12.542 3.5332L20.4922 11.4834C20.5317 11.5229 20.5638 11.5704 20.5947 11.626L12.3691 3.40039Z"
                      fill="#484D57"
                      stroke="#484D57"
                      strokeWidth="2.5"
                    />
                  </svg>
                </span>
                <p className={isNearby ? "text-[#3B82F6] font-medium" : "text-gray-500"}>Nearby</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={isNearby ? "bg-[#3B82F6] h-2 rounded-full" : "bg-gray-500"}
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div
                className={`flex-1 p-2 rounded-lg border border-gray-200 ${
                  isArrived ? "bg-white" : "bg-gray-50"
                }`}
              >
                <span className="inline-block mb-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.99805 4.00049C2.99805 3.73527 3.1034 3.48092 3.29094 3.29338C3.47848 3.10585 3.73283 3.00049 3.99805 3.00049H5.99805C6.26326 3.00049 6.51762 3.10585 6.70515 3.29338C6.89269 3.48092 6.99805 3.73527 6.99805 4.00049V8.00049C6.99805 8.26571 6.89269 8.52006 6.70515 8.7076C6.51762 8.89513 6.26326 9.00049 5.99805 9.00049H3.99805C3.73283 9.00049 3.47848 8.89513 3.29094 8.7076C3.1034 8.52006 2.99805 8.26571 2.99805 8.00049V4.00049ZM15.998 17.0005C15.998 17.5309 16.2088 18.0396 16.5838 18.4147C16.9589 18.7898 17.4676 19.0005 17.998 19.0005C18.5285 19.0005 19.0372 18.7898 19.4123 18.4147C19.7873 18.0396 19.998 17.5309 19.998 17.0005C19.998 16.4701 19.7873 15.9613 19.4123 15.5863C19.0372 15.2112 18.5285 15.0005 17.998 15.0005C17.4676 15.0005 16.9589 15.2112 16.5838 15.5863C16.2088 15.9613 15.998 16.4701 15.998 17.0005Z"
                      stroke="#484D57"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99805 5H16.998C19.759 5 21.998 8.134 21.998 12V17H19.998M15.998 17H7.99805"
                      stroke="#484D57"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 5L17.5 12H22M9.5 10H17M12 5V10M5 9V20"
                      stroke="#484D57"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className={isArrived ? "text-[#3B82F6] font-medium" : "text-gray-500"}>
                  Arrived
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={isArrived ? "bg-[#3B82F6] h-2 rounded-full" : "bg-gray-500"}
                    style={{ width: "100%" }}
                  ></div>
                </div>
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
                <span>{formatNaira(singleOrder?.deliveryFee)}</span>
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
                <p>{singleOrder?.deliveryAddress}</p>
                <button className="text-indigo-600 text-sm">Copy address</button>
              </div>
              <div>
                <span className="font-semibold">Delivery instructions</span>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Volutpat vel ac mus placerat at malesuada.
                </p>
              </div>
            </div>
          </ContactCard>

          <ContactCard title="Others" className="border-b border-gray-200 ">
            <div className="space-y-2">
              <div>
                <span className="text-[#484D57] text-base font-medium">Customer name</span>
                <p className="text-[#3F2BC3] text-lg capitalize underline ">
                  {singleOrder?.customer?.fullName}
                </p>
              </div>
              <div>
                <span className="text-[#484D57] text-base font-medium">Rider name</span>
                <p className="text-[#3F2BC3] text-lg capitalize underline ">
                  {singleOrder?.rider?.fullName || "N/A"}
                </p>
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
