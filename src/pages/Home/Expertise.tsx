import HeadSeciton from "@/components/Modules/HeadSection";
import BaseSection from "@/layout/BaseSection";
import { Building2, Map, Home, ClipboardList } from "lucide-react";

const expertiseData = [
  {
    id: 1,
    title: "Architectural Design",
    description:
      "From initial concept sketches to detailed construction drawings, we manage the full design lifecycle.",
    icon: Building2,
  },
  {
    id: 2,
    title: "Urban Planning",
    description:
      "Developing sustainable, resilient, and human-centered plans for future cities and communities.",
    icon: Map,
  },
  {
    id: 3,
    title: "Interior Design",
    description:
      "Crafting functional and aesthetic internal spaces that complement the building's architectural vision.",
    icon: Home,
  },
  {
    id: 4,
    title: "Project Management",
    description:
      "Overseeing construction and coordinating teams to ensure projects are delivered on time and within budget.",
    icon: ClipboardList,
  },
];

const Expertise = () => {
  return (
    <BaseSection>
      <section className="py-1 space-y-8">
        {/* Section Header */}
        <HeadSeciton
          title="Our Expertise"
          btnText="false"
          description="We deliver thoughtful design and strategic execution across every stage of the built environment."
        />

        {/* Expertise Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {expertiseData.map((expertise) => {
            const Icon = expertise.icon;
            return (
              <div key={expertise.id} className="space-y-3 border hover:border-primary transition duration-300 p-5 md:p-10 rounded-md">
                <Icon className="w-8 h-8 text-[#9d519a] mb-2" />
                <h3 className="text-xl font-medium">{expertise.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {expertise.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </BaseSection>
  );
};

export default Expertise;
