import { useRef } from "react";
import { featuredData } from "../../data/StaticData";
import Card from "./Card";
import { useScroll } from "framer-motion";
import { useAllProjectsQuery } from "@/redux/api/projects/projects.api";
import type { IProject } from "@/types";

const bgColor = ["#FFF8F3", "#F5FFF8", "#F7F8FF", "#F8FFFF", "#FFF9FB"];

const FeaturedProjects = () => {
  const { data: projectsData, isLoading } = useAllProjectsQuery({
    isFeatured: true,
    limit:5
  });

  const projects = projectsData?.data ?? featuredData.projects;
  console.log(projects)

  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (isLoading) {
    return (
      <div ref={container} className="mx-auto mt-[12vh] md:mt-[8vh]">
        Loading...
      </div>
    );
  }

  return (
    <div ref={container} className="mx-auto mt-[12vh] md:mt-[20vh] ">
      {projects.map((project, idx) => {
        const typedProject = project as IProject;
        const index = idx as number;
        const targetScale = 1 - (projects.length - idx) * 0.01;
        return (
          <Card
            key={idx}
            index={index}
            project={typedProject}
            color={bgColor[idx]} 
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export default FeaturedProjects;


