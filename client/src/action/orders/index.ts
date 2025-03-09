import { makeAxiosRequest } from "@/src/lib/utils";

export const getOrdersOfUser = async (
  page = 1,
  limit = 10
): Promise<{ data: any[]; pagination: any }> => {
  try {
    const response = await makeAxiosRequest<{ data: any[]; pagination: any }>(
      "get",
      `/orders?page=${page}&limit=${limit}`
    );
    console.log(response, "any thing?");

    return response;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      data: [],
      pagination: { page, limit, totalPages: 1, totalOrders: 0 },
    };
  }
};

export const getCustomerAnalytics = async () => {
  try {
    return await makeAxiosRequest<{ data: any[] }>("get", `/orders/analytics`);
  } catch (error) {
    console.error("Failed to fetch customer analytics:", error);
    return {
      data: [],
    };
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    return await makeAxiosRequest("get", `/orders/${orderId}`);
  } catch {
    return []; // Return empty array on failure to handle edge cases
  }
};
