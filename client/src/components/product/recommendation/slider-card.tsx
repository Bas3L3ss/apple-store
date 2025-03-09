import { Product } from "@/src/@types";
import { checkIsNew, formatPrice, getColorHex } from "@/src/lib/utils";
import { motion } from "framer-motion";

const SliderCard = ({ product }: { product: Product }) => {
  const isNewProduct = checkIsNew(product.createdAt);

  return (
    <motion.a
      href={`/shop/${product.slug ?? product.name}`}
      whileHover={{
        scale: 1.009,
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
      }}
      transition={{
        duration: 0.3,
        ease: [0, 0, 0.5, 1],
      }}
      className="flex-shrink-0 w-[280px] cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow  p-[30px]"
    >
      {/* Product Image */}
      <div className="w-full h-[250px] flex justify-center items-center bg-gray-50 rounded-xl mb-4 overflow-hidden">
        <img
          src={product.productImages[0]}
          alt={product.name}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Color Options */}
      {product.productOptions && product.productOptions.length > 0 && (
        <div className="flex items-center gap-1 justify-center mt-2 mb-3">
          {product.productOptions
            .filter((opt) => opt.color)
            .map((color, index) => (
              <div
                key={index}
                className="size-3 rounded-full border border-gray-300"
                style={{
                  backgroundColor: getColorHex(color.color!),
                }}
              />
            ))}
        </div>
      )}

      {/* Product Details */}
      <div className="w-full text-left">
        {isNewProduct && (
          <p className="text-[#b64400] text-xs font-medium mb-1">New</p>
        )}
        <h3 className="text-base font-medium text-gray-900 leading-tight">
          {product.name}
        </h3>
        <p className="mt-4 font-semibold text-sm">
          {formatPrice(product.basePrice)}
        </p>
      </div>
    </motion.a>
  );
};
export default SliderCard;
