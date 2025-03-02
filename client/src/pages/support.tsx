import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  HeadphonesIcon,
  MessageSquareIcon,
  PhoneIcon,
  ShieldIcon,
  SmartphoneIcon,
  TabletIcon,
  LaptopIcon,
  HelpCircleIcon,
} from "lucide-react";
import { faqItems } from "../constants/faq";

export function Support() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");

  // Form state
  const [formData, setFormData] = useState({
    subject: "",
    product: "",
    message: "",
    attachment: null as File | null,
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call or submission logic here
  };

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold mb-4">Apple Support</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get help with your Apple products. Find answers, troubleshoot
            issues, and connect with our support team.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { icon: <SmartphoneIcon className="h-8 w-8" />, title: "iPhone" },
            { icon: <TabletIcon className="h-8 w-8" />, title: "iPad" },
            { icon: <LaptopIcon className="h-8 w-8" />, title: "Mac" },
            { icon: <HeadphonesIcon className="h-8 w-8" />, title: "AirPods" },
          ].map((item, index) => (
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

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="faq" className="text-base py-3">
              <HelpCircleIcon className="h-4 w-4 mr-2" />
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-base py-3">
              <MessageSquareIcon className="h-4 w-4 mr-2" />
              Contact Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about Apple products and
                  services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Contact Apple Support</CardTitle>
                <CardDescription>
                  {isAuthenticated
                    ? "Send us a message and we'll get back to you as soon as possible."
                    : "Please sign in to contact Apple Support."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAuthenticated ? (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What's your inquiry about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">Product</Label>
                      <select
                        id="product"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.product}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a product</option>
                        <option value="iphone">iPhone</option>
                        <option value="ipad">iPad</option>
                        <option value="mac">Mac</option>
                        <option value="watch">Apple Watch</option>
                        <option value="airpods">AirPods</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue in detail..."
                        className="min-h-[150px]"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="attachment">Attachment (optional)</Label>
                      <Input
                        id="attachment"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        You can attach screenshots or other files to help us
                        understand your issue.
                      </p>
                      {formData.attachment && (
                        <p className="text-xs text-gray-500">
                          {formData.attachment.name}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Request
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <ShieldIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Authentication Required
                    </h3>
                    <p className="text-gray-500 mb-6">
                      You need to be signed in to contact Apple Support.
                    </p>
                    <Button
                      onClick={() => setIsAuthenticated(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start border-t pt-6">
                <h4 className="font-medium mb-2">Need immediate assistance?</h4>
                <div className="flex items-center text-blue-600">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <a href="tel:1-800-275-2273" className="hover:underline">
                    Call 1-800-MY-APPLE
                  </a>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
