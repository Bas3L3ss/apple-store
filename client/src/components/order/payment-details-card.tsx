import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

interface PaymentDetailsCardProps {
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const PaymentDetailsCard = ({
  paymentMethod,
  subtotal,
  shipping,
  tax,
  total,
}: PaymentDetailsCardProps) => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-1">
            Payment Method
          </h4>
          <p className="capitalize">{paymentMethod}</p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${(subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>
              {shipping === 0 ? "Free" : `$${(shipping / 100).toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${(tax / 100).toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${(total / 100).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDetailsCard;
