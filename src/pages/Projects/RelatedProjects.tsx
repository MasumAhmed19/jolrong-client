import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Copy from "@/components/copy/Copy";

const RelatedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Skyline Residency",
      location: "Gulshan, Dhaka",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      status: "Ongoing",
      type: "Residential",
    },
    {
      id: 2,
      title: "Green Valley Apartments",
      location: "Banani, Dhaka",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
      status: "Ongoing",
      type: "Residential",
    },
    {
      id: 3,
      title: "Pearl Heights",
      location: "Dhanmondi, Dhaka",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&sat=-20",
      status: "Ongoing",
      type: "Residential",
    },
    {
      id: 4,
      title: "Urban Oasis",
      location: "Bashundhara R/A",
      image:
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=400&fit=crop",
      status: "Ongoing",
      type: "Commercial",
    },
    {
      id: 5,
      title: "Royal Gardens",
      location: "Uttara, Dhaka",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
      status: "Ongoing",
      type: "Residential",
    },
    {
      id: 6,
      title: "Metro Plaza",
      location: "Mirpur, Dhaka",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      status: "Ongoing",
      type: "Mixed Use",
    },
  ];

  return (
    <div className="py-12">
      <Copy>
        <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-8">
          Explore More Ongoing Projects
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
          {projects.map((project) => (
            <CarouselItem
              key={project.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-medium text-gray-300 mb-1 block">
                      {project.type}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>
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
