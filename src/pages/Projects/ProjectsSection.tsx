import { portfolioData, type IProject } from "@/data/StaticData";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import BaseSection from "@/layout/BaseSection";


const ProjectsSection = () => {
    const [projects] = useState<IProject[]>(portfolioData.projects);
    console.log(projects)
  return (
    <BaseSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
        {
          projects.map((project, index)=>(
            <ProjectCard project={project} key={index}/>
          ))
        }
      </div>
    </BaseSection>
  )
}

export default ProjectsSection

