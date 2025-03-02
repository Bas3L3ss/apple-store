import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ProductOption } from "@/src/@types";

const MaterialSelection = ({
  materialOptions,
  selectedMaterial,
  setSelectedMaterial,
}: {
  materialOptions: ProductOption[];
  selectedMaterial: string;
  setSelectedMaterial: (val: string) => void;
}) => {
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">Choose Material</h3>
      <RadioGroup
        value={selectedMaterial}
        onValueChange={setSelectedMaterial}
        className="grid grid-cols-2 gap-4"
      >
        {materialOptions.map((option) => (
          <div key={option.material} className="flex items-start space-x-2">
            <RadioGroupItem
              value={option.material!}
              id={`material-${option.material}`}
            />
            <div className="grid gap-1.5">
              <Label
                htmlFor={`material-${option.material}`}
                className="font-medium"
              >
                {option.material}
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

export default MaterialSelection;
