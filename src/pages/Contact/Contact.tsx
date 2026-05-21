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
      details: ["+880 1918167893", "+880 1660035644"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["jolrongarchitects@gmail.com"],
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
                    How much will my project cost?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    The project cost depends on the scope, size, design requirements, and overall details of the project. Kindly send us a message on WhatsApp so we can discuss your requirements in detail and provide a proper estimate.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    What will be the timeline for my project?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    The timeline depends on the project size, complexity, and specific requirements. After understanding your needs, we can provide an estimated project schedule.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    How can I start a project with your firm?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can start by contacting us through WhatsApp or phone and sharing your project details. We will discuss your ideas, requirements, and the next steps.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    What types of architectural services do you provide?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We provide architectural and interior design services, including residential, commercial, and customized design solutions tailored to client needs.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Do you provide interior design services as well?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, we offer interior design services to create functional, modern, and aesthetically pleasing spaces based on your preferences and requirements.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Can I customize the design according to my preferences?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely. Every project is designed according to the client's preferences, lifestyle, functionality, and vision.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Do you work on both residential and commercial projects?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, we work on both residential and commercial projects depending on the project scope and requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Do you offer consultation before starting the project?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, we provide consultations to understand your requirements, goals, and expectations before starting the design process.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    Where is your office located?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our office is located in Khilkhet, Dhaka – 1229, Bangladesh.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">
                    How can I contact your team?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can contact us directly through WhatsApp, phone, or by visiting our office in Khilkhet, Dhaka – 1229.
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
