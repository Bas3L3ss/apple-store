import { ArrowLeft, AlertTriangle } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import { Navigate, useNavigate, useParams } from "react-router";
import { formatDate, getStatusProgress } from "../lib/utils";
import { useGetOrderById } from "../react-query-hooks/use-get-order-by-id";
import SEO from "../components/SEO";
import OrderStatusCard from "../components/order/order-status-card";
import OrderItemsCard from "../components/order/order-item-card";
import ShippingInfoCard from "../components/order/shipping-info-card";
import PaymentDetailsCard from "../components/order/payment-details-card";
import HelpCard from "../components/order/order-help-card";

export default function OrderDetailsPage() {
  const router = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetOrderById(id);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-t-blue-600 border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{"Error Loading Order"}</h2>
          <p className="text-gray-600 mb-6">
            {"We couldn't load your order details. Please try again later."}
          </p>

          <Button onClick={() => router("/order")}>{"Return to Orders"}</Button>
        </div>
      </div>
    );
  }

  // Handle not found state
  if (!data || !data.data) {
    return <Navigate to={"/not-found"} />;
  }

  const order = data.data;
  const orderStatus = order.status;
  const progressPercent = getStatusProgress(orderStatus);
  const taxAmount = order.calculatedTotal * 0.085;
  const totalWithTax = order.calculatedTotal * 1.085;

  // Extract payment method for display
  const paymentMethodDisplay =
    order.paymentMethod.split(":")[1]?.replace("-", " ") || "Credit Card";

  return (
    <>
      <SEO
        title={`Order ${order._id} Details | Apple Store`}
        description={`View details for your order ${
          order._id
        } placed on ${formatDate(order.createdAt)}`}
        type="website"
      />

      <div className="container mx-auto px-4 py-8 max-w-8xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router("/order")}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>

          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <div className="text-gray-500">
            Order {order._id} • Placed on {formatDate(order.createdAt)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <OrderStatusCard
              status={orderStatus}
              estimatedDelivery={order.estimatedDelivery}
              progressPercent={progressPercent}
              createdAt={order.createdAt}
            />

            <OrderItemsCard
              // @ts-expect-error: no problem
              items={order.items}
              calculatedTotal={order.calculatedTotal}
            />
          </div>

          <div className="space-y-6">
            <ShippingInfoCard
              estimatedDelivery={order.estimatedDelivery}
              shippingAddress={order.shippingAddress ?? null}
              orderNotes={order.orderNotes || ""}
            />

            <PaymentDetailsCard
              paymentMethod={paymentMethodDisplay}
              subtotal={order.calculatedTotal}
              shipping={0}
              tax={taxAmount}
              total={totalWithTax}
            />

            <HelpCard />
          </div>
        </div>
      </div>
    </>
  );
}
