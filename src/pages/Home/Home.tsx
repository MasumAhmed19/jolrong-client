
import ExploreProjects from "./ExploreProjects";
import HeroSliderv2 from "@/components/Modules/Slider/HeroSliderv2";
import Expertise from "./Expertise";

const Home = () => {
  return (
    <div className="min-h-screen ">
      <HeroSliderv2 />
      <Expertise />
        {/* <Hero2 /> */}
      <section className="">
        <ExploreProjects />
      </section>
      
    </div>
  );
};

export default Home;
