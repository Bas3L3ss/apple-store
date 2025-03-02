import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-neutral-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center">
            Page/Product not found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            The page/product you're looking for doesn't exist.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="default" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default NotFound;
