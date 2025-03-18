import { useState, useEffect, useMemo } from "react";
import type { Product } from "@/src/@types";

export function useProductConfiguration(product?: Product) {
  const selectionSteps = useMemo(
    () => product?.productSelectionStep ?? [],
    [product?.productSelectionStep]
  );

  const basePrice = product?.basePrice ?? 0;

  const productOptions = useMemo(
    () => product?.productOptions ?? [],
    [product?.productOptions]
  );

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const [totalPrice, setTotalPrice] = useState(basePrice);

  useEffect(() => {
    if (!selectionSteps.length) return;

    setSelectedOptions(
      selectionSteps.reduce((acc, step) => {
        acc[step] = "";
        return acc;
      }, {} as Record<string, string>)
    );
  }, [selectionSteps]);

  useEffect(() => {
    if (!product) return;

    let newPrice = basePrice;
    Object.entries(selectedOptions).forEach(([_, value]) => {
      if (!value) return;

      for (const opt of productOptions) {
        for (const [key, val] of Object.entries(selectedOptions)) {
          //@ts-expect-error: no prob
          if (opt[key] == val) {
            newPrice += opt.price;
          }
        }
      }
    });

    setTotalPrice(newPrice);
  }, [selectedOptions, basePrice, productOptions, product]);

  const handleSelect = (value: string, optionType: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType.toLowerCase()]: value,
    }));
  };

  const isConfigurationComplete = () => {
    return selectionSteps.every(
      (step) => selectedOptions[step.toLowerCase()] !== ""
    );
  };

  const getLastStepSelected = () => {
    const lastStep = selectionSteps[selectionSteps.length - 1];
    return lastStep ? selectedOptions[lastStep.toLowerCase()] !== "" : false;
  };

  return {
    selectedOptions,
    totalPrice,
    handleSelect,
    isConfigurationComplete,
    getLastStepSelected,
  };
}
