import { formatDate } from "@/lib/utils";
import Image from "next/image"; // Remove if not using Next.js

// Define the shape of the singleCustomer object
export interface Customer {
  _id?: string;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
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


  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full">
      <div className="border-b border-gray-200 mb-4 flex justify-between pb-4 items-center">
        <h3 className="font-bold text-lg text-[#2E323A] capitalize">ID: {singleCustomer?._id}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-[#3F2BC3]">
          <svg className="w-2 h-2 text-[#3F2BC3] mr-1" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" />
          </svg>
          {singleCustomer?.status || 'Active'}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Image
          src={
            singleCustomer?.profileImage ||
            "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg"
          }
          alt={singleCustomer?.fullName || "singleCustomer?"}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg  text-ctm-primary-700 capitalize">
            {singleCustomer?.fullName}
          </h3>
          <h3 className="font-normal text-sm text-[#656667] capitalize">
            Customer Since: {formatDate(singleCustomer?.createdAt)}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h4 className="text-sm font-semibold text-gray-500">TOTAL ORDERS </h4>
          <p className="text-lg font-bold text-ctm-primary-700">{singleCustomer?.totalOrders}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500">TOTAL ERRANDS</h4>
          <p className="text-lg font-bold text-ctm-primary-700">{singleCustomer?.totalErrands}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500">LAST UPDATE</h4>
          <p className="text-lg font-bold text-ctm-primary-700">
            {formatDate(singleCustomer?.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
