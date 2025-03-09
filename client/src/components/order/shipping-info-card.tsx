"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { MapPin, Clock, Info } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { formatEstimatedDelivery } from "@/src/lib/utils";

interface AddressCoordinates {
  lat: number;
  lng: number;
}

interface ShippingAddress {
  fullAddress: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: AddressCoordinates;
}

interface ShippingInfoCardProps {
  shippingAddress: string | ShippingAddress;
  orderNotes?: string;
  estimatedDelivery?: string;
}

const ShippingInfoCard: React.FC<ShippingInfoCardProps> = ({
  shippingAddress,
  orderNotes = "",
  estimatedDelivery = "2-3 business days",
}) => {
  // Parse the address if it's a string
  const addressData: ShippingAddress =
    typeof shippingAddress === "string"
      ? JSON.parse(shippingAddress)
      : shippingAddress;

  // Format address for display
  const formatAddress = () => {
    const { line1, line2, city, state, postalCode, country } = addressData;
    const formattedLine2 = line2 ? `${line2}, ` : "";
    return (
      <>
        <p className="font-medium text-base">{line1}</p>
        <p className="text-gray-600">
          {formattedLine2}
          {city}, {state} {postalCode}
        </p>
        <p className="text-gray-600">{country}</p>
      </>
    );
  };

  return (
    <Card className="shadow-md border-0  ">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>

      <CardContent className="p-6 pb-15">
        <div className="divide-y divide-gray-100">
          {/* Address Section */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-gray-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-500">
                  Delivery Address
                </h4>
                {formatAddress()}
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-500">
                  Estimated Delivery
                </h4>
                <p className="font-medium text-base">
                  {formatEstimatedDelivery(estimatedDelivery)}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Notes */}
          {orderNotes && (
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Info className="h-4 w-4 text-gray-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500">
                    Delivery Notes
                  </h4>
                  <p className="text-gray-700">
                    {orderNotes || "No special instructions"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
      </CardContent>
    </Card>
  );
};

export default ShippingInfoCard;
