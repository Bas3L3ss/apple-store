// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import { Button } from "@/src/components/ui/button";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/src/components/ui/tabs";
// import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
// import { Label } from "@/src/components/ui/label";
// import { ChevronRight, ShoppingBag } from "lucide-react";

// // Using the provided interfaces, but mocking the data for demonstration
// const ProductCategory = {
//   Iphone: "iphone",
//   Macbook: "macbook",
//   AppleWatch: "apple_watch",
//   Ipad: "ipad",
//   AirPod: "airpods",
//   PhoneCase: "phonecase",
// };

// // Sample product data based on your schema
// const mockProduct = {
//   id: "iphone-15-pro",
//   name: "iPhone 15 Pro",
//   description:
//     "The ultimate iPhone with A17 Pro chip, titanium design, and the most powerful iPhone camera system ever.",
//   productImages: [
//     "/api/placeholder/800/600",
//     "/api/placeholder/800/600",
//     "/api/placeholder/800/600",
//   ],
//   slug: "iphone-15-pro",
//   basePrice: 999,
//   material: ["Titanium", "Aluminum"],
//   color: [
//     "Natural Titanium",
//     "Blue Titanium",
//     "White Titanium",
//     "Black Titanium",
//   ],
//   category: ProductCategory.Iphone,
//   stock: 100,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   productOptions: [
//     // Color options
//     {
//       id: "1",
//       productId: "iphone-15-pro",
//       color: "Natural Titanium",
//       price: 0,
//       stock: 25,
//     },
//     {
//       id: "2",
//       productId: "iphone-15-pro",
//       color: "Blue Titanium",
//       price: 0,
//       stock: 25,
//     },
//     {
//       id: "3",
//       productId: "iphone-15-pro",
//       color: "White Titanium",
//       price: 0,
//       stock: 25,
//     },
//     {
//       id: "4",
//       productId: "iphone-15-pro",
//       color: "Black Titanium",
//       price: 0,
//       stock: 25,
//     },

//     // Storage options
//     {
//       id: "5",
//       productId: "iphone-15-pro",
//       material: "128GB",
//       price: 0,
//       stock: 25,
//     },
//     {
//       id: "6",
//       productId: "iphone-15-pro",
//       material: "256GB",
//       price: 100,
//       stock: 25,
//     },
//     {
//       id: "7",
//       productId: "iphone-15-pro",
//       material: "512GB",
//       price: 300,
//       stock: 25,
//     },
//     {
//       id: "8",
//       productId: "iphone-15-pro",
//       material: "1TB",
//       price: 500,
//       stock: 25,
//     },
//   ],
// };

// const searchProducts = [mockProduct];

const BuyProduct = () => {
  // const { slug } = useParams();
  // const product = searchProducts.find((p) => p.slug === slug) || mockProduct;

  // // State for user selections
  // const [selectedColor, setSelectedColor] = useState("");
  // const [selectedStorage, setSelectedStorage] = useState("");
  // const [currentStep, setCurrentStep] = useState("color");
  // const [totalPrice, setTotalPrice] = useState(product.basePrice);

  // // Get unique storage options from productOptions
  // const storageOptions = product.productOptions
  //   .filter((option) => option.material)
  //   .map((option) => ({
  //     value: option.material,
  //     price: option.price,
  //   }));

  // // Get unique color options from productOptions
  // const colorOptions = product.productOptions
  //   .filter((option) => option.color)
  //   .map((option) => ({
  //     value: option.color,
  //     price: option.price,
  //   }));

  // // Update price when selections change
  // useEffect(() => {
  //   let newPrice = product.basePrice;

  //   const colorOption = product.productOptions.find(
  //     (opt) => opt.color === selectedColor
  //   );
  //   if (colorOption) {
  //     newPrice += colorOption.price;
  //   }

  //   const storageOption = product.productOptions.find(
  //     (opt) => opt.material === selectedStorage
  //   );
  //   if (storageOption) {
  //     newPrice += storageOption.price;
  //   }

  //   setTotalPrice(newPrice);
  // }, [selectedColor, selectedStorage, product.basePrice]);

  // // Handle next step navigation
  // const handleNext = () => {
  //   if (currentStep === "color") {
  //     setCurrentStep("storage");
  //   } else if (currentStep === "storage") {
  //     setCurrentStep("summary");
  //   }
  // };

  // // Handle previous step navigation
  // const handleBack = () => {
  //   if (currentStep === "storage") {
  //     setCurrentStep("color");
  //   } else if (currentStep === "summary") {
  //     setCurrentStep("storage");
  //   }
  // };

  return (
    // <div className="container mx-auto px-4 py-8 max-w-4xl">
    //   <header className="mb-8">
    //     <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
    //     <p className="text-gray-500 mt-2">{product.description}</p>
    //   </header>

    //   <div className="flex flex-col lg:flex-row gap-8">
    //     {/* Product Images */}
    //     <div className="lg:w-1/2">
    //       <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
    //         <img
    //           src={product.productImages[0]}
    //           alt={product.name}
    //           className="max-h-80 object-contain"
    //         />
    //       </div>
    //       <div className="flex gap-4 mt-4 justify-center">
    //         {product.productImages.map((image, index) => (
    //           <div
    //             key={index}
    //             className="w-16 h-16 border rounded-lg overflow-hidden cursor-pointer"
    //           >
    //             <img
    //               src={image}
    //               alt={`${product.name} view ${index + 1}`}
    //               className="w-full h-full object-cover"
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Product Configuration */}
    //     <div className="lg:w-1/2">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Configure Your {product.name}</CardTitle>
    //           <CardDescription>
    //             Select your preferences to customize your device
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <Tabs value={currentStep} className="w-full">
    //             <TabsList className="grid w-full grid-cols-3">
    //               <TabsTrigger
    //                 value="color"
    //                 disabled={currentStep !== "color"}
    //                 className={currentStep === "color" ? "text-blue-600" : ""}
    //               >
    //                 1. Color
    //               </TabsTrigger>
    //               <TabsTrigger
    //                 value="storage"
    //                 disabled={currentStep !== "storage"}
    //                 className={currentStep === "storage" ? "text-blue-600" : ""}
    //               >
    //                 2. Storage
    //               </TabsTrigger>
    //               <TabsTrigger
    //                 value="summary"
    //                 disabled={currentStep !== "summary"}
    //                 className={currentStep === "summary" ? "text-blue-600" : ""}
    //               >
    //                 3. Summary
    //               </TabsTrigger>
    //             </TabsList>

    //             {/* Color Selection */}
    //             <TabsContent value="color" className="pt-6">
    //               <h3 className="text-lg font-medium mb-4">Pick your finish</h3>
    //               <RadioGroup
    //                 value={selectedColor}
    //                 onValueChange={setSelectedColor}
    //                 className="grid grid-cols-2 gap-4"
    //               >
    //                 {colorOptions.map((option) => (
    //                   <div
    //                     key={option.value}
    //                     className="flex items-start space-x-2"
    //                   >
    //                     <RadioGroupItem
    //                       value={option.value}
    //                       id={`color-${option.value}`}
    //                     />
    //                     <div className="grid gap-1.5">
    //                       <Label
    //                         htmlFor={`color-${option.value}`}
    //                         className="font-medium"
    //                       >
    //                         {option.value}
    //                       </Label>
    //                       <p className="text-sm text-gray-500">
    //                         {option.price > 0
    //                           ? `+$${option.price}`
    //                           : "Included"}
    //                       </p>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </RadioGroup>

    //               <div className="mt-6 flex justify-end">
    //                 <Button
    //                   onClick={handleNext}
    //                   disabled={!selectedColor}
    //                   className="bg-blue-600 hover:bg-blue-700"
    //                 >
    //                   Continue <ChevronRight className="ml-2 h-4 w-4" />
    //                 </Button>
    //               </div>
    //             </TabsContent>

    //             {/* Storage Selection */}
    //             <TabsContent value="storage" className="pt-6">
    //               <h3 className="text-lg font-medium mb-4">
    //                 How much storage do you need?
    //               </h3>
    //               <RadioGroup
    //                 value={selectedStorage}
    //                 onValueChange={setSelectedStorage}
    //                 className="grid grid-cols-2 gap-4"
    //               >
    //                 {storageOptions.map((option) => (
    //                   <div
    //                     key={option.value}
    //                     className="flex items-start space-x-2"
    //                   >
    //                     <RadioGroupItem
    //                       value={option.value}
    //                       id={`storage-${option.value}`}
    //                     />
    //                     <div className="grid gap-1.5">
    //                       <Label
    //                         htmlFor={`storage-${option.value}`}
    //                         className="font-medium"
    //                       >
    //                         {option.value}
    //                       </Label>
    //                       <p className="text-sm text-gray-500">
    //                         {option.price > 0
    //                           ? `+$${option.price}`
    //                           : "Included"}
    //                       </p>
    //                     </div>
    //                   </div>
    //                 ))}
    //               </RadioGroup>

    //               <div className="mt-6 flex justify-between">
    //                 <Button variant="outline" onClick={handleBack}>
    //                   Back to Color
    //                 </Button>
    //                 <Button
    //                   onClick={handleNext}
    //                   disabled={!selectedStorage}
    //                   className="bg-blue-600 hover:bg-blue-700"
    //                 >
    //                   Continue <ChevronRight className="ml-2 h-4 w-4" />
    //                 </Button>
    //               </div>
    //             </TabsContent>

    //             {/* Order Summary */}
    //             <TabsContent value="summary" className="pt-6">
    //               <h3 className="text-lg font-medium mb-4">
    //                 Your {product.name}
    //               </h3>

    //               <div className="space-y-4 mb-6">
    //                 <div className="flex justify-between py-2 border-b">
    //                   <span className="text-gray-600">Model</span>
    //                   <span className="font-medium">{product.name}</span>
    //                 </div>
    //                 <div className="flex justify-between py-2 border-b">
    //                   <span className="text-gray-600">Color</span>
    //                   <span className="font-medium">{selectedColor}</span>
    //                 </div>
    //                 <div className="flex justify-between py-2 border-b">
    //                   <span className="text-gray-600">Storage</span>
    //                   <span className="font-medium">{selectedStorage}</span>
    //                 </div>
    //               </div>

    //               <div className="mt-6 flex justify-between">
    //                 <Button variant="outline" onClick={handleBack}>
    //                   Back to Storage
    //                 </Button>
    //               </div>
    //             </TabsContent>
    //           </Tabs>
    //         </CardContent>
    //         <CardFooter className="flex-col items-start pt-4 border-t">
    //           <div className="flex justify-between w-full mb-4">
    //             <span className="text-lg">Total</span>
    //             <span className="text-lg font-semibold">
    //               ${totalPrice.toLocaleString()}
    //             </span>
    //           </div>
    //           {currentStep === "summary" && (
    //             <Button className="w-full bg-blue-600 hover:bg-blue-700">
    //               <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
    //             </Button>
    //           )}
    //         </CardFooter>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
    <div></div>
  );
};

export default BuyProduct;
