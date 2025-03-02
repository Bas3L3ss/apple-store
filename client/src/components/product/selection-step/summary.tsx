import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ProductSelectionTypes } from "@/src/@types";

interface SummaryProps {
  selectionOption: Record<string, string>;
  productName: string;
  selectionType: ProductSelectionTypes[];
  totalPrice: number;
}

const Summary = ({
  selectionOption,
  productName,
  selectionType,
  totalPrice,
}: SummaryProps) => {
  const formatOptionName = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
          <img
            src="/api/placeholder/100/100"
            alt={productName}
            className="w-12 h-12 object-contain"
          />
        </div>
        <div>
          <h3 className="font-medium text-lg">{productName}</h3>
          <p className="text-gray-500 text-sm">
            Customized to your specifications
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {selectionType.map((type) => {
          const optionKey = type.toLowerCase();
          const selectedValue = selectionOption[optionKey];

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: selectedValue ? 1 : 0.5, y: 0 }}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                {selectedValue && (
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                )}
                <span className="text-gray-600">{formatOptionName(type)}</span>
              </div>
              <span className="font-medium">
                {selectedValue || "Not selected"}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total</span>
          <span className="text-xl font-bold">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Pay monthly with Apple Card: ${Math.round(totalPrice / 24)}/mo. at 0%
          APR
        </p>
      </div>
    </div>
  );
};

export default Summary;
