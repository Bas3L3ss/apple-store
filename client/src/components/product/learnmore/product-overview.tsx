import { Product } from "@/src/@types";
import { Check } from "lucide-react";

const ProductOverView = ({ product }: { product: Product }) => {
  // TODO: add real data
  return (
    <section className="mb-32">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
        {product.description}
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
            missions to Mars. Titanium has one of the highest strength-to-weight
            ratios of any metal, making these our lightest Pro models ever.
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
  );
};

export default ProductOverView;
