import { Link } from "react-router";
import { Button } from "../ui/button";

const ProductHero = ({
  product,
}: {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    theme: "light" | "dark";
  };
}) => {
  return (
    <div className="relative overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-110"
      />
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
