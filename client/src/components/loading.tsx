import { Loader2 } from "lucide-react";

const LoadingState = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <Loader2 className="h-12 w-12 text-gray-400 animate-spin mb-4" />
    <p className="text-gray-500 text-lg">Loading...</p>
  </div>
);

export default LoadingState;
