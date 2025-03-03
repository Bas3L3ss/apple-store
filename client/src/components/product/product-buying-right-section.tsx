import { Product, ProductSelectionTypes } from "@/src/@types";
import ColorSelection from "./selection-step/color-selection";
import StorageSelection from "./selection-step/storage-selection";
import AccessoriesSelection from "./selection-step/accessories-selection";
import SizeSelection from "./selection-step/size-selection";
import CarrierSelection from "./selection-step/carrier-selection";
import MaterialSelection from "./selection-step/material-selection";
import ProcessorSelection from "./selection-step/processor-selection";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";
const ProductBuyingRightSection = ({
  product,
  selectedOptions,
  handleSelect,
}: {
  selectedOptions: Record<string, string>;
  product: Product;
  handleSelect: (value: string, optionType: string) => void;
}) => {
  return (
    <div className="space-y-8">
      {product.productSelectionStep.map((step, index) => {
        const SelectionComponent = (() => {
          switch (step) {
            case ProductSelectionTypes.Color:
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="selection-container"
                >
                  <h3 className="text-lg font-medium mb-4">Pick your finish</h3>
                  <ColorSelection
                    colorOptions={product.productOptions.filter(
                      (opt) => opt.color
                    )}
                    selectedColor={
                      selectedOptions[ProductSelectionTypes.Color.toLowerCase()]
                    }
                    setSelectedColor={(val: string) =>
                      handleSelect(
                        val,
                        ProductSelectionTypes.Color.toLowerCase()
                      )
                    }
                  />
                </motion.div>
              );
            case ProductSelectionTypes.Storage:
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="selection-container"
                >
                  <h3 className="text-lg font-medium mb-4">
                    How much storage do you need?
                  </h3>
                  <StorageSelection
                    storageOptions={product.productOptions.filter(
                      (opt) => opt.storage
                    )}
                    selectedStorage={
                      selectedOptions[
                        ProductSelectionTypes.Storage.toLowerCase()
                      ]
                    }
                    setSelectedStorage={(val: string) =>
                      handleSelect(
                        val,
                        ProductSelectionTypes.Storage.toLowerCase()
                      )
                    }
                  />
                </motion.div>
              );
            case ProductSelectionTypes.Accessories:
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="selection-container"
                >
                  <h3 className="text-lg font-medium mb-4">Add accessories</h3>
                  <AccessoriesSelection
                    accessoriesOptions={product.productOptions.filter(
                      (opt) => opt.accessories
                    )}
                    selectedAccessories={
                      selectedOptions[
                        ProductSelectionTypes.Accessories.toLowerCase()
                      ]
                    }
                    setSelectedAccessories={(val: string) =>
                      handleSelect(
                        val,
                        ProductSelectionTypes.Accessories.toLowerCase()
                      )
                    }
                  />
                </motion.div>
              );
            case ProductSelectionTypes.Carrier:
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="selection-container"
                >
                  <h3 className="text-lg font-medium mb-4">
                    Choose your carrier
                  </h3>
                  <CarrierSelection
                    carrierOptions={product.productOptions.filter(
                      (opt) => opt.carrier
                    )}
                    selectedCarrier={
                      selectedOptions[
                        ProductSelectionTypes.Carrier.toLowerCase()
                      ]
                    }
                    setSelectedCarrier={(val: string) =>
                      handleSelect(
                        val,
                        ProductSelectionTypes.Carrier.toLowerCase()
                      )
                    }
                  />
                </motion.div>
              );
            case ProductSelectionTypes.Material:
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="selection-container"
                >
                  <h3 className="text-lg font-medium mb-4">Select material</h3>
                  <MaterialSelection
                    materialOptions={product.productOptions.filter(
                      (opt) => opt.material
                    )}
                    selectedMaterial={
                      selectedOptions[
                        ProductSelectionTypes.Material.toLowerCase()
                      ]
                    }
                    setSelectedMaterial={(val: string) =>
                      handleSelect(
                        val,
                        ProductSelectionTypes.Material.toLowerCase()
                      )
                    }
                  />
                </motion.div>
              );
            case ProductSelectionTypes.Processor:
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="selection-container"
                >
                  <h3 className="text-lg font-medium mb-4">
                    Choose your processor
                  </h3>
                  <ProcessorSelection
                    processorOptions={product.productOptions.filter(
                      (opt) => opt.processor
                    )}
                    selectedProcessor={
                      selectedOptions[
                        ProductSelectionTypes.Processor.toLowerCase()
                      ]
                    }
                    setSelectedProcessor={(val: string) =>
                      handleSelect(
                        val,
                        ProductSelectionTypes.Processor.toLowerCase()
                      )
                    }
                  />
                </motion.div>
              );
            case ProductSelectionTypes.Size:
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="selection-container"
                >
                  <h3 className="text-lg font-medium mb-4">Pick your size</h3>
                  <SizeSelection
                    sizeOptions={product.productOptions.filter(
                      (opt) => opt.size
                    )}
                    selectedSize={
                      selectedOptions[ProductSelectionTypes.Size.toLowerCase()]
                    }
                    setSelectedSize={(val: string) =>
                      handleSelect(
                        val,
                        ProductSelectionTypes.Size.toLowerCase()
                      )
                    }
                  />
                </motion.div>
              );
            default:
              return null;
          }
        })();

        return (
          <div key={step}>
            {SelectionComponent}
            {index < product.productSelectionStep.length - 1 && (
              <Separator className="my-8" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductBuyingRightSection;
