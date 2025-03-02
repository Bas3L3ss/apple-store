import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ProductOption } from "@/src/@types";

const SizeSelection = ({
  sizeOptions,
  selectedSize,
  setSelectedSize,
}: {
  sizeOptions: ProductOption[];
  selectedSize: string;
  setSelectedSize: (val: string) => void;
}) => {
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">
        How big would you like it to be?
      </h3>
      <RadioGroup
        value={selectedSize}
        onValueChange={setSelectedSize}
        className="grid grid-cols-2 gap-4"
      >
        {sizeOptions.map((option) => (
          <div key={option.size} className="flex items-start space-x-2">
            <RadioGroupItem value={option.size!} id={`size-${option.size}`} />
            <div className="grid gap-1.5">
              <Label htmlFor={`size-${option.size}`} className="font-medium">
                {option.size}
              </Label>
              <p className="text-sm text-gray-500">
                {option.price > 0 ? `+$${option.price}` : "Included"}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
};

export default SizeSelection;
