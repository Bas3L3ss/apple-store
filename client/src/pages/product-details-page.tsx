import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { slug } = useParams();
  return <div>{slug}</div>;
};

export default ItemDetails;
