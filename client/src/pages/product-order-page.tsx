"use client";

import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, ChevronDown } from "lucide-react";
import {
  type Product,
  ProductCategory,
  ProductSelectionTypes,
} from "@/src/@types";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

import ColorSelection from "../components/product/selection-step/color-selection";
import Summary from "../components/product/selection-step/summary";
import StorageSelection from "../components/product/selection-step/storage-selection";
import AccessoriesSelection from "../components/product/selection-step/accessories-selection";
import SizeSelection from "../components/product/selection-step/size-selection";
import CarrierSelection from "../components/product/selection-step/carrier-selection";
import MaterialSelection from "../components/product/selection-step/material-selection";
import ProcessorSelection from "../components/product/selection-step/processor-selection";
import { checkIsNew, formatPrice } from "../lib/utils";
import { useProductConfiguration } from "../hooks/use-product-configuration";

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

  const product = searchProducts[0];

  const [activeImage, setActiveImage] = useState(0);
  const { handleSelect, selectedOptions, totalPrice } =
    useProductConfiguration(product);

  const configSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: configSectionRef,
    offset: ["start start", "end end"],
  });

  const isNew = checkIsNew(product.createdAt);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const isLastStepSelected =
    selectedOptions[
      product.productSelectionStep[
        product.productSelectionStep.length - 1
      ].toLowerCase()
    ] !== "";

  const scrollToConfig = () => {
    configSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block text-lg font-medium">
              {formatPrice(totalPrice)}
            </span>
            <Button
              className="bg-blue-600 hover:bg-blue-700 rounded-full"
              disabled={!isLastStepSelected}
              onClick={() => console.log("Added to bag", selectedOptions)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span className="hidden md:inline-block">Add to Bag</span>
              <span className="md:hidden">Buy</span>
            </Button>
          </div>
        </div>
      </header>

      <section className="sticky h-[70vh] overflow-hidden bg-gray-50">
        <motion.div
          className="h-full flex items-center justify-center"
          style={{ opacity, scale }}
        >
          <img
            src={product.productImages[activeImage] || "/placeholder.svg"}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 ">
          {product.productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                activeImage === index ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={scrollToConfig}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8  ">
        <div className="flex flex-col lg:flex-row gap-8 py-12 relative">
          {/* Left Section (Sticky Product Info) */}
          <div className="space-y-8 lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
            <div>
              {isNew && (
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  New
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xl text-gray-500 mt-4 max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tech-specs">Tech Specs</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <h3 className="text-xl font-medium">
                    Titanium. So strong. So light. So Pro.
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">
                    The A17 Pro chip brings a new level of performance and
                    capability to iPhone.
                  </p>
                </TabsContent>
                <TabsContent value="tech-specs" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Chip</h4>
                      <p className="text-gray-600">A17 Pro chip</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Camera</h4>
                      <p className="text-gray-600">
                        48MP Main | Ultra Wide | Telephoto
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Display</h4>
                      <p className="text-gray-600">Super Retina XDR display</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Battery</h4>
                      <p className="text-gray-600">
                        Up to 29 hours video playback
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Section (Scrollable Configuration) */}
          <div className="lg:w-1/2">
            <div
              ref={configSectionRef}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6">
                Customize your {product.name}
              </h2>

              <div className="space-y-8">
                {product.productSelectionStep.map((step, index) => {
                  const SelectionComponent = (() => {
                    switch (step) {
                      case ProductSelectionTypes.Color:
                        return (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="selection-container"
                          >
                            <h3 className="text-lg font-medium mb-4">
                              Pick your finish
                            </h3>
                            <ColorSelection
                              colorOptions={product.productOptions.filter(
                                (opt) => opt.color
                              )}
                              selectedColor={
                                selectedOptions[
                                  ProductSelectionTypes.Color.toLowerCase()
                                ]
                              }
                              setSelectedColor={(val: string) =>
                                handleSelect(
                                  val,
                                  ProductSelectionTypes.Color.toLowerCase()
                                )
                              }
                            />
                          </motion.div>
                        );
                      case ProductSelectionTypes.Storage:
                        return (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="selection-container"
                          >
                            <h3 className="text-lg font-medium mb-4">
                              How much storage do you need?
                            </h3>
                            <StorageSelection
                              storageOptions={product.productOptions.filter(
                                (opt) => opt.storage
                              )}
                              selectedStorage={
                                selectedOptions[
                                  ProductSelectionTypes.Storage.toLowerCase()
                                ]
                              }
                              setSelectedStorage={(val: string) =>
                                handleSelect(
                                  val,
                                  ProductSelectionTypes.Storage.toLowerCase()
                                )
                              }
                            />
                          </motion.div>
                        );
                      case ProductSelectionTypes.Accessories:
                        return (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="selection-container"
                          >
                            <h3 className="text-lg font-medium mb-4">
                              Add accessories
                            </h3>
                            <AccessoriesSelection
                              accessoriesOptions={product.productOptions.filter(
                                (opt) => opt.accessories
                              )}
                              selectedAccessories={
                                selectedOptions[
                                  ProductSelectionTypes.Accessories.toLowerCase()
                                ]
                              }
                              setSelectedAccessories={(val: string) =>
                                handleSelect(
                                  val,
                                  ProductSelectionTypes.Accessories.toLowerCase()
                                )
                              }
                            />
                          </motion.div>
                        );
                      case ProductSelectionTypes.Carrier:
                        return (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="selection-container"
                          >
                            <h3 className="text-lg font-medium mb-4">
                              Choose your carrier
                            </h3>
                            <CarrierSelection
                              carrierOptions={product.productOptions.filter(
                                (opt) => opt.carrier
                              )}
                              selectedCarrier={
                                selectedOptions[
                                  ProductSelectionTypes.Carrier.toLowerCase()
                                ]
                              }
                              setSelectedCarrier={(val: string) =>
                                handleSelect(
                                  val,
                                  ProductSelectionTypes.Carrier.toLowerCase()
                                )
                              }
                            />
                          </motion.div>
                        );
                      case ProductSelectionTypes.Material:
                        return (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="selection-container"
                          >
                            <h3 className="text-lg font-medium mb-4">
                              Select material
                            </h3>
                            <MaterialSelection
                              materialOptions={product.productOptions.filter(
                                (opt) => opt.material
                              )}
                              selectedMaterial={
                                selectedOptions[
                                  ProductSelectionTypes.Material.toLowerCase()
                                ]
                              }
                              setSelectedMaterial={(val: string) =>
                                handleSelect(
                                  val,
                                  ProductSelectionTypes.Material.toLowerCase()
                                )
                              }
                            />
                          </motion.div>
                        );
                      case ProductSelectionTypes.Processor:
                        return (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="selection-container"
                          >
                            <h3 className="text-lg font-medium mb-4">
                              Choose your processor
                            </h3>
                            <ProcessorSelection
                              processorOptions={product.productOptions.filter(
                                (opt) => opt.processor
                              )}
                              selectedProcessor={
                                selectedOptions[
                                  ProductSelectionTypes.Processor.toLowerCase()
                                ]
                              }
                              setSelectedProcessor={(val: string) =>
                                handleSelect(
                                  val,
                                  ProductSelectionTypes.Processor.toLowerCase()
                                )
                              }
                            />
                          </motion.div>
                        );
                      case ProductSelectionTypes.Size:
                        return (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="selection-container"
                          >
                            <h3 className="text-lg font-medium mb-4">
                              Pick your size
                            </h3>
                            <SizeSelection
                              sizeOptions={product.productOptions.filter(
                                (opt) => opt.size
                              )}
                              selectedSize={
                                selectedOptions[
                                  ProductSelectionTypes.Size.toLowerCase()
                                ]
                              }
                              setSelectedSize={(val: string) =>
                                handleSelect(
                                  val,
                                  ProductSelectionTypes.Size.toLowerCase()
                                )
                              }
                            />
                          </motion.div>
                        );
                      default:
                        return null;
                    }
                  })();

                  return (
                    <div key={step}>
                      {SelectionComponent}
                      {index < product.productSelectionStep.length - 1 && (
                        <Separator className="my-8" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Summary section */}
        <div className="py-12 border-t border-gray-200">
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
                disabled={!isLastStepSelected}
                onClick={() => console.log("Added to bag", selectedOptions)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
              </Button>
            </div>
          </div>
        </div>

        {/* Recommendations section */}
        <div className="py-12 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
                  <img
                    src="/api/placeholder/400/400"
                    alt="Accessory"
                    className="max-h-40 object-contain"
                  />
                </div>
                <h3 className="font-medium">AirPods Pro</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Active Noise Cancellation for immersive sound.
                </p>
                <p className="font-medium">$249</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
