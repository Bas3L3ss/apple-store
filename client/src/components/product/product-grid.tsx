import ProductCard from "./product-card";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router";
import { useGetProducts } from "@/src/react-query-hooks/use-get-products";
import GlobalLoader from "../global-loader";

export default function ProductGrid({
  setProductsFound,
}: {
  setProductsFound: (number: number) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading, isError } = useGetProducts({
    search: searchQuery,
    category,
    page: currentPage,
    limit: 8,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params.toString());
  };

  if (isLoading) {
    return <GlobalLoader />;
  }
  const products = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;
  const totalAmount = data?.pagination.total ?? 0;
  setProductsFound(totalAmount);
  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <p className="text-center text-gray-500">
          Sorry, we couldn't load the products. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            {data?.pagination.total === 0
              ? "No products found"
              : `Showing ${totalAmount} product${
                  products.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-500">{currentPage}</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length > 0 ? (
          <>
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0], // Apple-style ease curve
                }}
                className="flex flex-col h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </>
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 mb-2">No products found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or category filters
            </p>
          </div>
        )}
      </div>
      {/* Pagination - Apple-style minimalist pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-1" aria-label="Pagination">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                px-3 py-2 rounded-md text-sm font-medium
                ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
              aria-label="Previous page"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {[...Array(totalPages).keys()].map((number) => {
                const pageNumber = number + 1;
                // Only show 5 page numbers at a time with current page in the middle when possible
                const pageNumbers = [];
                let startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, startPage + 4);

                // Adjust if we're near the end
                if (endPage - startPage < 4) {
                  startPage = Math.max(1, endPage - 4);
                }

                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(i);
                }

                if (!pageNumbers.includes(pageNumber)) {
                  return null;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`
                      px-3 py-1 rounded-md text-sm font-medium
                      ${
                        currentPage === pageNumber
                          ? "bg-gray-800 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                px-3 py-2 rounded-md text-sm font-medium
                ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
              aria-label="Next page"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
