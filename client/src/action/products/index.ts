import { FetchProductsResponse, Product, ProductOption } from "@/src/@types";
import { axios, makeAxiosRequest } from "@/src/lib/utils";
import { toast } from "sonner";

export const getFeaturedProductsWithAmount = async (amount: number) => {
  try {
    const data = await axios.get(`/products/featured?amount=${amount}`);

    return data.data.data;
  } catch {
    toast.error("Error fetching products", {
      description: "Please try again or reach support if necessary",
    });
    return [];
  }
};

export const getProducts = async ({
  search = "",
  category = "",
  page = 1,
  limit = 10,
}: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<FetchProductsResponse> => {
  try {
    const response = await axios.get<FetchProductsResponse>("/products", {
      params: { search, category, page, limit },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching products: ", error);

    toast.error("Error fetching products", {
      description: "Please try again or reach support if necessary",
    });
    return {
      data: [],
      pagination: {
        currentPage: 0,
        limit: 0,
        total: 0,
        totalPages: 0,
      },
      success: false,
    };
  }
};

export const getProductById = async (id: string) => {
  try {
    const { data } = await axios.get<{ success: boolean; data: Product }>(
      `/products/${id}`
    );
    return data.success ? data.data : {};
  } catch (error) {
    console.error("Error fetching product:", error);
    return {}; // Return empty object to prevent crashes
  }
};

export const getProductBySlug = async (slug?: string) => {
  try {
    const { data } = await axios.get(`/products/slug/${slug}`);
    return data.data;
  } catch (error) {
    console.log("not found");
    throw error;
  }
};

export const getProductRecommendations = async (
  amount: number = 5,
  category?: string
) => {
  try {
    const response = await axios.get("/products/recommendations", {
      params: { amount, category },
    });
    return response.data.data || []; // Ensure it always returns an array
  } catch (err) {
    toast.error("Error fetching products", {
      description: "Please try again or reach support if necessary",
    });
    console.log(err);

    return []; // Return an empty array to prevent crashes in UI
  }
};

export const createProduct = async (
  setIsLoading: (loading: boolean) => void,
  product: {
    name: string;
    description: string;
    productImages: string[];
    slug: string;
    basePrice: number;
    category:
      | "iphone"
      | "macbook"
      | "apple_watch"
      | "ipad"
      | "airpods"
      | "phonecase";
    stock: number;
    productSelectionStep: string[];
  }
) => {
  setIsLoading(true);
  try {
    await makeAxiosRequest<{ url: string }>("post", "/products/", { product });
    toast.success("Success", {
      description: "Product Created.",
    });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    toast.error("Create Product Failed", {
      description:
        "There was an issue creating product, ask maintainer about this issue or view the log.",
    });
  } finally {
    setIsLoading(false);
  }
};

export const createProductOption = async (
  setIsLoading: (loading: boolean) => void,
  product: ProductOption
) => {
  setIsLoading(true);
  try {
    await makeAxiosRequest<{ url: string }>("post", "/products/", { product });
    toast.success("Success", {
      description: "Product Created.",
    });
  } catch (err) {
    console.error("Create product options Error:", err);
    toast.error("Create Product Failed", {
      description:
        "There was an issue creating product, ask maintainer about this issue or view the log.",
    });
  } finally {
    setIsLoading(false);
  }
};
