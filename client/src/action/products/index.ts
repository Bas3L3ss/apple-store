import { ProductOption } from "@/src/@types";
import { makeAxiosRequest } from "@/src/lib/utils";
import { toast } from "sonner";

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
