import { Button } from "@/src/components/ui/button";
import { ProductCategory } from "@/src/@types";
import { useSearchParams } from "react-router-dom";

export default function CategoryNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || null;

  const categories = [
    { name: "All", value: null },
    { name: "iPhone", value: ProductCategory.Iphone },
    { name: "MacBook", value: ProductCategory.Macbook },
    { name: "iPad", value: ProductCategory.Ipad },
    { name: "Apple Watch", value: ProductCategory.AppleWatch },
    { name: "AirPods", value: ProductCategory.AirPod },
    { name: "Accessories", value: ProductCategory.PhoneCase },
  ];

  const handleCategoryChange = (categoryValue: ProductCategory | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (categoryValue === null) {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", categoryValue);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={
              currentCategory === category.value ||
              (currentCategory === null && category.value === null)
                ? "default"
                : "ghost"
            }
            className={`rounded-full px-6 whitespace-nowrap ${
              currentCategory === category.value ||
              (currentCategory === null && category.value === null)
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => handleCategoryChange(category.value)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
