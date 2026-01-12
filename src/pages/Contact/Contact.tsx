import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail } from "lucide-react";
import HeadSecitonv2 from "@/components/Modules/HeadSectionv2";
import ContainerWidth from "@/layout/ContainerWidth";

export default function Contact() {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "WhatsApp",
      details: ["+1 (555) 123-4567"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hello@jolrong.com"],
    },
  ];

  return (
    <ContainerWidth className="min-h-screen bg-white mb-60 md:mb-70 md:px-0 px-6">
      <div className="md:py-[40px] ">
        <HeadSecitonv2
          title="Contact Us"
          description="Ready to transform your space? We'd love to hear about your project and discuss how 
              we can bring your architectural vision to life."
        />
      </div>

      {/* Contact Form & Info Section */}
      <section className="">
        <div className="mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-light mb-8 text-gray-900">
                Start a Conversation
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXTERIOR">Exterior</SelectItem>
                      <SelectItem value="INTERIOR">Interior</SelectItem>
                      <SelectItem value="STRUCTURAL">Structural</SelectItem>
                      <SelectItem value="GRAPHICS">Graphics</SelectItem>
                      <SelectItem value="LANDSCAPE">Landscape</SelectItem>

                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    className="min-h-32 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-light mb-8 text-gray-900">
                Get In Touch
              </h2>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-none bg-gray-50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-gray-700 mt-1">{info.icon}</div>
                        <div>
                          <h3 className="text-lg font-medium mb-2 text-gray-900">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-600">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-gray-50 mt-20 ">
        <div className="container mx-auto">
          <div className="px-10 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-light mb-6 text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our architectural services and process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    What is your design process?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our process begins with understanding your vision, followed
                    by concept development, design refinement, and construction
                    documentation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    How long does a typical project take?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Project timelines vary based on scope and complexity.
                    Residential projects typically take 6-12 months, while
                    commercial projects may take 12-24 months.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Do you work on projects outside New York?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, we work on projects nationwide and internationally.
                    We're happy to discuss travel arrangements for projects
                    outside our local area.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    What services do you offer?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We offer comprehensive architectural services including
                    design consultation, space planning, construction
                    documentation, and project management.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    How do you determine project costs?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Project costs are determined based on scope, complexity,
                    timeline, and specific requirements. We provide detailed
                    proposals after our initial consultation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Do you handle permits and approvals?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, we assist with all necessary permits, zoning approvals,
                    and regulatory compliance throughout the design and
                    construction process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContainerWidth>
  );
}
