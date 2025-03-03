import { Card, CardContent } from "../ui/card";
import { supportCards } from "@/src/constants/support-cards";

const SupportCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      {supportCards.map((item, index) => (
        <Card
          key={index}
          className="text-center hover:shadow-md transition-shadow"
        >
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4 text-blue-500">
              {item.icon}
            </div>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-2">
              Get help with your {item.title}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SupportCards;
