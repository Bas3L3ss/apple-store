// lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Axios from "axios";

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

export const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const checkIsNew = (createdAt: string | Date) => {
  //@ts-expect-error : i don't know how to deal with this problem tho it's working so i'll let it slide
  return new Date() - new Date(createdAt) < 30 * 24 * 60 * 60 * 1000;
};
