import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ProductOption } from "@/src/@types";

const AccessoriesSelection = ({
  accessoriesOptions,
  selectedAccessories,
  setSelectedAccessories,
}: {
  accessoriesOptions: ProductOption[];
  selectedAccessories: string;
  setSelectedAccessories: (val: string) => void;
}) => {
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">
        <span className="text-sm text-muted-foreground">(optional)</span> Any
        additonal plugins?
      </h3>
      <RadioGroup
        value={selectedAccessories}
        onValueChange={setSelectedAccessories}
        className="grid grid-cols-2 gap-4"
      >
        {accessoriesOptions.map((option) => (
          <div key={option.accessories} className="flex items-start space-x-2">
            <RadioGroupItem
              value={option.accessories!}
              id={`accessories-${option.accessories}`}
            />
            <div className="grid gap-1.5">
              <Label
                htmlFor={`accessories-${option.accessories}`}
                className="font-medium"
              >
                {option.accessories}
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

export default AccessoriesSelection;
