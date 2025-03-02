import { ProductSelectionTypes } from "@/src/@types";
import { formatPrice } from "@/src/lib/utils";

const Summary = ({
  productName,
  selectionOption,
  totalPrice,
  selectionType,
}: {
  productName: string;
  selectionOption: Record<string, string>;
  totalPrice: number;
  selectionType: ProductSelectionTypes[];
}) => {
  console.log(selectionOption);
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">Your {productName}</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">MODEL</span>
          <span className="font-medium">{productName}</span>
        </div>
        {selectionType.map((select) => {
          return (
            <article
              className="flex justify-between py-2 border-b"
              key={select}
            >
              <span className="text-gray-600">{select.toUpperCase()}</span>
              <span className="font-medium">{selectionOption[select]}</span>
            </article>
          );
        })}
      </div>
      <div className="flex justify-between py-2 ">
        <span className="text-gray-600">PRICE</span>
        <span className="font-medium">{formatPrice(totalPrice)}</span>
      </div>
    </section>
  );
};

export default Summary;
