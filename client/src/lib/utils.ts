import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Axios from "axios";
import { OrderStatus } from "../@types";

// axios

export const axios = Axios.create({
  baseURL: "http://localhost:8080",
});

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

export function getStatusColor(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PREPARING:
      return "bg-yellow-100 text-yellow-800";
    case OrderStatus.DELIVERING:
      return "bg-blue-100 text-blue-800";
    case OrderStatus.FINISHED:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
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
