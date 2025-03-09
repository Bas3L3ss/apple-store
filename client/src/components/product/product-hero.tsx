import { Link } from "react-router";
import { Button } from "../ui/button";
import CloudinaryImage from "../reusable/cloudinary-image";

const ProductHero = ({
  product,
}: {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}) => {
  return (
    <div className="relative overflow-hidden">
      <CloudinaryImage publicId="hero__gb4d3fd8jnu6_large_vs7v6i" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className={`text-6xl font-bold  text-black`}>{product.name}</h1>
        <p className={`text-2xl mt-4 text-black`}>{product.description}</p>
        <div className="flex gap-4 mt-6">
          <Button size="lg" className="rounded-full">
            <Link to={`/more/${product.name}`}>Learn more</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            <Link to={`/shop/${product.name}`}>Buy</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductHero;
