import { Button } from "../../ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Product } from "@/src/@types";
import CloudinaryImage from "../../reusable/cloudinary-image";
import { Link } from "react-router";

const MoreHero = ({ product }: { product: Product }) => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <CloudinaryImage
          publicId={product.productImages[0]}
          alt={product.name}
          className="h-full w-full rounded-lg object-cover"
          width={1000}
          height={1000}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight">
          {product.name}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
          {product.description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to={`/shop/${product.slug}`}>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-8"
            >
              Buy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className=" text-black px-8">
            <Play className="mr-2 h-4 w-4 fill-white" />
            Watch the film
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MoreHero;
