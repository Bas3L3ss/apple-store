import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ProductOption } from "@/src/@types";

const CarrierSelection = ({
  carrierOptions,
  selectedCarrier,
  setSelectedCarrier,
}: {
  carrierOptions: ProductOption[];
  selectedCarrier: string;
  setSelectedCarrier: (val: string) => void;
}) => {
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">Choose your Iphone's Carrier</h3>
      <RadioGroup
        value={selectedCarrier}
        onValueChange={setSelectedCarrier}
        className="grid grid-cols-2 gap-4"
      >
        {carrierOptions.map((option) => (
          <div key={option.carrier} className="flex items-start space-x-2">
            <RadioGroupItem
              value={option.carrier!}
              id={`carrier-${option.carrier}`}
            />
            <div className="grid gap-1.5">
              <Label
                htmlFor={`carrier-${option.carrier}`}
                className="font-medium"
              >
                {option.carrier}
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

export default CarrierSelection;
