import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { ProductOption } from "@/src/@types";

const ProcessorSelection = ({
  processorOptions,
  selectedProcessor,
  setSelectedProcessor,
}: {
  processorOptions: ProductOption[];
  selectedProcessor: string;
  setSelectedProcessor: (val: string) => void;
}) => {
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">Choose Processor</h3>
      <RadioGroup
        value={selectedProcessor}
        onValueChange={setSelectedProcessor}
        className="grid grid-cols-2 gap-4"
      >
        {processorOptions.map((option) => (
          <div key={option.processor} className="flex items-start space-x-2">
            <RadioGroupItem
              value={option.processor!}
              id={`processor-${option.processor}`}
            />
            <div className="grid gap-1.5">
              <Label
                htmlFor={`processor-${option.processor}`}
                className="font-medium"
              >
                {option.processor}
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

export default ProcessorSelection;
