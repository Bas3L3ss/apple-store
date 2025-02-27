import { useState } from "react";
import { useParams } from "react-router-dom";
import { searchProducts } from "../lib/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

const ItemDetails = () => {
  const { slug } = useParams();
  const product = searchProducts.find((p) => p.name === slug);
  const [selectedColor, setSelectedColor] = useState(product?.color[0] || "");
  const [selectedMaterial, setSelectedMaterial] = useState(
    product?.material[0] || ""
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <main className="flex items-center justify-center h-screen bg-neutral-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">
              Product not found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              The product you're looking for doesn't exist.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="default" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  // Filter product options based on selected color and material
  const filteredOptions = product.productOptions.filter(
    (option) =>
      (!selectedColor || option.color === selectedColor) &&
      (!selectedMaterial || option.material === selectedMaterial)
  );

  // Get current option price or fallback to base price
  const currentPrice =
    filteredOptions.length > 0 ? filteredOptions[0].price : product.basePrice;

  // Stock availability
  const availability =
    filteredOptions.length > 0
      ? filteredOptions[0].stock > 0
        ? "In Stock"
        : "Out of Stock"
      : product.stock > 0
      ? "In Stock"
      : "Out of Stock";

  return (
    <main className="bg-white">
      {/* Hero section with large product image */}
      <section
        aria-labelledby="product-heading"
        className="bg-neutral-50 py-12 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <header className="text-center mb-8">
            <h1
              id="product-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-2"
            >
              {product.name}
            </h1>
            <p className="text-xl text-neutral-500">
              {product.category.replace("_", " ")}
            </p>
          </header>
          <figure className="max-w-3xl mx-auto">
            <img
              src={product.productImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
          </figure>
        </div>
      </section>

      {/* Content section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left column - Gallery & Description */}
          <div>
            <Tabs defaultValue="gallery" className="mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>
              <TabsContent value="gallery" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.productImages.map((image, index) => (
                    <button
                      key={index}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-transparent hover:border-neutral-200"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-auto aspect-square object-cover"
                      />
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-neutral-700 leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Features Section */}
            <section aria-labelledby="features-heading" className="mt-12">
              <h2
                id="features-heading"
                className="text-2xl font-semibold text-neutral-900 mb-6"
              >
                Key Features
              </h2>
              <Card>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium text-neutral-900">
                      Premium Design
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      Crafted with attention to every detail
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                      </svg>
                    </div>
                    <h3 className="font-medium text-neutral-900">
                      High Performance
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      Engineered for exceptional results
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-3xl font-semibold">
                    ${currentPrice.toLocaleString()}
                  </CardTitle>
                  <Badge
                    variant={
                      availability === "In Stock" ? "outline" : "destructive"
                    }
                  >
                    {availability}
                  </Badge>
                </div>
                <CardDescription>
                  Customize your {product.name} below
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Color Selection */}
                {product.color.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">
                      Color
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.color.map((color) => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-full focus:outline-none border-2 transition-all bg-[${color}] ${
                            selectedColor === color
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-neutral-300"
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          onClick={() => setSelectedColor(color)}
                          aria-label={`Select ${color} color`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Material Selection */}
                {product.material.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">
                      Material
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.material.map((material) => (
                        <Button
                          key={material}
                          variant={
                            selectedMaterial === material
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setSelectedMaterial(material)}
                          className="text-sm"
                        >
                          {material}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="my-6" />

                <Button
                  className="w-full text-base py-6"
                  disabled={availability !== "In Stock"}
                  size="lg"
                  onClick={() => {
                    window.location.href = `/shop/${
                      product.slug ?? product.name
                    }`;
                  }}
                >
                  Place An Order
                </Button>

                {/* Additional Actions */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Button variant="outline">Save</Button>
                  <Button variant="outline">Compare</Button>
                </div>

                {/* Free delivery notice */}
                <div className="mt-6 text-sm text-neutral-500 space-y-2">
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Free delivery
                  </p>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    14-day return policy
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex-col">
                {/* Technical specs */}
                <div className="w-full mt-4">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">
                    Technical Specifications
                  </h3>
                  <div className="rounded-lg overflow-hidden border border-neutral-200">
                    <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">
                          Category
                        </span>
                        <span className="text-sm font-medium text-neutral-900">
                          {product.category.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">
                          Materials
                        </span>
                        <span className="text-sm font-medium text-neutral-900">
                          {product.material.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-neutral-50">
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-500">Colors</span>
                        <span className="text-sm font-medium text-neutral-900">
                          {product.color.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ItemDetails;
