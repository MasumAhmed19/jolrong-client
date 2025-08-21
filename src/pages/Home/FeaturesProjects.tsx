import { useRef, useState } from "react";
import { featuredData } from "../../data/StaticData";
import Card from "./Card";
import { useScroll } from "framer-motion";

const FeaturedProjects = () => {
  const [projects] = useState(featuredData.projects);
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="mx-auto mt-[12vh] md:mt-[8vh]">
      {projects.map((project, idx) => {
        const targetScale = 1 - (projects.length - idx) * 0.01;
        return (
          <Card 
            key={idx}
            i={idx}
            {...project}
            id={String(project.id)}
            color={project.color ?? "#000"} // Provide a default color if undefined
            progress={scrollYProgress}
            range={[idx * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export default FeaturedProjects;
