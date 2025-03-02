import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ProductOption } from "@/src/@types";

const ColorSelection = ({
  colorOptions,
  selectedColor,
  setSelectedColor,
}: {
  colorOptions: ProductOption[];
  selectedColor: string;
  setSelectedColor: (val: string) => void;
}) => {
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">Pick your finish</h3>
      <RadioGroup
        value={selectedColor}
        onValueChange={setSelectedColor}
        className="grid grid-cols-2 gap-4"
      >
        {colorOptions.map((option) => (
          <div key={option.color} className="flex items-start space-x-2">
            <RadioGroupItem
              value={option.color!}
              id={`color-${option.color}`}
            />
            <div className="grid gap-1.5">
              <Label htmlFor={`color-${option.color}`} className="font-medium">
                {option.color}
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

export default ColorSelection;
