import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { OrderItemWithProducts, SelectedOption } from "@/src/@types";
import CloudinaryImage from "../reusable/cloudinary-image";
import { formatPrice } from "@/src/lib/utils";

interface OrderItemsCardProps {
  items: OrderItemWithProducts[];
  calculatedTotal: number;
}

const OrderItemsCard = ({ items, calculatedTotal }: OrderItemsCardProps) => {
  // Get formatted option display

  const getOptionDisplay = (option: SelectedOption) => {
    // Find the first key that's not _id, productId, price, stock, __v, createdAt, updatedAt
    const excludedKeys = [
      "_id",
      "productId",
      "price",
      "stock",
      "__v",
      "createdAt",
      "updatedAt",
    ];
    const optionKey = Object.keys(option).find(
      (key) => !excludedKeys.includes(key)
    );

    if (!optionKey) return "";
    return `${optionKey}: ${option[optionKey]}`;
  };

  return (
    <Card className="shadow-md border-0">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Options</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                      <CloudinaryImage
                        publicId={item.productId.productImages[0]}
                        alt={`order of ${item.productId.name}`}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <span className="font-medium">
                      Product Name: {item.productId.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.selectedOptions.map((option) => (
                      <Badge
                        key={option._id}
                        variant="outline"
                        className="mr-1 mb-1"
                      >
                        {getOptionDisplay(option)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatPrice(item.finalPrice)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="font-medium">Total</div>
        <div className="font-bold text-lg">{formatPrice(calculatedTotal)}</div>
      </CardFooter>
    </Card>
  );
};

export default OrderItemsCard;
