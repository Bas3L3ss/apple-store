import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO description="not found" title="Apple Store - Not Found" />
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
            <Button variant={"default"} asChild>
              <Link to={"/"}>Back to home</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default NotFound;
