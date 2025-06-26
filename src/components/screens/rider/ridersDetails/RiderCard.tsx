import { Rider } from "@/api/rider";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

// Define the props for the RiderCard component
interface RiderCardProps {
  singleRider?: Rider;
}

const RiderCard = ({ singleRider }: RiderCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full">
      <div className="flex items-center gap-2 mb-12">
        <Image
          src={
            singleRider?.profileImage ||
            "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg"
          }
          alt={singleRider?.fullName || "Rider"}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg text-ctm-primary-700 capitalize">
            {singleRider?.fullName || "John Doe"}
          </h3>
          <h3 className="font-normal text-sm text-[#656667] capitalize">
            Rider Since: {singleRider?.createdAt ? formatDate(singleRider.createdAt) : "N/A"}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h4 className="text-sm font-semibold text-gray-500">TOTAL DELIVERIES</h4>
          <p className="text-lg font-bold text-ctm-primary-700">
            {singleRider?.totalOrders ?? "N/A"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500">LAST UPDATE</h4>
          <p className="text-lg font-bold text-ctm-primary-700">
            {singleRider?.createdAt ? formatDate(singleRider?.createdAt) : "N/A"}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500">OVERALL RATING</h4>
          <p className="text-lg font-bold flex items-center justify-center gap-1 text-ctm-primary-700">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9416 2.9252L13.4083 5.85853C13.6083 6.26686 14.1416 6.65853 14.5916 6.73353L17.2499 7.1752C18.9499 7.45853 19.3499 8.69186 18.1249 9.90853L16.0583 11.9752C15.7083 12.3252 15.5166 13.0002 15.6249 13.4835L16.2166 16.0419C16.6833 18.0669 15.6083 18.8502 13.8166 17.7919L11.3249 16.3169C10.8749 16.0502 10.1333 16.0502 9.67492 16.3169L7.18326 17.7919C5.39992 18.8502 4.31659 18.0585 4.78326 16.0419L5.37492 13.4835C5.48326 13.0002 5.29159 12.3252 4.94159 11.9752L2.87492 9.90853C1.65826 8.69186 2.04992 7.45853 3.74992 7.1752L6.40826 6.73353C6.84992 6.65853 7.38326 6.26686 7.58326 5.85853L9.04992 2.9252C9.84992 1.33353 11.1499 1.33353 11.9416 2.9252Z"
                fill="#F6C61E"
                stroke="#F6C61E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {singleRider?.rating?.averageRating?.toFixed(2) ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderCard;
