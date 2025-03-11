import { Link } from "react-router";
import CloudinaryImage from "../reusable/cloudinary-image";

const ProductHero = ({
  product,
}: {
  product: {
    _id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
  };
}) => {
  return (
    <div className="relative h-screen w-full overflow-hidden mt-4">
      {/* Hero Image taking full section */}
      <div className="absolute inset-0">
        <CloudinaryImage
          publicId={product.image}
          height={1000}
          width={2000}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
          {product.name}
        </h1>
        <p className="text-xl md:text-2xl mt-3 text-gray-700 max-w-3xl font-light">
          {product.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 md:mt-6 w-full max-w-xs">
          <Link to={`/more/${product.slug}`} className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center text-base md:text-lg font-medium rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-2 md:px-8 text-white transition-colors duration-300">
              Learn more
            </button>
          </Link>
          <Link to={`/shop/${product.slug}`} className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center text-base md:text-lg font-medium rounded-full border border-blue-600 hover:border-blue-700 px-6 py-2 md:px-8 text-blue-600 hover:text-blue-700 transition-colors duration-300">
              Buy
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
