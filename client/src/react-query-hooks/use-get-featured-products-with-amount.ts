import { useQuery } from "@tanstack/react-query";
import { getFeaturedProductsWithAmount } from "../action/products";

export const useGetFeaturedProductsWithAmount = (amount: number) => {
  return useQuery({
    queryKey: ["featuredProducts", amount],
    queryFn: () => getFeaturedProductsWithAmount(amount),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
