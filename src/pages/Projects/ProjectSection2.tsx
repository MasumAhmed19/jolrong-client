import { portfolioData, type IProject } from "@/data/StaticData";
import { useState } from "react";
import BaseSection from "@/layout/BaseSection";
import SimpleCard from "./SimpleCard";


const ProjectsSection2 = () => {
    const [projects] = useState<IProject[]>(portfolioData.projects);
    console.log(projects)
  return (
    <BaseSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-30 gap-5">
        {
          projects.map((project, index)=>(
            <SimpleCard project={project} key={index}/>
          ))
        }
      </div>
    </BaseSection>
  )
}

export default ProjectsSection2

