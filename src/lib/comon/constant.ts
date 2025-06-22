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
