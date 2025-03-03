// import { Outlet } from "react-router-dom";
// import { DashboardSidebar } from "../components/dashboard/dashboard-sidebar";
// import { SidebarProvider } from "../components/ui/sidebar";

// const CMS = () => {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <DashboardSidebar />
//         <main className="flex-1 p-6 md:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default CMS;
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
        setProducts(productsRes.data);
        setProductOptions(optionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      await axios.delete(`/${deleteItem.type}/${deleteItem.id}`);
      if (deleteItem.type === "products") {
        setProducts((prev) =>
          prev.filter((product) => product.id !== deleteItem.id)
        );
      } else {
        setProductOptions((prev) =>
          prev.filter((option) => option.id !== deleteItem.id)
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
      <Outlet />

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
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
