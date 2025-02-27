import { useParams } from "react-router-dom";
import { searchProducts } from "../lib/mockData";

const ItemDetails = () => {
  const { slug } = useParams();
  const product = searchProducts.find((p) => {
    return p.name == slug;
  });
  console.log(product);
  return <div>{slug}</div>;
};

export default ItemDetails;
