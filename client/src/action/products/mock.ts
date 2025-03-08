import { makeAxiosRequest } from "@/src/lib/utils";
import { toast } from "sonner";

export const createMockData = async (
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true);
  try {
    await makeAxiosRequest<{ url: string }>("post", "/products/test");
    toast.success("Success", {
      description: "Product Created.",
    });
  } catch (err) {
    console.error("Mock data creation failed:", err);
    toast.error("Create Product Failed", {
      description:
        "There was an issue creating product, ask maintainer about this issue or view the log.",
    });
  } finally {
    setIsLoading(false);
  }
};
