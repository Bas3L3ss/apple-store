import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../action/products";

interface UseGetProductsParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export const useGetProducts = ({
  search = "",
  category = "",
  page = 1,
  limit = 10,
}: UseGetProductsParams) => {
  return useQuery({
    queryKey: ["products", { search, category, page, limit }],
    queryFn: () => getProducts({ search, category, page, limit }),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry fetching twice before failing
  });
};
