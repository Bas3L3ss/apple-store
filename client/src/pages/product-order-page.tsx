"use client";

import { useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import {
  type Product,
  ProductCategory,
  ProductSelectionTypes,
} from "@/src/@types";
import { Button } from "@/src/components/ui/button";
import Summary from "../components/product/selection-step/summary";

import { checkIsNew } from "../lib/utils";
import { useProductConfiguration } from "../hooks/use-product-configuration";
import { CartInput, useCartStore } from "../store/useCartStore";
import { useAuth } from "../contexts/AuthContext";
import ProductBuyingHeader from "../components/product/product-header";
import ProductBuyingGallery from "../components/product/product-buying-gallery";
import ProductBuyingLeftSection from "../components/product/product-buying-left-section";
import ProductBuyingRightSection from "../components/product/product-buying-right-section";
import Title from "../components/reusable/title";
import RecommendationCarousel from "../components/product/recommendation";
import { toast } from "sonner";

const mockProduct: Product = {
  id: "iphone-15-pro",
  productSelectionStep: [
    ProductSelectionTypes.Processor,
    ProductSelectionTypes.Color,
    ProductSelectionTypes.Storage,
    ProductSelectionTypes.Material,
    ProductSelectionTypes.Accessories,
    ProductSelectionTypes.Size,
    ProductSelectionTypes.Carrier,
  ],
  name: "iPhone 15 Pro",
  description:
    "                    iPhone 15 Pro is the first iPhone to feature an\
                    aerospace-grade titanium design, using the same alloy that\
                    spacecraft use for missions to Mars. Titanium has one of the\
                    highest strength-to-weight ratios of any metal, making these\
                    our lightest Pro models ever.",
  productImages: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
  ],
  slug: "iphone-15-pro",
  basePrice: 999,

  category: ProductCategory.Iphone,
  stock: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
  productOptions: [
    // Color options
    {
      id: "1",
      productId: "iphone-15-pro",
      color: "Natural Titanium",
      price: 0,
      stock: 25,
    },
    {
      id: "2",
      productId: "iphone-15-pro",
      color: "Blue Titanium",
      price: 0,
      stock: 25,
    },
    {
      id: "3",
      productId: "iphone-15-pro",
      color: "White Titanium",
      price: 0,
      stock: 25,
    },
    {
      id: "4",
      productId: "iphone-15-pro",
      color: "Black Titanium",
      price: 0,
      stock: 25,
    },

    // Storage options
    {
      id: "5",
      productId: "iphone-15-pro",
      storage: "128GB",
      price: 0,
      stock: 25,
    },
    {
      id: "6",
      productId: "iphone-15-pro",
      storage: "256GB",
      price: 100,
      stock: 25,
    },
    {
      id: "7",
      productId: "iphone-15-pro",
      storage: "512GB",
      price: 300,
      stock: 25,
    },
    {
      id: "8",
      productId: "iphone-15-pro",
      storage: "1TB",
      price: 500,
      stock: 25,
    },
    // material options
    {
      id: "9",
      productId: "iphone-15-pro",
      material: "Idk",
      price: 0,
      stock: 25,
    },
    {
      id: "10",
      productId: "iphone-15-pro",
      material: "LOL",
      price: 100,
      stock: 25,
    },
    // accessories options
    {
      id: "11",
      productId: "iphone-15-pro",
      accessories: "Magic keyboard",
      price: 0,
      stock: 25,
    },
    {
      id: "12",
      productId: "iphone-15-pro",
      accessories: "Iphone Pen",
      price: 100,
      stock: 25,
    },
    {
      id: "12.1",
      productId: "iphone-15-pro",
      accessories: "None",
      price: 0,
      stock: 0,
    },
    // size options
    {
      id: "13",
      productId: "iphone-15-pro",
      size: "normal",
      price: 0,
      stock: 25,
    },
    {
      id: "14",
      productId: "iphone-15-pro",
      size: "huge",
      price: 100,
      stock: 25,
    },
    // carrier options
    {
      id: "15",
      productId: "iphone-15-pro",
      carrier: "AT&T",
      price: 0,
      stock: 25,
    },
    {
      id: "16",
      productId: "iphone-15-pro",
      carrier: "Verizon",
      price: 100,
      stock: 25,
    },
    // processor options
    {
      id: "17",
      productId: "iphone-15-pro",
      processor: "M1",
      price: 0,
      stock: 25,
    },
    {
      id: "18",
      productId: "iphone-15-pro",
      processor: "M2",
      price: 100,
      stock: 25,
    },
  ],
};
const searchProducts = [mockProduct];

const BuyProduct = () => {
  const { slug } = useParams();
  console.log(slug);
  const navigate = useNavigate();

  const { account } = useAuth();

  const { addItem } = useCartStore();

  const product = searchProducts[0];
  const {
    handleSelect,
    selectedOptions,
    totalPrice,
    getLastStepSelected,
    isConfigurationComplete,
  } = useProductConfiguration(product);

  const configSectionRef = useRef<HTMLDivElement>(null);

  const isNew = checkIsNew(product.createdAt);

  const isDone = getLastStepSelected() && isConfigurationComplete();

  const handleAddCart = () => {
    const cartOption: string[] = [];
    let price = product.basePrice;

    for (const prodOption of product.productOptions) {
      for (const [key, selectedOption] of Object.entries(selectedOptions)) {
        if (prodOption[key as keyof typeof prodOption] === selectedOption) {
          cartOption.push(prodOption.id);
          price += prodOption.price;
        }
      }
    }

    const cartItem: CartInput = {
      selectedOptions: cartOption,
      totalPrice: price,
      productId: product.id,
      userId: account?._id,
    };
    addItem(cartItem);
    toast.success("Added sucessfully", {
      description: "Go to cart",
      action: { label: "Go to cart", onClick: () => navigate("/cart") },
    });
  };

  if (!product) {
    return <Navigate to={"/not-found"} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductBuyingHeader
        handleAddCart={handleAddCart}
        isDone={isDone}
        productName={product.name}
        totalPrice={totalPrice}
      />
      <ProductBuyingGallery
        configSectionRef={configSectionRef}
        product={product}
      />
      <div className="container mx-auto px-4 md:px-8  ">
        <div className="flex flex-col lg:flex-row gap-8 py-12 relative">
          {/* Left Section (Sticky Product Info) */}
          <ProductBuyingLeftSection isNew={isNew} product={product} />

          {/* Right Section (Scrollable Configuration) */}
          <div className="lg:w-1/2">
            <div
              ref={configSectionRef}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6">
                Customize your {product.name}
              </h2>

              <ProductBuyingRightSection
                product={product}
                selectedOptions={selectedOptions}
                handleSelect={handleSelect}
              />
            </div>
          </div>
        </div>

        {/* Summary section */}
        <section className="py-12 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">
            Your {product.name} Summary
          </h2>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <Summary
              selectionOption={selectedOptions}
              productName={product.name}
              selectionType={product.productSelectionStep}
              totalPrice={totalPrice}
            />
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-8"
                disabled={!isDone}
                onClick={handleAddCart}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
              </Button>
            </div>
          </div>
        </section>

        {/* Recommendations section */}
      </div>
      <section className="py-12 border-t border-gray-200">
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
          <Title className="text-3xl font-semibold text-gray-900 mb-8">
            You May Also Like
          </Title>
          <RecommendationCarousel />
        </section>
      </section>
    </div>
  );
};

export default BuyProduct;
