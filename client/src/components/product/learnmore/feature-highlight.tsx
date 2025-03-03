import { Badge } from "lucide-react";
import React from "react";

export const FeatureHighLight = () => {
  //TODO: make sure it's dynamic
  return (
    <section className="mb-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">New</Badge>
          <h3 className="text-3xl font-semibold mb-6">
            A17 Pro chip. A monster of a chip.
          </h3>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            A17 Pro is the industry's first 3-nanometer chip — a huge
            breakthrough in power efficiency. It has a faster CPU and GPU than
            any smartphone chip ever made, and a Neural Engine that's up to 2x
            faster than the previous generation.
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
  );
};
