"use client";

import { useState, useRef, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { searchProducts } from "../lib/mockData";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Minus,
  Star,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";

const ItemDetails = () => {
  const { slug } = useParams();
  const product = searchProducts.find((p) => p.name === slug);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const galleryRef = useRef(null);

  // Mock gallery images (in a real app, these would come from the product data)
  const galleryImages = [
    "/placeholder.svg?height=800&width=800&text=Front",
    "/placeholder.svg?height=800&width=800&text=Back",
    "/placeholder.svg?height=800&width=800&text=Side",
    "/placeholder.svg?height=800&width=800&text=Camera",
    "/placeholder.svg?height=800&width=800&text=Detail",
    "/placeholder.svg?height=800&width=800&text=Ports",
  ];

  // Mock colors with actual color values
  const colors =
    product?.productOptions
      .filter((option) => option.color)
      .map((option, index) => ({
        name: option.color,
        value:
          index === 0
            ? "#E3D0BB"
            : index === 1
            ? "#394F6B"
            : index === 2
            ? "#F5F5F0"
            : "#1F2020",
        price: option.price,
      })) || [];

  // Scroll handler for sticky buy button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBuyButton(true);
      } else {
        setShowBuyButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gallery scroll handler
  const scrollGallery = (direction: string) => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      //@ts-expect-error: fix later
      // TODOS: FIX THIS CAROUSEL
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!product) {
    return <Navigate to={"/not-found"} />;
  }
  return (
    <div className="bg-white">
      {/* Sticky Buy Button */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 transition-transform duration-300 ${
          showBuyButton ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg?height=60&width=60"
              alt={product.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">From ${product.basePrice}</p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Buy
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hero section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/placeholder.svg?height=1200&width=2000"
            alt={product.name}
            className="h-full w-full object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight">
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
            {product.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-8"
            >
              Buy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8"
            >
              <Play className="mr-2 h-4 w-4 fill-white" />
              Watch the film
            </Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Product Overview */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            Titanium. So strong. So light. So Pro.
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/placeholder.svg?height=800&width=800"
                alt="iPhone 15 Pro Titanium"
                className="w-full h-auto rounded-2xl transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                Aerospace-grade titanium
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-semibold mb-6">
                Aerospace-grade titanium
              </h3>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                iPhone 15 Pro is the first iPhone to feature an aerospace-grade
                titanium design, using the same alloy that spacecraft use for
                missions to Mars. Titanium has one of the highest
                strength-to-weight ratios of any metal, making these our
                lightest Pro models ever.
              </p>
              <div className="space-y-5">
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-lg">Lightest Pro models ever created</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-lg">Durable aerospace-grade material</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    Refined brushed texture with elegant finish
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Selection */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            Choose your finish.
          </h2>

          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl mb-16">
              <img
                src={`/placeholder.svg?height=800&width=800&text=${colors[activeColorIndex]?.name}`}
                alt={`${product.name} in ${colors[activeColorIndex]?.name}`}
                className="w-full h-auto rounded-2xl transition-all duration-500"
              />
              <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {colors[activeColorIndex]?.name}
              </div>
            </div>

            <div className="flex gap-6 justify-center">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-full overflow-hidden transition-all duration-300 ${
                    activeColorIndex === index
                      ? "ring-4 ring-offset-4 ring-blue-500"
                      : "ring-4 ring-gray-200"
                  }`}
                  onClick={() => setActiveColorIndex(index)}
                  style={{ backgroundColor: color.value }}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-lg text-center text-gray-600">
              {colors[activeColorIndex]?.name}
              {colors[activeColorIndex]?.price > 0 &&
                ` (+$${colors[activeColorIndex]?.price})`}
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            Take a closer look.
          </h2>

          <div className="relative">
            <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() => scrollGallery("left")}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Scroll left</span>
              </Button>
            </div>

            <div
              ref={galleryRef}
              className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[350px] md:w-[500px] snap-center"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-auto rounded-2xl object-cover aspect-square"
                  />
                </div>
              ))}
            </div>

            <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() => scrollGallery("right")}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === activeImageIndex
                      ? "bg-blue-600 w-4"
                      : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setActiveImageIndex(index);
                    if (galleryRef.current) {
                      const scrollPosition = index * (350 + 24); // width + gap
                      // TODOS: FIX THIS CAROUSEL
                      //@ts-expect-error: Fix later
                      galleryRef.current.scrollTo({
                        left: scrollPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <span className="sr-only">View image {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">New</Badge>
              <h3 className="text-3xl font-semibold mb-6">
                A17 Pro chip. A monster of a chip.
              </h3>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                A17 Pro is the industry's first 3-nanometer chip — a huge
                breakthrough in power efficiency. It has a faster CPU and GPU
                than any smartphone chip ever made, and a Neural Engine that's
                up to 2x faster than the previous generation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-4xl font-bold mb-2">2x</h4>
                  <p className="text-gray-600">Faster Neural Engine</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="text-4xl font-bold mb-2">20%</h4>
                  <p className="text-gray-600">Faster CPU performance</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/placeholder.svg?height=800&width=800&text=A17 Pro"
                alt="A17 Pro Chip"
                className="w-full h-auto rounded-2xl transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            Which iPhone is right for you?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "iPhone 15 Pro Max",
              "iPhone 15 Pro",
              "iPhone 15 Plus",
              "iPhone 15",
            ].map((model, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={`/placeholder.svg?height=300&width=300&text=${model}`}
                  alt={model}
                  className="w-full max-w-[200px] h-auto mb-6"
                />
                <h3 className="font-semibold text-lg mb-2">{model}</h3>
                <p className="text-gray-600 mb-4">From ${999 - index * 100}</p>
                <div className="text-sm space-y-2 text-gray-700">
                  <p>6.{7 - index}" display</p>
                  <p>{index < 2 ? "Pro camera system" : "Advanced camera"}</p>
                  <p>{index < 2 ? "A17 Pro chip" : "A16 Bionic chip"}</p>
                  <p>{index < 2 ? "Titanium design" : "Aluminum design"}</p>
                </div>
                <Button variant="outline" className="mt-6 w-full">
                  Learn more
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            Tech Specs
          </h2>

          <Tabs defaultValue="display" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="chip">Chip</TabsTrigger>
              <TabsTrigger value="camera">Camera</TabsTrigger>
              <TabsTrigger value="battery">Battery</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>

            <TabsContent value="display" className="border rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    Super Retina XDR display
                  </h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>6.1‑inch (diagonal) all‑screen OLED display</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>2556‑by‑1179-pixel resolution at 460 ppi</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>
                        ProMotion technology with adaptive refresh rates up to
                        120Hz
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>HDR display</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>True Tone</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Wide color (P3)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Haptic Touch</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    src="/placeholder.svg?height=600&width=600&text=Display"
                    alt="iPhone Display"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chip" className="border rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">A17 Pro chip</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>
                        New 6-core CPU with 2 performance and 4 efficiency cores
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>New 6-core GPU</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>New 16-core Neural Engine</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    src="/placeholder.svg?height=600&width=600&text=A17 Pro"
                    alt="A17 Pro Chip"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Other tabs would follow the same pattern */}
            <TabsContent value="camera" className="border rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    Pro Camera System
                  </h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>48MP Main: 24mm, ƒ/1.78 aperture</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>12MP Ultra Wide: 13mm, ƒ/2.2 aperture</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>
                        12MP 2x Telephoto (enabled by quad-pixel sensor)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>12MP 3x Telephoto: 77mm, ƒ/2.8 aperture</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    src="/placeholder.svg?height=600&width=600&text=Camera"
                    alt="iPhone Camera System"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="battery" className="border rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    All-day battery life
                  </h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Up to 23 hours video playback</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Up to 20 hours video streaming</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Up to 75 hours audio playback</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Fast-charge capable</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    src="/placeholder.svg?height=600&width=600&text=Battery"
                    alt="iPhone Battery"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="storage" className="border rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Storage</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.productOptions
                      .filter((option) => option.storage)
                      .map((option) => (
                        <Card
                          key={option.id}
                          className="border-2 hover:border-blue-500 transition-colors cursor-pointer"
                        >
                          <CardContent className="p-6">
                            <div className="text-center">
                              <h3 className="text-xl font-bold mb-2">
                                {option.storage}
                              </h3>
                              <p className="text-gray-500">
                                {option.price > 0
                                  ? `+$${option.price}`
                                  : "Included"}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
                <div>
                  <img
                    src="/placeholder.svg?height=600&width=600&text=Storage"
                    alt="iPhone Storage Options"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Customer Reviews */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            What people are saying
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                rating: 5,
                comment:
                  "The titanium design is a game-changer. It feels so premium yet lightweight in my hand. The camera system is incredible too!",
              },
              {
                name: "Sarah Miller",
                rating: 4,
                comment:
                  "I upgraded from the 13 Pro and the performance difference is noticeable. The display is brighter and the battery lasts all day.",
              },
              {
                name: "Michael Chen",
                rating: 5,
                comment:
                  "The A17 Pro chip handles everything I throw at it. Gaming performance is stellar and the camera takes stunning photos in any lighting.",
              },
            ].map((review, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <p className="text-gray-700 mb-6">"{review.comment}"</p>
                  <p className="font-medium">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-medium py-6">
                  What makes the iPhone 15 Pro different from the iPhone 15?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-lg pb-6">
                  The iPhone 15 Pro features a premium titanium design (vs
                  aluminum), the A17 Pro chip (vs A16 Bionic), a Pro camera
                  system with 48MP main camera, ProMotion display with 120Hz
                  refresh rate, and additional pro features like the Action
                  button and USB-C with USB 3 speeds.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-medium py-6">
                  Is the iPhone 15 Pro water resistant?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-lg pb-6">
                  Yes, iPhone 15 Pro has an IP68 rating for water and dust
                  resistance. It can withstand submersion in water up to 6
                  meters deep for up to 30 minutes. However, water damage is not
                  covered under warranty, so you should still be careful around
                  water.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-medium py-6">
                  Does the iPhone 15 Pro come with a charger?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-lg pb-6">
                  No, the iPhone 15 Pro comes with a USB-C to USB-C cable, but
                  does not include a power adapter or charger in the box. You'll
                  need to use an existing USB-C power adapter or purchase one
                  separately.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-medium py-6">
                  What storage options are available for the iPhone 15 Pro?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-lg pb-6">
                  The iPhone 15 Pro is available in 128GB, 256GB, 512GB, and 1TB
                  storage configurations. The base model starts with 128GB, and
                  you can upgrade to higher storage tiers for an additional
                  cost.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl font-medium py-6">
                  Can I use my old iPhone case with the iPhone 15 Pro?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-lg pb-6">
                  No, the iPhone 15 Pro has a different design and dimensions
                  compared to previous models. You'll need to purchase a case
                  specifically designed for the iPhone 15 Pro to ensure proper
                  fit and protection.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* In the Box */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            What's in the Box
          </h2>

          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <img
                src="/placeholder.svg?height=600&width=600&text=Box Contents"
                alt="iPhone 15 Pro Box Contents"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div className="md:col-span-2">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">iPhone 15 Pro</h3>
                    <p className="text-gray-600">With iOS 17</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      USB-C to USB-C Cable
                    </h3>
                    <p className="text-gray-600">
                      Supports USB 3 for faster data transfer
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Documentation</h3>
                    <p className="text-gray-600">
                      Quick Start guide and other product information
                    </p>
                  </div>
                </li>
              </ul>

              <Separator className="my-8" />

              <div className="flex items-start">
                <Minus className="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium mb-2">No Power Adapter</h3>
                  <p className="text-gray-600">
                    As part of Apple's effort to reduce environmental impact,
                    the power adapter is sold separately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
              Ready to experience the iPhone 15 Pro?
            </h2>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              From $999 or $41.62/mo. for 24 mo. before trade-in*
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Buy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Learn more
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              * Trade-in values vary based on condition, year, and configuration
              of your trade-in device.
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Shop and Learn</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Store</li>
                <li>Mac</li>
                <li>iPad</li>
                <li>iPhone</li>
                <li>Watch</li>
                <li>AirPods</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Apple Music</li>
                <li>Apple TV+</li>
                <li>Apple Fitness+</li>
                <li>Apple News+</li>
                <li>Apple Arcade</li>
                <li>iCloud</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Apple Store</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Find a Store</li>
                <li>Genius Bar</li>
                <li>Today at Apple</li>
                <li>Apple Camp</li>
                <li>Financing</li>
                <li>Order Status</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Business</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Apple and Business</li>
                <li>Shop for Business</li>
                <li>Business Financing</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-sm text-gray-500">
            <p>Copyright © 2023 Apple Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ItemDetails;
