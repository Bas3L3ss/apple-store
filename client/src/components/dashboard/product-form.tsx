import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2, Upload } from "lucide-react";

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
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ProductSelectionTypes } from "@/src/@types";

// Form schema validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  productImages: z
    .array(z.string().url({ message: "Please enter a valid URL" }))
    .min(1, { message: "At least one product image is required" }),
  slug: z.string().min(2, {
    message:
      "slug must be at least 2 characters and be identical to url-formatted name",
  }),
  basePrice: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  category: z.enum(
    ["iphone", "macbook", "apple_watch", "ipad", "airpods", "phonecase"],
    {
      required_error: "Please select a category",
    }
  ),
  stock: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Stock must be a non-negative integer" }),
  productSelectionStep: z
    .array(z.string())
    .min(1, { message: "At least one selection step is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateProductPage() {
  const router = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productSelectionOptions = Object.entries(ProductSelectionTypes).map(
    ([label, value]) => ({
      label,
      value,
    })
  );

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      productImages: [""],
      slug: "",
      basePrice: 0,
      category: undefined,
      stock: 0,
      productSelectionStep: [""],
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Here you would normally send the data to your API
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Product created", {
        description: `Successfully created ${data.name}`,
      });

      router("/dashboard");
    } catch (error) {
      console.error("Error creating product:", error);
      toast("Product creation error", {
        description: "Failed to create product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper functions for array fields
  const addImageField = () => {
    const currentImages = form.getValues("productImages");
    form.setValue("productImages", [...currentImages, ""]);
  };

  const removeImageField = (index: number) => {
    const currentImages = form.getValues("productImages");
    if (currentImages.length > 1) {
      form.setValue(
        "productImages",
        currentImages.filter((_, i) => i !== index)
      );
    }
  };

  const addSelectionStep = () => {
    const currentSteps = form.getValues("productSelectionStep");
    form.setValue("productSelectionStep", [...currentSteps, ""]);
  };

  const removeSelectionStep = (index: number) => {
    const currentSteps = form.getValues("productSelectionStep");
    if (currentSteps.length > 1) {
      form.setValue(
        "productSelectionStep",
        currentSteps.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>
            Add a new product to your inventory. Fill in all required fields.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="iPhone 15 Pro" {...field} />
                      </FormControl>
                      <FormDescription>Get name from apple new</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug </FormLabel>
                      <FormControl>
                        <Input placeholder="iphone-15-pro" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL-friendly version of the name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Base Price */}
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="iphone">iPhone</SelectItem>
                          <SelectItem value="macbook">MacBook</SelectItem>
                          <SelectItem value="apple_watch">
                            Apple Watch
                          </SelectItem>
                          <SelectItem value="ipad">iPad</SelectItem>
                          <SelectItem value="airpods">AirPods</SelectItem>
                          <SelectItem value="phonecase">Phone Case</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              {/* Product Images */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="text-base">Product Images</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>

                {form.watch("productImages").map((_, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <FormField
                      control={form.control}
                      name={`productImages.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <div className="flex">
                              <div className="bg-muted p-2 flex items-center rounded-l-md border border-r-0 border-input">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Input
                                placeholder="https://example.com/image.jpg"
                                className="rounded-l-none"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImageField(index)}
                      disabled={form.watch("productImages").length <= 1}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
              <Separator />
              {/* Product Selection Steps */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="text-base">
                    Product Selection Steps
                  </FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSelectionStep}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>

                {form.watch("productSelectionStep").map((_, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <FormField
                      control={form.control}
                      name={`productSelectionStep.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a step" />
                              </SelectTrigger>
                              <SelectContent>
                                {productSelectionOptions.map(
                                  ({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                      {label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSelectionStep(index)}
                      disabled={form.watch("productSelectionStep").length <= 1}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}

                <FormDescription>
                  Select steps that customers will follow when choosing product
                  options (e.g., "Color", "Storage").
                </FormDescription>
              </div>

              {/* Product Options note */}
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium">Product Options</p>
                <p className="text-sm text-muted-foreground mt-1">
                  After creating the product, you'll be able to add specific
                  options like colors, storage capacities, etc.
                </p>
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
                  {isSubmitting ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
