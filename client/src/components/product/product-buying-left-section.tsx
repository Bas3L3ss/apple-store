import { Product } from "@/src/@types";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ProductBuyingLeftSection = ({
  product,
  isNew,
}: {
  isNew: boolean;
  product: Product;
}) => {
  return (
    <div className="space-y-8  lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
      <div className="mt-10">
        {isNew && (
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            New
          </Badge>
        )}
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
          {product.name}
        </h1>
        <p className="text-xl text-gray-500 mt-4 max-w-xl">
          {product.description}
        </p>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tech-specs">Tech Specs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <h3 className="text-xl font-medium">
              Titanium. So strong. So light. So Pro.
            </h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">
              The A17 Pro chip brings a new level of performance and capability
              to iPhone.
            </p>
          </TabsContent>
          <TabsContent value="tech-specs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Chip</h4>
                <p className="text-gray-600">A17 Pro chip</p>
              </div>
              <div>
                <h4 className="font-medium">Camera</h4>
                <p className="text-gray-600">
                  48MP Main | Ultra Wide | Telephoto
                </p>
              </div>
              <div>
                <h4 className="font-medium">Display</h4>
                <p className="text-gray-600">Super Retina XDR display</p>
              </div>
              <div>
                <h4 className="font-medium">Battery</h4>
                <p className="text-gray-600">Up to 29 hours video playback</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductBuyingLeftSection;
