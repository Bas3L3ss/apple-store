import {
  formatDate,
  formatPrice,
  formatShippingAddress,
  getStatusColor,
} from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

type Props = {
  orders:
    | {
        data: any[];
        pagination: any;
      }
    | undefined;

  handleViewDetails: (orderId: string) => void;
  page: number;
  setPage: (page: number) => void;
};

const OrderHistory = ({ orders, handleViewDetails, page, setPage }: Props) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Order History</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <AnimatePresence mode="wait">
          {orders?.data?.map((order) => (
            <motion.div
              key={order._id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              whileHover={{
                y: -2,
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.03)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <h3 className="font-medium text-gray-800 mb-1 truncate">
                    Order #{order._id.substring(order._id.length - 8)}
                  </h3>

                  <div className="text-sm text-gray-500 mb-2">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"} •{" "}
                    {formatPrice(order.calculatedTotal)}
                  </div>

                  {order.estimatedDelivery && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {formatDate(order.estimatedDelivery)}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleViewDetails(order._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-150"
                  >
                    Details <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>

              {order.shippingAddress && (
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                  <div className="text-sm">
                    <span className="text-gray-500">Shipping to:</span>{" "}
                    <span className="text-gray-700">
                      {formatShippingAddress(order.shippingAddress)}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {orders?.pagination && orders.pagination.totalPages > 1 && (
          <div className="flex justify-center pt-6">
            <div className="inline-flex items-center rounded-lg bg-white border border-gray-200 shadow-sm">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`p-2 rounded-l-lg ${
                  page === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="px-4 py-2 text-sm font-medium text-gray-700 border-x border-gray-200">
                Page {page} of {orders.pagination.totalPages}
              </div>

              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, orders.pagination.totalPages)
                  )
                }
                disabled={page === orders.pagination.totalPages}
                className={`p-2 rounded-r-lg ${
                  page === orders.pagination.totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrderHistory;
