import { useQuery } from "@tanstack/react-query";
import { getCustomerAnalytics } from "../action/orders";

export const useCustomerAnalytics = (email: string) => {
  return useQuery({
    queryKey: ["customerAnalytics", email],
    queryFn: () => getCustomerAnalytics(),
    enabled: !!email, // Only fetch if email is available
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2,
  });
};
