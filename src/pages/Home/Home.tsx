
import ExploreProjects from "./ExploreProjects";
import HeroSliderv2 from "@/components/Modules/Slider/HeroSliderv2";
import Expertise from "./Expertise";
import ContainerWidth from "@/layout/ContainerWidth";
import SEOHead from "@/components/SEOHead";
import { generateOrganizationSchema } from "@/lib/seo";

const Home = () => {
  return (
    <>
      <SEOHead
        title="Jolrong Architects - Architecture Farm in Dhaka, Bangladesh"
        description="Architecture firm in Dhaka, Bangladesh specializing in residential, commercial, interior design and 3D visualization. Expert consultancy services."
        canonical="https://jolrongarchitects.com"
        ogImage="https://jolrongarchitects.com/og-image-home.png"
        ogType="website"
        keywords={["Architecture", "Interior Design", "Exterior Design", "Dhaka", "Bangladesh", "Design Studio", "Visualization"]}
        structuredData={generateOrganizationSchema()}
      />
      <div className="min-h-screen">
        <HeroSliderv2 />
        <ContainerWidth>
          <Expertise />
          <section className="">
            <ExploreProjects />
          </section>
        </ContainerWidth>
      </div>
    </>
  );
};

export default Home;
