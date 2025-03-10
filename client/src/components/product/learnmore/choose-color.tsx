import { Product } from "@/src/@types";
import { useState } from "react";

const ChooseColor = ({
  colors,
  product,
}: {
  colors: {
    name: string | undefined;
    value: string;
    price: number;
  }[];
  product: Product;
}) => {
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  return (
    <section className="mb-32">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
        Choose your finish.
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-2xl mb-16 ">
          <img
            src={`/placeholder.svg?height=800&width=800&text=${colors[activeColorIndex]?.name}`}
            alt={`${product.name} in ${colors[activeColorIndex]?.name}`}
            className="w-full h-auto rounded-2xl transition-all duration-500"
          />
          <div className="absolute bottom-6  left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            {colors[activeColorIndex]?.name}
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`relative w-20 h-20 rounded-full cursor-pointer overflow-hidden transition-all duration-300 ${
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
  );
};

export default ChooseColor;
