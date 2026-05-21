import ProjectsSection2 from "./ProjectSection2";
import HeadSecitonv2 from "@/components/Modules/HeadSectionv2";
import ContainerWidth from "@/layout/ContainerWidth";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema } from "@/lib/seo";

const Projects = () => {
  const breadcrumb = [
    { name: "Home", url: "https://jolrongarchitects.com" },
    { name: "Projects", url: "https://jolrongarchitects.com/projects" },
  ];

  return (
    <>
      <SEOHead
        title="Our Projects - Jolrong Architects"
        description="Explore our portfolio of completed and ongoing architectural projects including residential, commercial, interior design and visualization work. View case studies and project details."
        canonical="https://jolrongarchitects.com/projects"
        ogImage="https://jolrongarchitects.com/og-image-projects.png"
        ogType="website"
        keywords={["Projects", "Portfolio", "Architecture", "Design", "Case Studies", "Architecture Portfolio"]}
        structuredData={generateBreadcrumbSchema(breadcrumb)}
      />
      <ContainerWidth className="min-h-screen bg-white mb-25 md:px-0 px-6">
        <div className="md:py-[40px]">
          <HeadSecitonv2
            title="Our projects"
            description="Ready to transform your space? We'd excited to hear about your project and discuss how we can
bring your architectural vision to life."
          />
        </div>

        <ProjectsSection2 />
      </ContainerWidth>
    </>
  );
};

export default Projects;
