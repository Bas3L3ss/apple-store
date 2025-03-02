import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { motion } from "framer-motion";
import { OrderStatus } from "@/src/@types";
import { useNavigate } from "react-router";
import { formatDate, getStatusColor } from "../lib/utils";

// Mock data for demonstration
const mockOrders = Array(15)
  .fill(null)
  .map((_, index) => ({
    id: `ORDER${100000 + index}`,
    userId: `user-${Math.floor(Math.random() * 1000)}`,
    calculatedTotal: Math.floor(Math.random() * 2000) + 99,
    items: Array(Math.floor(Math.random() * 4) + 1)
      .fill(null)
      .map((_, itemIndex) => ({
        id: `item-${index}-${itemIndex}`,
        orderId: `ORDER${100000 + index}`,
        productId: [
          "iphone15",
          "macbookpro",
          "airpodspro",
          "applewatch",
          "ipadpro",
        ][Math.floor(Math.random() * 5)],
        selectedOptions: ["128GB", "256GB", "Space Gray", "Silver"][
          Math.floor(Math.random() * 4)
        ],
        quantity: Math.floor(Math.random() * 2) + 1,
        finalPrice: Math.floor(Math.random() * 1000) + 99,
      })),
    shippingAddress: "123 Apple St, Cupertino, CA",
    status: [
      OrderStatus.PREPARING,
      OrderStatus.DELIVERING,
      OrderStatus.FINISHED,
    ][Math.floor(Math.random() * 3)],
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ),
    updatedAt: new Date(),
  }));

export default function OrdersPage() {
  const router = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = mockOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(mockOrders.length / ordersPerPage);

  const handleViewDetails = (orderId: string) => {
    router(`/order/${orderId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Orders</h1>
        <Card className="shadow-md border-0 overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl">Order History</CardTitle>
            <CardDescription>View and manage your past orders</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="contents"
                  >
                    {currentOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        variants={itemVariants}
                        className="group hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>{order.items.length} product(s)</TableCell>
                        <TableCell className="text-right">
                          ${order.calculatedTotal.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:bg-gray-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(order.id);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </motion.div>
                </TableBody>
              </Table>
            </div>

            <div className="py-4 px-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
