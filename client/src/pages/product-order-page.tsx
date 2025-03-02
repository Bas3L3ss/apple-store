import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

import { ShoppingBag } from "lucide-react";
import { Product, ProductCategory, ProductSelectionTypes } from "@/src/@types";
import ColorSelection from "../components/product/selection-step/color-selection";
import Summary from "../components/product/selection-step/summary";
import StorageSelection from "../components/product/selection-step/storage-selection";
import AccessoriesSelection from "../components/product/selection-step/accessories-selection";
import SizeSelection from "../components/product/selection-step/size-selection";
import CarrierSelection from "../components/product/selection-step/carrier-selection";
import MaterialSelection from "../components/product/selection-step/material-selection";
import ProcessorSelection from "../components/product/selection-step/processor-selection";

const mockProduct: Product = {
  id: "iphone-15-pro",
  productSelectionStep: [
    ProductSelectionTypes.Color,
    ProductSelectionTypes.Storage,
    ProductSelectionTypes.Material,
    ProductSelectionTypes.Processor,
    ProductSelectionTypes.Accessories,
    ProductSelectionTypes.Size,
    ProductSelectionTypes.Carrier,
  ],
  name: "iPhone 15 Pro",
  description:
    "The ultimate iPhone with A17 Pro chip, titanium design, and the most powerful iPhone camera system ever.",
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
  const product = searchProducts[0];

  const [selectedOptions, setSelectedOptions] = useState(() => {
    return mockProduct.productSelectionStep.reduce((acc, step) => {
      acc[step.toLowerCase()] = "";
      return acc;
    }, {} as Record<string, string>);
  });

  const [totalPrice, setTotalPrice] = useState(product.basePrice);
  useEffect(() => {
    let newPrice = product.basePrice;
    Object.values(selectedOptions).forEach((value) => {
      const option = product.productOptions.find((opt) =>
        Object.values(opt).includes(value)
      );
      if (option) newPrice += option.price;
    });
    setTotalPrice(newPrice);
  }, [selectedOptions, product.basePrice, product.productOptions]);

  const handleSelect = (val: string, selectKey: string) => {
    setSelectedOptions((prev) => {
      return { ...prev, [selectKey]: val };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
        <p className="text-gray-500 mt-2">{product.description}</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
            <img
              src={product.productImages[0]}
              alt={product.name}
              className="max-h-80 object-contain"
            />
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            {product.productImages.map((image, index) => (
              <div
                key={index}
                className="w-16 h-16 border rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Configure Your {product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              {product.productSelectionStep.map((step) => {
                switch (step) {
                  case ProductSelectionTypes.Color:
                    return (
                      <ColorSelection
                        colorOptions={product.productOptions.filter(
                          (opt) => opt.color
                        )}
                        selectedColor={
                          selectedOptions[ProductSelectionTypes.Color]
                        }
                        setSelectedColor={(val: string) =>
                          handleSelect(val, ProductSelectionTypes.Color)
                        }
                      />
                    );
                  case ProductSelectionTypes.Storage:
                    return (
                      <StorageSelection
                        storageOptions={product.productOptions.filter(
                          (opt) => opt.storage
                        )}
                        selectedStorage={
                          selectedOptions[ProductSelectionTypes.Storage]
                        }
                        setSelectedStorage={(val: string) =>
                          handleSelect(val, ProductSelectionTypes.Storage)
                        }
                      />
                    );
                  case ProductSelectionTypes.Accessories:
                    return (
                      <AccessoriesSelection
                        accessoriesOptions={product.productOptions.filter(
                          (opt) => opt.accessories
                        )}
                        selectedAccessories={
                          selectedOptions[ProductSelectionTypes.Accessories]
                        }
                        setSelectedAccessories={(val: string) =>
                          handleSelect(val, ProductSelectionTypes.Accessories)
                        }
                      />
                    );
                  case ProductSelectionTypes.Carrier:
                    return (
                      <CarrierSelection
                        carrierOptions={product.productOptions.filter(
                          (opt) => opt.carrier
                        )}
                        selectedCarrier={
                          selectedOptions[ProductSelectionTypes.Carrier]
                        }
                        setSelectedCarrier={(val: string) =>
                          handleSelect(val, ProductSelectionTypes.Carrier)
                        }
                      />
                    );
                  case ProductSelectionTypes.Material:
                    return (
                      <MaterialSelection
                        materialOptions={product.productOptions.filter(
                          (opt) => opt.material
                        )}
                        selectedMaterial={
                          selectedOptions[ProductSelectionTypes.Material]
                        }
                        setSelectedMaterial={(val: string) =>
                          handleSelect(val, ProductSelectionTypes.Material)
                        }
                      />
                    );
                  case ProductSelectionTypes.Processor:
                    return (
                      <ProcessorSelection
                        processorOptions={product.productOptions.filter(
                          (opt) => opt.processor
                        )}
                        selectedProcessor={
                          selectedOptions[ProductSelectionTypes.Processor]
                        }
                        setSelectedProcessor={(val: string) =>
                          handleSelect(val, ProductSelectionTypes.Processor)
                        }
                      />
                    );
                  case ProductSelectionTypes.Size:
                    return (
                      <SizeSelection
                        sizeOptions={product.productOptions.filter(
                          (opt) => opt.size
                        )}
                        selectedSize={
                          selectedOptions[ProductSelectionTypes.Size]
                        }
                        setSelectedSize={(val: string) =>
                          handleSelect(val, ProductSelectionTypes.Size)
                        }
                      />
                    );

                  default:
                    break;
                }
              })}

              <Summary
                selectionOption={selectedOptions}
                productName={product.name}
                selectionType={product.productSelectionStep}
                totalPrice={totalPrice}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t">
            <span className="text-lg font-semibold">
              Total: ${totalPrice.toLocaleString()}
            </span>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                console.log(
                  selectedOptions[
                    product.productSelectionStep[
                      product.productSelectionStep.length - 1
                    ]
                  ] != ""
                );
              }}
              disabled={
                selectedOptions[
                  product.productSelectionStep[
                    product.productSelectionStep.length - 1
                  ]
                ] == ""
              }
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BuyProduct;
