import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ProductOption } from "@/src/@types";

const StorageSelection = ({
  storageOptions,
  selectedStorage,
  setSelectedStorage,
}: {
  storageOptions: ProductOption[];
  selectedStorage: string;
  setSelectedStorage: (val: string) => void;
}) => {
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">
        How much storage do you need?
      </h3>
      <RadioGroup
        value={selectedStorage}
        onValueChange={setSelectedStorage}
        className="grid grid-cols-2 gap-4"
      >
        {storageOptions.map((option) => (
          <div key={option.storage} className="flex items-start space-x-2">
            <RadioGroupItem
              value={option.storage!}
              id={`storage-${option.storage}`}
            />
            <div className="grid gap-1.5">
              <Label
                htmlFor={`storage-${option.storage}`}
                className="font-medium"
              >
                {option.storage}
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

export default StorageSelection;
