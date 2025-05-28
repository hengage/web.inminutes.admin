import { formatDate } from "@/lib/utils";
import Image from "next/image"; // Remove if not using Next.js

// Define the shape of the singleCustomer object
export interface Customer {
  _id?: string;
  fullName?: string;
  createdAt?: string;
  profileImage?: string;
  totalOrders?: number;
  totalErrands?: number;
  lastUpdate?: string;
  status?: string;
  dateOfBirth?: string;
  displayName?: string;
}

// Define the props for the CustomerCard component
interface CustomerCardProps {
  singleCustomer?: Customer;
  //   formatDate: (date: string) => string;
}

const CustomerCard = ({ singleCustomer }: CustomerCardProps) => {
  // Default values to handle undefined props
  const customer: Customer = {
    _id: singleCustomer?._id || "#32678FGBDF",
    fullName: singleCustomer?.fullName || "Jane Doe",
    createdAt: singleCustomer?.createdAt || "2025-01-14",
    profileImage:
      singleCustomer?.profileImage ||
      "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg",
    totalOrders: singleCustomer?.totalOrders || 15,
    totalErrands: singleCustomer?.totalErrands || 10,
    lastUpdate: singleCustomer?.lastUpdate || "18/09/2024",
    status: singleCustomer?.status || "Active",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full">
      <div className="border-b border-gray-200 mb-4 flex justify-between items-center">
        <h3 className="font-bold text-lg text-indigo-900 capitalize">ID: {customer._id}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          <svg className="w-2 h-2 text-green-500 mr-1" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" />
          </svg>
          {customer.status}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Image
          src={customer.profileImage || ""}
          alt={customer.fullName || "Customer"}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg text-indigo-700 capitalize">{customer.fullName}</h3>
          <h3 className="font-normal text-sm text-indigo-600 capitalize">
            Customer Since: {formatDate(customer.createdAt)}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h4 className="text-sm text-gray-500">Total Orders</h4>
          <p className="text-lg font-bold text-indigo-700">{customer.totalOrders}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500">Total Errands</h4>
          <p className="text-lg font-bold text-indigo-700">{customer.totalErrands}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500">Last Update</h4>
          <p className="text-lg font-bold text-indigo-700">{customer.lastUpdate}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
