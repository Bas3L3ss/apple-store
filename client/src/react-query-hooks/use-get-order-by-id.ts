import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../action/orders";

export const useGetOrderOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId, // Prevents fetching if orderId is not provided
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1, // Only retry once on failure
  });
};
