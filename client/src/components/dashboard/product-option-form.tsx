import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const optionTypes = [
  { value: "color", label: "Color" },
  { value: "storage", label: "Storage" },
  { value: "size", label: "Size" },
  { value: "material", label: "Material" },
  { value: "processor", label: "Processor" },
  { value: "accessories", label: "Accessories" },
  { value: "carrier", label: "Carrier" },
] as const;

// Form schema validation
const formSchema = z.object({
  productId: z.string().min(1, { message: "Please select a product" }),
  optionType: z.enum(
    [
      "color",
      "storage",
      "size",
      "material",
      "processor",
      "accessories",
      "carrier",
    ],
    { required_error: "Please select an option type" }
  ),
  value: z
    .string()
    .min(1, { message: "Please enter a value for the selected option" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  stock: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Stock must be a non-negative integer" }),
});
type FormValues = z.infer<typeof formSchema>;

export default function CreateProductOptionPage() {
  const router = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      optionType: undefined,
      value: "",
      price: 0,
      stock: 0,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      const submitData = {
        productId: data.productId,
        [data.optionType]: data.value,
        price: data.price,
        stock: data.stock,
      };

      // Here you would normally send the data to your API
      console.log("Form data:", submitData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Product option created", {
        description: `Successfully created ${data.optionType} option`,
      });

      // Redirect to product options list
      router("/dashboard");
    } catch (error) {
      console.error("Error creating product option:", error);
      toast("Error", {
        description: "Failed to create product option. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const getPlaceholder = (type: string) => {
    switch (type) {
      case "color":
        return "e.g., Space Black, Silver, Gold";
      case "storage":
        return "e.g., 128GB, 256GB, 512GB";
      case "size":
        return "e.g., Small, Medium, Large";
      case "material":
        return "e.g., Aluminum, Stainless Steel";
      case "processor":
        return "e.g., M1, M2 Pro, M2 Max";
      case "accessories":
        return "e.g., Case, Screen Protector";
      case "carrier":
        return "e.g., Unlocked, AT&T, Verizon";
      default:
        return "Enter value...";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Product Option</CardTitle>
          <CardDescription>
            Add a new option variant for an existing product. Note that each
            option can only have one type (color, storage, etc.).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Selection */}
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"Bind to one product by it's id"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Option Type Selection */}
              <FormField
                control={form.control}
                name="optionType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Option Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {optionTypes.map((option) => (
                          <FormItem key={option.value}>
                            <FormControl>
                              <label
                                className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent [&:has([data-state=checked])]:bg-accent ${
                                  field.value === option.value
                                    ? "border-primary"
                                    : ""
                                }`}
                              >
                                <RadioGroupItem value={option.value} />
                                <span className="font-normal">
                                  {option.label}
                                </span>
                              </label>
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Select the type of option you want to create. You can only
                      choose one type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Option Value */}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option Value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={getPlaceholder(
                          form.watch("optionType") || ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormDescription>
                        Total price for this option
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stock */}
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="1" {...field} />
                      </FormControl>
                      <FormDescription>Available quantity</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router("/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Option"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
