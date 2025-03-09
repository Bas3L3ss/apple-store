// import { useEffect, useState } from "react";
// import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/src/components/ui/card";
// import { Separator } from "@/src/components/ui/separator";
// import { Button } from "@/src/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/src/components/ui/table";
// import { Badge } from "@/src/components/ui/badge";
// import { motion } from "framer-motion";
// import { Order, OrderItem, OrderStatus, PaymentMethod } from "@/src/@types";
// import { useNavigate, useParams } from "react-router";
// import { formatDate, getStatusProgress } from "../lib/utils";
// import { useGetOrderOrderById } from "../react-query-hooks/use-get-order-by-id";

// const mockOrdersDetails: Order[] = Array(15)
//   .fill(null)
//   .map((_, index) => {
//     const status = [
//       OrderStatus.PREPARING,
//       OrderStatus.DELIVERING,
//       OrderStatus.FINISHED,
//     ][Math.floor(Math.random() * 3)];
//     const products = [
//       { name: "iPhone 15 Pro", image: "/iphone.png", basePrice: 999 },
//       { name: 'MacBook Pro 16"', image: "/macbook.png", basePrice: 2499 },
//       { name: "AirPods Pro", image: "/airpods.png", basePrice: 249 },
//       { name: "Apple Watch Series 9", image: "/watch.png", basePrice: 399 },
//       { name: 'iPad Pro 12.9"', image: "/ipad.png", basePrice: 1099 },
//     ];

//     const items: OrderItem[] = Array(Math.floor(Math.random() * 3) + 1)
//       .fill(null)
//       .map((_, itemIndex) => {
//         const product = products[Math.floor(Math.random() * products.length)];
//         const quantity = Math.floor(Math.random() * 2) + 1;
//         return {
//           id: `item-${index}-${itemIndex}`,
//           orderId: `ORDER${100000 + index}`,
//           productId: product.name.toLowerCase().replace(/\s+/g, ""),
//           productName: product.name,
//           productImage: product.image,
//           selectedOptions: ["128GB", "256GB", "Space Gray", "Silver"],
//           quantity: quantity,
//           finalPrice: product.basePrice * quantity,
//         };
//       });

//     const calculatedTotal = items.reduce(
//       (total, item) => total + item.finalPrice,
//       0
//     );

//     return {
//       id: `ORDER${100000 + index}`,
//       userId: `user-${Math.floor(Math.random() * 1000)}`,
//       calculatedTotal,
//       items,
//       shippingAddress: "1 Apple Park Way, Cupertino, CA 95014",
//       status,
//       createdAt: new Date(
//         Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
//       ),
//       updatedAt: new Date(),
//       estimatedDelivery: new Date(
//         Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
//       ),
//       paymentMethod: PaymentMethod.CC,
//       orderNotes:
//         Math.random() > 0.7 ? "Please leave package at the front door" : "",
//     };
//   });

// export default function OrderDetailsPage() {
//   const router = useNavigate();
//   const { id } = useParams();
//   const { data } = useGetOrderOrderById(id);
//   console.log(data);

//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       setTimeout(() => {
//         const foundOrder = mockOrdersDetails.find((o) => o.id === id);
//         setOrder(foundOrder || mockOrdersDetails[0]);
//         setLoading(false);
//       }, 500);
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12 flex justify-center items-center h-64">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="h-12 w-64 bg-gray-200 rounded-md mb-4"></div>
//           <div className="h-64 w-full max-w-4xl bg-gray-100 rounded-lg"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Order not found</h2>
//           <Button onClick={() => router("/order")}>Return to Orders</Button>
//         </div>
//       </div>
//     );
//   }

//   const progressPercent = getStatusProgress(order.status);

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-6"
//       >
//         <Button
//           variant="ghost"
//           onClick={() => router("/order")}
//           className="mb-4 hover:bg-gray-100"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
//         </Button>

//         <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
//         <div className="text-gray-500">
//           Order {order.id} • Placed on {formatDate(order.createdAt)}
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="md:col-span-2"
//         >
//           <Card className="shadow-md border-0 mb-6">
//             <CardHeader className="border-b bg-gray-50">
//               <CardTitle>Order Status</CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="mb-6">
//                 <div className="flex justify-between mb-2">
//                   <span className="font-medium">
//                     Status:{" "}
//                     {order.status.charAt(0).toUpperCase() +
//                       order.status.slice(1)}
//                   </span>
//                   <span className="text-gray-500">
//                     Estimated Delivery: {formatDate(order.estimatedDelivery)}
//                   </span>
//                 </div>

//                 <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${progressPercent}%` }}
//                     transition={{ duration: 1, ease: "easeOut" }}
//                     className="h-full bg-blue-600"
//                   />
//                 </div>

//                 <div className="flex justify-between mt-4">
//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`rounded-full p-2 ${
//                         progressPercent >= 33
//                           ? "bg-blue-100 text-blue-600"
//                           : "bg-gray-100 text-gray-400"
//                       }`}
//                     >
//                       <Package size={20} />
//                     </div>
//                     <span className="text-sm mt-1">Preparing</span>
//                   </div>

//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`rounded-full p-2 ${
//                         progressPercent >= 66
//                           ? "bg-blue-100 text-blue-600"
//                           : "bg-gray-100 text-gray-400"
//                       }`}
//                     >
//                       <Truck size={20} />
//                     </div>
//                     <span className="text-sm mt-1">Delivering</span>
//                   </div>

//                   <div className="flex flex-col items-center">
//                     <div
//                       className={`rounded-full p-2 ${
//                         progressPercent >= 100
//                           ? "bg-blue-100 text-blue-600"
//                           : "bg-gray-100 text-gray-400"
//                       }`}
//                     >
//                       <CheckCircle size={20} />
//                     </div>
//                     <span className="text-sm mt-1">Delivered</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h3 className="font-medium text-lg mb-3">Estimated Timeline</h3>
//                 <div className="space-y-4">
//                   <div className="flex">
//                     <div className="mr-4">
//                       <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
//                         <CheckCircle size={20} />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-medium">Order Placed</div>
//                       <div className="text-sm text-gray-500">
//                         {formatDate(order.createdAt)}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex">
//                     <div className="mr-4">
//                       <div
//                         className={`h-10 w-10 rounded-full ${
//                           progressPercent >= 33
//                             ? "bg-green-100 text-green-600"
//                             : "bg-gray-100 text-gray-400"
//                         } flex items-center justify-center`}
//                       >
//                         {progressPercent >= 33 ? (
//                           <CheckCircle size={20} />
//                         ) : (
//                           <Clock size={20} />
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-medium">Processing</div>
//                       <div className="text-sm text-gray-500">
//                         {progressPercent >= 33 ? "Completed" : "In progress..."}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex">
//                     <div className="mr-4">
//                       <div
//                         className={`h-10 w-10 rounded-full ${
//                           progressPercent >= 66
//                             ? "bg-green-100 text-green-600"
//                             : "bg-gray-100 text-gray-400"
//                         } flex items-center justify-center`}
//                       >
//                         {progressPercent >= 66 ? (
//                           <CheckCircle size={20} />
//                         ) : (
//                           <Clock size={20} />
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-medium">Shipping</div>
//                       <div className="text-sm text-gray-500">
//                         {progressPercent >= 66 ? "In transit" : "Pending"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex">
//                     <div className="mr-4">
//                       <div
//                         className={`h-10 w-10 rounded-full ${
//                           progressPercent >= 100
//                             ? "bg-green-100 text-green-600"
//                             : "bg-gray-100 text-gray-400"
//                         } flex items-center justify-center`}
//                       >
//                         {progressPercent >= 100 ? (
//                           <CheckCircle size={20} />
//                         ) : (
//                           <Clock size={20} />
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <div className="font-medium">Delivery</div>
//                       <div className="text-sm text-gray-500">
//                         {progressPercent >= 100
//                           ? "Delivered"
//                           : `Expected by ${formatDate(
//                               order.estimatedDelivery
//                             )}`}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-md border-0">
//             <CardHeader className="border-b bg-gray-50">
//               <CardTitle>Order Items</CardTitle>
//             </CardHeader>
//             <CardContent className="p-0">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Options</TableHead>
//                     <TableHead className="text-center">Quantity</TableHead>
//                     <TableHead className="text-right">Price</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {order.items.map((item) => (
//                     <TableRow key={item.id}>
//                       <TableCell>
//                         <div className="flex items-center">
//                           <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center mr-3">
//                             <img
//                               src="/api/placeholder/48/48"
//                               // @ts-expect-error: Placeholder
//                               alt={item.productName}
//                               className="h-10 w-10 object-contain"
//                             />
//                           </div>
//                           <span className="font-medium">
//                             {/* @ts-expect-error: Placeholder */}
//                             {item.productName}
//                           </span>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline">
//                           {item.selectedOptions.join(", ")}
//                         </Badge>
//                       </TableCell>

//                       <TableCell className="text-center">
//                         {item.quantity}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         ${item.finalPrice.toFixed(2)}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//             <CardFooter className="flex justify-between border-t p-4">
//               <div className="font-medium">Total</div>
//               <div className="font-bold text-lg">
//                 ${order.calculatedTotal.toFixed(2)}
//               </div>
//             </CardFooter>
//           </Card>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="space-y-6"
//         >
//           <Card className="shadow-md border-0">
//             <CardHeader className="border-b bg-gray-50">
//               <CardTitle>Shipping Information</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">
//                   Address
//                 </h4>
//                 <p>{order.shippingAddress}</p>
//               </div>

//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">
//                   Delivery Notes
//                 </h4>
//                 <p>{order?.orderNotes || "No special instructions"}</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-md border-0">
//             <CardHeader className="border-b bg-gray-50">
//               <CardTitle>Payment Details</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">
//                   Payment Method
//                 </h4>
//                 <p className="capitalize">
//                   {order.paymentMethod.split(":")[1].replace("-", " ")}
//                 </p>
//               </div>

//               <Separator className="my-4" />

//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span>${order.calculatedTotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span>Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax</span>
//                   <span>${(order.calculatedTotal * 0.085).toFixed(2)}</span>
//                 </div>
//                 <Separator className="my-2" />
//                 <div className="flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>${(order.calculatedTotal * 1.085).toFixed(2)}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-md border-0">
//             <CardHeader className="border-b bg-gray-50">
//               <CardTitle>Need Help?</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="space-y-4">
//                 <Button variant="outline" className="w-full justify-start">
//                   Track Package
//                 </Button>
//                 <Button variant="outline" className="w-full justify-start">
//                   Return Items
//                 </Button>
//                 <Button variant="outline" className="w-full justify-start">
//                   Contact Support
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { ArrowLeft, AlertTriangle } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import { Navigate, useNavigate, useParams } from "react-router";
import { formatDate, getStatusProgress } from "../lib/utils";
import { useGetOrderOrderById } from "../react-query-hooks/use-get-order-by-id";
import SEO from "../components/SEO";
import OrderStatusCard from "../components/order/order-status-card";
import OrderItemsCard from "../components/order/order-item-card";
import ShippingInfoCard from "../components/order/shipping-info-card";
import PaymentDetailsCard from "../components/order/payment-details-card";
import HelpCard from "../components/order/order-help-card";

export default function OrderDetailsPage() {
  const router = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetOrderOrderById(id);

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
              items={order.items}
              calculatedTotal={order.calculatedTotal}
            />
          </div>

          <div className="space-y-6">
            <ShippingInfoCard
              estimatedDelivery={order.estimatedDelivery}
              shippingAddress={order.shippingAddress ?? "{}"}
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
