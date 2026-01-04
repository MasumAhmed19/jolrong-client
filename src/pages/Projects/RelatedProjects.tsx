import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Copy from "@/components/copy/Copy";
import { useGetRelatedProjectsQuery } from "@/redux/api/projects/projects.api";
import type { IProject } from "@/types";
import { Link } from "react-router";

interface RelatedProjectsProps {
  slug: string;
  limit?: number;
}

const RelatedProjects = ({ slug, limit = 6 }: RelatedProjectsProps) => {
  const { data: projectsData, isLoading } = useGetRelatedProjectsQuery({
    slug,
    limit,
  });

  const projects = projectsData?.data || [];

  if (isLoading) {
    return (
      <div className="py-12">
        <Copy>
          <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">
            Explore More Related Projects
          </h2>
        </Copy>
        <div className="text-center py-8 text-gray-500">Loading projects...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="py-12">
      <Copy>
        <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">
          Explore More Related Projects
        </h2>
      </Copy>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {projects.map((project: IProject) => (
            <CarouselItem
              key={project._id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={
                        project.image ||
                        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"
                      }
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {project.status.charAt(0) +
                        project.status.slice(1).toLowerCase()}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-medium text-gray-300 mb-1 block">
                      {project.type.charAt(0) + project.type.slice(1).toLowerCase()}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 -translate-x-12 hidden md:flex h-12 w-12 bg-white hover:bg-gray-100  text-gray-800">
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext className="right-0 translate-x-12 hidden md:flex h-12 w-12 bg-white hover:bg-gray-100  text-gray-800">
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default RelatedProjects;
