import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

const HelpCard = () => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Need Help?</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Track Package
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Return Items
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpCard;
