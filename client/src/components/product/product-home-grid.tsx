import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import CloudinaryImage from "../reusable/cloudinary-image";
import { gridProducts } from "@/src/lib/mockData";

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  p-4 lg:p-6 bg-gray-50">
      {gridProducts.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden p-0 border-0 rounded-sm md:rounded-md shadow-md transition-transform duration-300 hover:shadow-lg  "
        >
          <CardContent className="p-0 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/30" />

            <CloudinaryImage
              className="w-full h-full object-cover"
              publicId={product.image}
              height={760}
              width={760}
              alt={product.name}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${"text-white"}`}
              >
                {product.name}
              </h2>
              <p
                className={`text-base sm:text-lg md:text-xl lg:text-2xl mt-2 md:mt-3 max-w-lg mx-auto ${"text-white/90"}`}
              >
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 md:mt-6 w-full max-w-xs">
                <Link to={`/more/${product.slug}`} className="w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center text-base md:text-lg font-medium rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-2 md:px-8 text-white transition-colors duration-300">
                    Learn more
                  </button>
                </Link>
                <Link to={`/shop/${product.slug}`} className="w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center text-base md:text-lg font-medium rounded-full border border-blue-600 hover:border-blue-700 px-8 py-2 md:px-8 text-blue-600 hover:text-blue-700 transition-colors duration-300">
                    Buy
                  </button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
