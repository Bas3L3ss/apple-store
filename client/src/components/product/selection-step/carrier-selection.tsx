import { ProductOption } from "@/src/@types";
import { motion } from "framer-motion";

interface CarrierSelectionProps {
  carrierOptions: ProductOption[];
  selectedCarrier: string;
  setSelectedCarrier: (carrier: string) => void;
}

const CarrierSelection = ({
  carrierOptions,
  selectedCarrier,
  setSelectedCarrier,
}: CarrierSelectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {carrierOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCarrier(option.carrier!)}
            className={`relative flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
              selectedCarrier === option.carrier
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-base font-medium mb-1">{option.carrier}</span>
            <span className="text-sm text-gray-500">
              {option.price === 0 ? "Included" : `+$${option.price}`}
            </span>
            {selectedCarrier === option.carrier && (
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

export default CarrierSelection;
