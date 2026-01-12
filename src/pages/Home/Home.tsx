
import ExploreProjects from "./ExploreProjects";
import HeroSliderv2 from "@/components/Modules/Slider/HeroSliderv2";
import Expertise from "./Expertise";
import ContainerWidth from "@/layout/ContainerWidth";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSliderv2 />
      <ContainerWidth>
        <Expertise />
        <section className="">
          <ExploreProjects />
        </section>
      </ContainerWidth>
    </div>
  );
};

export default Home;
