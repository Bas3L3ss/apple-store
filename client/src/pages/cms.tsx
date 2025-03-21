"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Separator } from "@/src/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { axios } from "../lib/utils";
import { Product, ProductOption } from "../@types";
import ProductsSection from "../components/dashboard/product-section";
import ProductOptionsSection from "../components/dashboard/product-options-section";
import { Outlet } from "react-router";

export default function CMS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    type: "products" | "product-options";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, optionsRes] = await Promise.all([
          axios.get("/products"),
          axios.get("/product-options"),
        ]);
        setProductOptions(optionsRes.data.data);
        setProducts(productsRes.data.data);
        console.log(productOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //TODO: Implement deletion for product and its options

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await axios.delete(`/${deleteItem.type}/${deleteItem.id}`);
      if (deleteItem.type === "products") {
        setProducts((prev) =>
          prev.filter((product) => product._id !== deleteItem.id)
        );
      } else {
        setProductOptions((prev) =>
          prev.filter((option) => option._id !== deleteItem.id)
        );
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setDeleteItem(null);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Outlet />

      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your products and product options
        </p>
        <Separator className="mt-4" />
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductsSection
            products={products}
            onDeleteClick={(id) => setDeleteItem({ id, type: "products" })}
          />

          <ProductOptionsSection
            productOptions={productOptions}
            onDeleteClick={(id) =>
              setDeleteItem({ id, type: "product-options" })
            }
          />
        </div>
      )}

      <AlertDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
