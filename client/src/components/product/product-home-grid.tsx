import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const ProductGrid = () => {
  const gridProducts = [
    {
      id: "iphone-15",
      name: "iPhone 15",
      description: "Camera mới. Thiết kế mới. Mới lịm tim.",
      image: "/api/placeholder/600/400",
      theme: "light",
    },
    {
      id: "iphone-152",
      name: "iPhone 15",
      description: "Camera mới. Thiết kế mới. Mới lịm tim.",
      image: "/api/placeholder/600/400",
      theme: "light",
    },
    {
      id: "iphone-15",
      name: "iPhone 15",
      description: "Camera mới. Thiết kế mới. Mới lịm tim.",
      image: "/api/placeholder/600/400",
      theme: "light",
    },
    {
      id: "iphone-152",
      name: "iPhone 15",
      description: "Camera mới. Thiết kế mới. Mới lịm tim.",
      image: "/api/placeholder/600/400",
      theme: "light",
    },

    {
      id: "iphone-156",
      name: "iPhone 15",
      description: "Camera mới. Thiết kế mới. Mới lịm tim.",
      image: "/api/placeholder/600/400",
      theme: "light",
    },
    {
      id: "iphone-158",
      name: "iPhone 15",
      description: "Camera mới. Thiết kế mới. Mới lịm tim.",
      image: "/api/placeholder/600/400",
      theme: "light",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {gridProducts.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden min-h-[400px] md:min-h-[760px]"
        >
          <CardContent className="p-0 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2
                className={`text-4xl font-bold ${
                  product.theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {product.name}
              </h2>
              <p
                className={`text-xl mt-2 ${
                  product.theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {product.description}
              </p>
              <div className="flex gap-4 mt-4">
                <Button size="sm" className="rounded-full">
                  <a href={`/more/${product.name}`}>Learn more</a>
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <a href={`/shop/${product.name}`}>Buy</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default ProductGrid;
