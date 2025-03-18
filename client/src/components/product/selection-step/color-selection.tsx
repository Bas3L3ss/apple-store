import { ProductOption } from "@/src/@types";
import { getColorHex } from "@/src/lib/utils";
import { motion } from "framer-motion";

interface ColorSelectionProps {
  colorOptions: ProductOption[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorSelection = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
}: ColorSelectionProps) => {
  // Map color names to actual color values for visual representation

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colorOptions.map((option) => (
          <motion.button
            key={option._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedColor(option.color!);
            }}
            className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
              selectedColor === option.color
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full mb-3`}
              style={{ backgroundColor: getColorHex(option.color!) }}
            />
            <span className="text-sm font-medium">{option.color}</span>
            {option.price > 0 && (
              <span className="text-xs text-gray-500 mt-1">
                +${option.price}
              </span>
            )}
            {selectedColor === option.color && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
