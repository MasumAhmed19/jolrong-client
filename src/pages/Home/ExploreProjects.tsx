import HeadSeciton from "@/components/Modules/HeadSection";
import BaseSection from "@/layout/BaseSection";
import FeaturedProjects from "./FeaturesProjects";

const ExploreProjects = () => {
  return (
    <BaseSection>
      <div className="-mb-10 md:-mb-30 -mt-15">
        <HeadSeciton
          title="Our Recent Projects"
          btnText="Learn More"
          description="Jolrong Architect will showcase its vision of contemporary architecture, interior design trends, and innovative living."
        />
      </div>
      <FeaturedProjects />
    </BaseSection>
  );
};

export default ExploreProjects;
