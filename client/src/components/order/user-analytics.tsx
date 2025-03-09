import { calculateTimeSinceLastPurchase, formatPrice } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { Calendar, CreditCard, ShoppingBag, TrendingUp } from "lucide-react";

type Props = {
  analytics: {
    data: any[];
  };
};

const UserAnalytics = ({ analytics }: Props) => {
  const analyticItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1,
      },
    },
  };
  return (
    <motion.div
      variants={analyticItemVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your Shopping Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-50 p-3 mr-4">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-xl font-semibold text-gray-900">
                  {analytics.data.totalOrders}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="rounded-full bg-green-50 p-3 mr-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatPrice(analytics.data.totalSpent)}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="rounded-full bg-purple-50 p-3 mr-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Purchase</p>
                <p className="text-xl font-semibold text-gray-900">
                  {calculateTimeSinceLastPurchase(analytics.data.lastPurchase)}
                </p>
              </div>
            </div>
          </div>

          {analytics.data.totalOrders > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-sm text-gray-500">
                  Average order value:{" "}
                  <span className="font-medium text-gray-700">
                    {formatPrice(
                      analytics.data.totalSpent / analytics.data.totalOrders
                    )}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserAnalytics;
