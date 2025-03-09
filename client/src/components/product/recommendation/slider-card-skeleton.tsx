import { Skeleton } from "../../ui/skeleton";

const SliderCardSkeleton = () => (
  <div className="flex-shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm p-6">
    <Skeleton className="w-full h-[250px] rounded-xl mb-4" />
    <div className="flex items-center gap-1 justify-center mt-2 mb-3">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="size-3 rounded-full" />
      ))}
    </div>
    <div className="w-full">
      <Skeleton className="h-5 w-16 mb-1" />
      <Skeleton className="h-6 w-full mb-4" />
      <Skeleton className="h-5 w-20 mt-4" />
    </div>
  </div>
);

export default SliderCardSkeleton;
