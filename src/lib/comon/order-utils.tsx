import React from "react";
import TransitIcon from "@/components/ui/transit-icon"; // Ensure this path is correct
import { ErrandStatus, ORDER_STATUS } from "./constant";

export const getStatusIcon = (status: string) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
    case ORDER_STATUS.IN_TRANSIT:
      return <TransitIcon />;
    case ORDER_STATUS.READY:
    case ORDER_STATUS.NEARBY:
      return (
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
      );
    case ORDER_STATUS.ARRIVED:
    case ORDER_STATUS.DELIVERED:
      return (
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
      );
    case ORDER_STATUS.CANCELLED:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 11V17"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11V17"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 7H20"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 7H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case ORDER_STATUS.REQUEST_CONFIRMED:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 15.17L7.41 11.59L8.83 10.17L11 12.34L15.17 8.17L16.59 9.59L11 15.17Z"
            fill="#484D57"
          />
        </svg>
      );
    default:
      return null;
  }
};
export const getErrandStatusIcon = (status: string) => {
  switch (status) {
    case ErrandStatus.PENDING:
    case ErrandStatus.IN_TRANSIT:
      return <TransitIcon />;
    case ErrandStatus.RIDER_ASSIGNED:
    case ErrandStatus.NEARBY:
      return (
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
      );
    case ErrandStatus.ARRIVED_DELIVERY_LOCATION:
    case ErrandStatus.DELIVERED:
      return (
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
      );
    case ErrandStatus.CANCELLED:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 11V17"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11V17"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 7H20"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 7H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7"
            stroke="#484D57"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case ErrandStatus.PICKED_UP:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 15.17L7.41 11.59L8.83 10.17L11 12.34L15.17 8.17L16.59 9.59L11 15.17Z"
            fill="#484D57"
          />
        </svg>
      );
    default:
      return null;
  }
};

export interface GraphProps {
  startDate: Date | null;
  endDate: Date | null;
}

export const transformChartData = (
  data: { _id: { year: number; month: number }; count: number }[]
) => {
  return data?.map((item) => ({
    date: `${new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" })} ${item._id.year}`,
    count: item.count,
  }));
};

export const transformCompareChartData = (data: {
  totalRiders: { _id: { year: number; month: number }; count: number }[];
  activeRiders: { _id: { year: number; month: number }; count: number }[];
}) => {
  // Create a map to combine data by date
  const dataMap = new Map<string, { date: string; Riders: number; ActiveRiders: number }>();

  // Process totalRiders
  data.totalRiders.forEach((item) => {
    const date = `${new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" })} ${item._id.year}`;
    dataMap.set(date, { date, Riders: item.count, ActiveRiders: 0 });
  });

  // Process activeRiders and merge with totalRiders
  data.activeRiders.forEach((item) => {
    const date = `${new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" })} ${item._id.year}`;
    const existing = dataMap.get(date) || { date, Riders: 0, ActiveRiders: 0 };
    dataMap.set(date, { ...existing, ActiveRiders: item.count });
  });

  // Convert map to array and sort by date
  return Array.from(dataMap.values()).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });
};
export const transformVendorsChartData = (data: {
  totalVendors: { _id: { year: number; month: number }; count: number }[];
  activeVendors: { _id: { year: number; month: number }; count: number }[];
}) => {
  // Create a map to combine data by date
  const dataMap = new Map<string, { date: string; Vendors: number; ActiveVendors: number }>();

  // Process totalVendors
  data.totalVendors.forEach((item) => {
    const date = `${new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" })} ${item._id.year}`;
    dataMap.set(date, { date, Vendors: item.count, ActiveVendors: 0 });
  });

  // Process activeVendors and merge with totalVendors
  data.activeVendors.forEach((item) => {
    const date = `${new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" })} ${item._id.year}`;
    const existing = dataMap.get(date) || { date, Vendors: 0, ActiveVendors: 0 };
    dataMap.set(date, { ...existing, ActiveVendors: item.count });
  });

  // Convert map to array and sort by date
  return Array.from(dataMap.values()).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });
};
