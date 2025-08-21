import HeadSeciton from "@/components/Modules/HeadSection";
import BaseSection from "@/layout/BaseSection";
import FeaturedProjects from "./FeaturesProjects";

const ExploreProjects = () => {
  return (
    <BaseSection>
      <HeadSeciton
        title="Explore Our Proudly Collection"
        btnText="Learn More"
        description="Jolrong Architect will showcase its vision of contemporary architecture, interior design trends, and innovative living."
      />
      <FeaturedProjects />
    </BaseSection>
  );
};

export default ExploreProjects;
