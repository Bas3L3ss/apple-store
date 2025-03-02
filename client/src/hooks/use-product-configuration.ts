import { useState, useEffect } from "react";
import type { Product } from "@/src/@types";

export function useProductConfiguration(product: Product) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    return product.productSelectionStep.reduce((acc, step) => {
      acc[step.toLowerCase()] = "";
      return acc;
    }, {} as Record<string, string>);
  });

  const [totalPrice, setTotalPrice] = useState(product.basePrice);

  useEffect(() => {
    let newPrice = product.basePrice;
    Object.entries(selectedOptions).forEach(([key, value]) => {
      if (!value) return;

      const option = product.productOptions.find((opt) => {
        const optionKey = key as keyof typeof opt;
        return opt[optionKey] === value;
      });

      if (option) newPrice += option.price;
    });

    setTotalPrice(newPrice);
  }, [selectedOptions, product.basePrice, product.productOptions]);

  const handleSelect = (value: string, optionType: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType.toLowerCase()]: value,
    }));
  };

  const isConfigurationComplete = () => {
    return product.productSelectionStep.every(
      (step) => selectedOptions[step.toLowerCase()] !== ""
    );
  };

  const getLastStepSelected = () => {
    const lastStep =
      product.productSelectionStep[product.productSelectionStep.length - 1];
    return selectedOptions[lastStep.toLowerCase()] !== "";
  };

  return {
    selectedOptions,
    totalPrice,
    handleSelect,
    isConfigurationComplete,
    getLastStepSelected,
  };
}
