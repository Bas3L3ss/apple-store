import { useQuery } from "@tanstack/react-query";
import { getProductRecommendations } from "../action/products";

export const useProductRecommendations = (
  amount: number = 5,
  category?: string
) => {
  return useQuery({
    queryKey: ["product-recommendations", { amount, category }],
    queryFn: () => getProductRecommendations(amount, category),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
