import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeData(data: string) {
  return Buffer.from(data).toString("base64");
}

export function decodeData(data: string) {
  return Buffer.from(data, "base64").toString("utf-8");
}
