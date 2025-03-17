import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Axios from "axios";
import { OrderStatus, ShippingAddress } from "../@types";
import { colorHexMap } from "../constants/color";
import { BACKEND_URL } from "../constants";

export const axios = Axios.create({
  // TODO: replace with env domain
  baseURL: BACKEND_URL ?? "http://localhost:5000",
});

export const makeAxiosRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown
): Promise<T> => {
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("remember");

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return response.data;
  } catch (error) {
    // @ts-expect-error: fine
    throw error?.response?.data?.message || error.message;
  }
};

// other utils

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const checkIsNew = (createdAt: string | Date) => {
  //@ts-expect-error : i don't know how to deal with this problem tho it's working so i'll let it slide
  return new Date() - new Date(createdAt) < 30 * 24 * 60 * 60 * 1000;
};
export function formatDate(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

export function formatEstimatedDelivery(estimatedDate: string) {
  const now = new Date();
  const deliveryDate = new Date(estimatedDate);

  // If the delivery date is in the past, fallback to dd/mm/yyyy format
  if (deliveryDate < now) {
    return deliveryDate.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
  }

  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  // @ts-expect-error: this is fine
  const diffInDays = Math.ceil((deliveryDate - now) / oneDay);

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";
  if (diffInDays === 2) return "Next 2 days";
  if (diffInDays <= 7) return "Next week";
  if (diffInDays <= 14) return "Next 2 weeks";
  if (diffInDays <= 30) return "Next month";

  return deliveryDate.toLocaleDateString("en-GB"); // Default fallback
}

export const getStatusProgress = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PREPARING:
      return 33;
    case OrderStatus.DELIVERING:
      return 66;
    case OrderStatus.FINISHED:
      return 100;
    default:
      return 0;
  }
};

// Function to get hex color
export const getColorHex = (color: string): string => {
  return colorHexMap[color] || "#000000"; // Default to black if not found
};
// Format address for display
export const formatAddress = (address: ShippingAddress) => {
  if (!address) return "";
  const { line1, line2, city, state, postalCode } = address;
  const line2Display = line2 ? `, ${line2}` : "";
  return `${line1}${line2Display}, ${city}, ${state} ${postalCode}`;
};

export const formatShippingAddress = (addressStr: string) => {
  if (!addressStr) return "No address provided";
  try {
    const address = JSON.parse(addressStr);
    return address.fullAddress || "No address provided";
  } catch {
    return "Into the moon!";
  }
};

export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "preparing":
      return "bg-amber-100 text-amber-800";
    case "delivering":
      return "bg-blue-100 text-blue-800";
    case "finished":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const calculateTimeSinceLastPurchase = (lastPurchaseDate: string) => {
  const now = new Date();
  const lastPurchase = new Date(lastPurchaseDate);
  const diffTime = Math.abs(now.getTime() - lastPurchase.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};
