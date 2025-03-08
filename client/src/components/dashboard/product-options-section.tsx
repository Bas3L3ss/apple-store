import { ProductOption } from "@/src/@types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ProductOptionsSection({
  productOptions,
  onDeleteClick,
}: {
  productOptions?: ProductOption[];
  onDeleteClick: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Product Options</CardTitle>
            <CardDescription>
              Manage variants and configurations
            </CardDescription>
          </div>
          <Button asChild size="sm">
            <Link to="/dashboard/product-options/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {productOptions?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No product options found. Create your first option to get started.
          </div>
        ) : (
          <ul className="space-y-3">
            {productOptions?.map((option) => (
              <li
                key={option.id}
                className="flex items-center justify-between p-3 bg-muted/40 rounded-md"
              >
                <div className="flex gap-2">
                  <span className="font-medium">
                    {option.color ||
                      option.storage ||
                      option.accessories ||
                      option.carrier ||
                      option.size ||
                      option.material ||
                      option.processor}
                  </span>
                  {option.color && (
                    <Badge variant="outline" className="capitalize">
                      Color
                    </Badge>
                  )}
                  {option.storage && (
                    <Badge variant="outline" className="capitalize">
                      Storage
                    </Badge>
                  )}
                  {option.accessories && (
                    <Badge variant="outline" className="capitalize">
                      Accessories
                    </Badge>
                  )}
                  {option.carrier && (
                    <Badge variant="outline" className="capitalize">
                      Carrier
                    </Badge>
                  )}
                  {option.size && (
                    <Badge variant="outline" className="capitalize">
                      Size
                    </Badge>
                  )}
                  {option.material && (
                    <Badge variant="outline" className="capitalize">
                      Material
                    </Badge>
                  )}
                  {option.processor && (
                    <Badge variant="outline" className="capitalize">
                      Processor
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/dashboard/product-options/edit/${option.id} `}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteClick(option.id)}
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
        {productOptions?.length} option{productOptions?.length !== 1 ? "s" : ""}{" "}
        in total
      </CardFooter>
    </Card>
  );
}
