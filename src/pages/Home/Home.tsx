
import HeroSlider from "@/components/Modules/Slider/HeroSlider";
import ExploreProjects from "./ExploreProjects";

const Home = () => {
  return (
    <div className="min-h-screen ">
      <HeroSlider />
        {/* <Hero2 /> */}
      <section className="">
        <ExploreProjects />
      </section>
      
    </div>
  );
};

export default Home;
