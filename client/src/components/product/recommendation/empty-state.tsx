// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4 w-full">
    <div className="text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No recommendations available
      </h3>
      <p className="text-gray-500 max-w-md">
        We don't have any recommendations for this category at the moment.
        Please check back later.
      </p>
    </div>
  </div>
);
export default EmptyState;
