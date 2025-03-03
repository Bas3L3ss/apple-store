import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";

const MoreCTA = () => {
  // TODO: make this dynamic based on product
  return (
    <section className="mb-20">
      <div className="bg-gray-50 rounded-3xl p-12 md:p-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
          Ready to experience the iPhone 15 Pro?
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          From $999 or $41.62/mo. for 24 mo. before trade-in*
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            Buy
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
            Learn more
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          * Trade-in values vary based on condition, year, and configuration of
          your trade-in device.
        </p>
      </div>
    </section>
  );
};

export default MoreCTA;
