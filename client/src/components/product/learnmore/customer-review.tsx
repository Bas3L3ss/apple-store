import { Card, CardContent } from "../../ui/card";
import { Star } from "lucide-react";

const CustomerReview = () => {
  // TODO-optional: Make this dynamic
  return (
    <section className="mb-32">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
        What people are saying
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Alex Johnson",
            rating: 5,
            comment:
              "The titanium design is a game-changer. It feels so premium yet lightweight in my hand. The camera system is incredible too!",
          },
          {
            name: "Sarah Miller",
            rating: 4,
            comment:
              "I upgraded from the 13 Pro and the performance difference is noticeable. The display is brighter and the battery lasts all day.",
          },
          {
            name: "Michael Chen",
            rating: 5,
            comment:
              "The A17 Pro chip handles everything I throw at it. Gaming performance is stellar and the camera takes stunning photos in any lighting.",
          },
        ].map((review, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <p className="text-gray-700 mb-6">"{review.comment}"</p>
              <p className="font-medium">{review.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CustomerReview;
