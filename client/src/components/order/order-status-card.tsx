import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { formatDate, formatEstimatedDelivery } from "../../lib/utils";

interface OrderStatusCardProps {
  status: string;
  estimatedDelivery: string;
  progressPercent: number;
  createdAt: string;
}

const OrderStatusCard = ({
  status,
  estimatedDelivery,
  progressPercent,
  createdAt,
}: OrderStatusCardProps) => {
  console.log(estimatedDelivery);

  return (
    <Card className="shadow-md border-0 mb-6">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Status: {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="text-gray-500">
              Estimated Delivery: {formatEstimatedDelivery(estimatedDelivery)}
            </span>
          </div>

          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-blue-600 transition-all duration-500"
            />
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full p-2 ${
                  progressPercent >= 33
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Package size={20} />
              </div>
              <span className="text-sm mt-1">Preparing</span>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`rounded-full p-2 ${
                  progressPercent >= 66
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Truck size={20} />
              </div>
              <span className="text-sm mt-1">Delivering</span>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`rounded-full p-2 ${
                  progressPercent >= 100
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <CheckCircle size={20} />
              </div>
              <span className="text-sm mt-1">Delivered</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-lg mb-3">Estimated Timeline</h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="mr-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle size={20} />
                </div>
              </div>
              <div>
                <div className="font-medium">Order Placed</div>
                <div className="text-sm text-gray-500">
                  {formatDate(createdAt)}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4">
                <div
                  className={`h-10 w-10 rounded-full ${
                    progressPercent >= 33
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  } flex items-center justify-center`}
                >
                  {progressPercent >= 33 ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>
              </div>
              <div>
                <div className="font-medium">Processing</div>
                <div className="text-sm text-gray-500">
                  {progressPercent >= 33 ? "Completed" : "In progress..."}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4">
                <div
                  className={`h-10 w-10 rounded-full ${
                    progressPercent >= 66
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  } flex items-center justify-center`}
                >
                  {progressPercent >= 66 ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>
              </div>
              <div>
                <div className="font-medium">Shipping</div>
                <div className="text-sm text-gray-500">
                  {progressPercent >= 66 ? "In transit" : "Pending"}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4">
                <div
                  className={`h-10 w-10 rounded-full ${
                    progressPercent >= 100
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  } flex items-center justify-center`}
                >
                  {progressPercent >= 100 ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>
              </div>
              <div>
                <div className="font-medium">Delivery</div>
                <div className="text-sm text-gray-500">
                  {progressPercent >= 100
                    ? "Delivered"
                    : `Expected by ${formatDate(estimatedDelivery)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusCard;
