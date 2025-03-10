import { Product } from "@/src/@types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { formatPrice } from "@/src/lib/utils";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ProductsSection({
  products,
  onDeleteClick,
}: {
  products?: Product[];
  onDeleteClick: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </div>
          <Button asChild size="sm">
            <Link to="/dashboard/products/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {products?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No products found. Create your first product to get started.
          </div>
        ) : (
          <ul className="space-y-3">
            {products?.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between p-3 bg-muted/40 rounded-md"
              >
                <div>
                  <span className="font-medium">{product.name}</span>
                  {product.basePrice && (
                    <Badge variant="outline" className="ml-2">
                      {formatPrice(product.basePrice)}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/dashboard/products/edit/${product._id}`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteClick(product._id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        {products?.length} product{products?.length !== 1 ? "s" : ""} in total
      </CardFooter>
    </Card>
  );
}
