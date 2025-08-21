
import ExploreProjects from "./ExploreProjects";
import Hero2 from "./Hero2";

const Home = () => {
  return (
    <div className="min-h-screen ">
      {/* <Hero /> */}
        <Hero2 />
      <section className="mt-[-300px] md:mt-[-400px]">
        <ExploreProjects />
      </section>
      
    </div>
  );
};

export default Home;
