"use client";

import { formatDate, formatNaira } from "@/lib/utils";
import { Fragment, Suspense } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { ContactCard } from "@/components/general/ContactCard";
import { useParams } from "next/navigation";
import { useGetSingleOrderByIdQuery } from "@/api/order";

const SingleOrderDetails = () => {
  const { orderId } = useParams();
  const { data: singleOrder } = useGetSingleOrderByIdQuery(orderId || "");

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

  return (
    <div className="rounded-md border-ctm-secondary-100 p-2 mt-6 mb-2">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_500px] gap-6">
        {/* Left Column: Map and Tracking */}
        <div className="grid gap-3">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold text-[#2E323A] mb-2">
              Order Tracking ID#{singleOrder?._id}
            </h2>
            <div className="flex space-x-2 mb-4">
              <button className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                In-transit
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-500">
                Nearby
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-500">
                Arrived
              </button>
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
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-[#160A62] text-xl font-bold  mb-2">Products</h2>
            <div className="grid grid-cols-[1fr_100px_100px] gap-2 text-sm">
              <span className="text-[#160A62] text-lg font-semibold">Product ID</span>
              <span className="text-[#160A62] text-lg  font-semibold">Quantity</span>
              <span className="text-[#160A62] text-lg  font-semibold">Price</span>
              {singleOrder?.items?.map((item, index) => (
                <Fragment key={index}>
                  <span>ID#{item.product}</span>
                  <span>{item.quantity}</span>
                  <span>{formatNaira(item.cost)}</span>
                </Fragment>
              ))}
            </div>
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
                <p>{formatDate(singleOrder?.createdAt)}</p>
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

          <ContactCard title="Others" className="border-b-4 border-gray-200">
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
                <span className="text-[#484D57] text-base font-medium">Vendor name</span>
                <p className="text-[#3F2BC3] text-lg capitalize underline ">
                  {singleOrder?.vendor?.businessName || "N/A"}
                </p>
              </div>
            </div>
          </ContactCard>
        </div>
      </div>
    </div>
  );
};

const OrderDetails = () => (
  <Suspense>
    <SingleOrderDetails />
  </Suspense>
);

export default OrderDetails;
