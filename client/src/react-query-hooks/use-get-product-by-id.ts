import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../action/products";

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // Prevents the query from running if ID is empty
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry twice before failing
  });
};
