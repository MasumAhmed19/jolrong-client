import ProjectsSection2 from "./ProjectSection2";
import HeadSecitonv2 from "@/components/Modules/HeadSectionv2";
import ContainerWidth from "@/layout/ContainerWidth";

const Projects = () => {
  return (
    <ContainerWidth className="min-h-screen bg-white mb-25 md:px-0 px-6">
      <div className="md:py-[40px]">
        <HeadSecitonv2
          title="Our projects"
          description="Ready to transform your space? We'd love to hear about your project and discuss how we can
bring your architectural vision to life."
        />
      </div>

      <ProjectsSection2 />
    </ContainerWidth>
  );
};

export default Projects;
