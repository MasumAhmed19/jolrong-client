
import ExploreProjects from "./ExploreProjects";
import HeroSliderv2 from "@/components/Modules/Slider/HeroSliderv2";
import Expertise from "./Expertise";
// import HeroSliderv3 from "@/components/Modules/Slider/HeroSliderv3";
// import Hero2 from "./Hero2";
// import HeroSlider from "@/components/Modules/Slider/HeroSlider";

const Home = () => {
  return (
    <div className="min-h-screen">
        {/* <Hero2 /> */}
        {/* <HeroSlider /> */}

      <HeroSliderv2 />
      {/* <HeroSliderv3 /> */}
      <Expertise />
      <section className="">
        <ExploreProjects />
      </section>
      
    </div>
  );
};

export default Home;
