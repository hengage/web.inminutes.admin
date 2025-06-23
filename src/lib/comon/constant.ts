"use client";

import { useEffect, useRef } from "react";

export const types = [
  { label: "Instant", value: "instant" },
  { label: "Scheduled", value: "scheduled" },
];

export const status = [
  { label: "Pending", value: "pending" },
  { label: "Ready", value: "ready" },
  { label: "Active", value: "active" },
  { label: "In-Transit", value: "in-transit" },
  { label: "NearBy", value: "nearby" },
  { label: "Approved", value: "approved" },
  { label: "Arrived", value: "arrived" },
];

export const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Ready", value: "ready" },
  { label: "Active", value: "active" },
  { label: "In-Transit", value: "in-transit" },
  { label: "NearBy", value: "nearby" },
  { label: "Approved", value: "approved" },
  { label: "Arrived", value: "arrived" },
];

export enum ORDER_STATUS {
  PENDING = "pending",
  REQUEST_CONFIRMED = "request confirmed",
  READY = "ready",
  IN_TRANSIT = "in transit",
  NEARBY = "nearby",
  ARRIVED = "arrived",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum ErrandStatus {
  PENDING = "pending",
  RIDER_ASSIGNED = "rider assigned",
  PICKED_UP = "picked up",
  IN_TRANSIT = "in transit",
  NEARBY = "nearby",
  ARRIVED_DELIVERY_LOCATION = "arrived delivery location",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export const useScrollToActiveStatus = <T>(status: T) => {
  const activeStatusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeStatusRef.current) {
      activeStatusRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [status]);

  return activeStatusRef;
};
