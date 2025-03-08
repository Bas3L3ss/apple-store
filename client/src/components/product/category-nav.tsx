import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ProductCategory } from "@/src/@types";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { categories } from "../categories";
import { useState, useEffect } from "react";

export default function CategoryNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || null;
  const searchQuery = searchParams.get("search") || "";

  const [searchText, setSearchText] = useState(searchQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      newSearchParams.set("search", debouncedSearch);
    } else {
      newSearchParams.delete("search");
    }
    setSearchParams(newSearchParams);
  }, [debouncedSearch]);

  const handleCategoryChange = (categoryValue: ProductCategory | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (categoryValue === null) {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", categoryValue);
    }

    setSearchParams(newSearchParams);
  };

  const handleSearchClick = () => {
    setDebouncedSearch(searchText);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-4">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <Input
          type="text"
          placeholder="Search Apple Products"
          className="bg-transparent border-none outline-none focus:ring-0 w-full text-gray-900 dark:text-white"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="ghost"
          className="ml-2 text-gray-700 hover:text-gray-900"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>

      {/* Category Navigation */}
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
