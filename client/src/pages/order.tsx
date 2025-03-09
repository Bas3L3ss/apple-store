import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useGetOrdersOfUser } from "../react-query-hooks/use-get-orders-of-user";

import { useAuth } from "../contexts/AuthContext";
import { useCustomerAnalytics } from "../react-query-hooks/use-get-user-buying-analytics";
import OrderHistory from "../components/order/order-history";
import UserAnalytics from "../components/order/user-analytics";
import SEO from "../components/SEO";

export default function OrdersPage() {
  const { account } = useAuth();
  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useCustomerAnalytics(account!.email);

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetOrdersOfUser({ limit, page });

  const isError = analyticsError || ordersError;
  const isLoading = analyticsLoading || ordersLoading;

  const navigate = useNavigate();

  const handleViewDetails = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <>
      {/* TODO: real dynamic SEO */}
      <SEO
        title="My Orders - Track Purchases | Apple store"
        description="View and track your past orders, check order details, and get insights on your purchases."
        canonical="https://myshop.com/orders"
        image="https://myshop.com/static/orders-thumbnail.jpg"
        type="website"
        twitterCard="summary_large_image"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Your Orders",
          description:
            "View and track your past orders, check order details, and get insights on your purchases.",
          url: "https://myshop.com/orders",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://myshop.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Orders",
                item: "https://myshop.com/orders",
              },
            ],
          },
        }}
      />
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-semibold text-gray-900">
              Your Orders
            </h1>
            <p className="text-gray-500 mt-2">
              View and track your recent purchases
            </p>
          </motion.div>

          {/* Analytics Section */}
          {!isLoading && !isError && analytics?.data && (
            <UserAnalytics analytics={analytics} />
          )}

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="w-6 h-6 border-t-2 border-gray-500 rounded-full animate-spin"></div>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <p className="text-red-500">
                There was a problem loading your orders. Please try again later.
              </p>
            </div>
          ) : orders?.data?.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
              <h3 className="text-xl font-medium text-gray-700">
                No orders yet
              </h3>
              <p className="text-gray-500 mt-2">
                When you place orders, they will appear here.
              </p>
            </div>
          ) : (
            <OrderHistory
              handleViewDetails={handleViewDetails}
              orders={orders}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
