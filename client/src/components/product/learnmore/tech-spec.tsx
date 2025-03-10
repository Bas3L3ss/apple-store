import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Check } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Product } from "@/src/@types";

const TechSpec = ({ product }: { product: Product }) => {
  return (
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
                    ProMotion technology with adaptive refresh rates up to 120Hz
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
              <h3 className="text-2xl font-semibold mb-6">Pro Camera System</h3>
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
                  <span>12MP 2x Telephoto (enabled by quad-pixel sensor)</span>
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
                      key={option._id}
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
  );
};

export default TechSpec;
