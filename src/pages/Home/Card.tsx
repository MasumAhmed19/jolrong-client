import { Button } from "@/components/ui/button";
import { MapPin, User } from "lucide-react";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Link } from "react-router";
import type { IProject } from "@/types";
import Copy from "@/components/copy/Copy";

export interface CardProps {
  project: IProject;
  index?: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  color?: string;
}

const Card: React.FC<CardProps> = ({
  index,
  project,
  progress,
  range,
  targetScale,
  color,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const {
    name,
    client,
    location,
    type,
    status,
    description,
    image,
    year,
    slug,
  } = project;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[100vh] flex items-center justify-center sticky top-25 md:top-40"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale: cardScale,
          top: `calc(-20% + ${(index as number) * 40}px)`,
        }}
        className="flex flex-col relative -top-[25%] min-h-[400px] container border border-primary mx-auto shadow-sm rounded-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 md:p-8 lg:p-10">
          {/* Project Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <motion.div
              style={{ scale: imgScale }}
              className="aspect-[3/2] w-full h-full rounded-2xl overflow-hidden elegant-shadow"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Status Badge */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6">
              <Copy>
                <motion.span
                  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-primary block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {status}
                </motion.span>
              </Copy>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              {/* Tags and Year */}
              <Copy>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium mr-2 rounded-full uppercase tracking-wider">
                    {type}
                  </span>
                  <span className="hidden sm:inline text-muted-foreground">
                    •
                  </span>
                  <span className="text-muted-foreground">{year}</span>
                </div>
              </Copy>

              {/* Project Title */}
              <Copy>
                <h1 className="text-xl md:text-2xl font-bold text-primary mb-4">
                  {name}
                </h1>
              </Copy>

              {/* Project Description */}
              <Copy>
                <p className="text-dm hidden md:block text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </Copy>
            </div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Client Info */}
              <div className="flex flex-col items-start gap-2 rounded-xl">
                <div className="flex items-center gap-1">
                  <User className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-semibold text-primary ">Client Name</h3>
                </div>

                <Copy>
                  <p className="text-muted-foreground text-md">{client}</p>
                </Copy>
              </div>

              {/* Location Info */}
              <motion.div className="flex items-start gap-3 rounded-xl">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Location</h3>
                  <Copy>
                    <p className="text-muted-foreground text-sm">{location}</p>
                  </Copy>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">

                <Button size="lg" className=" text-white">
                  <Link to={`/projects/${slug}`}>Learn More</Link>
                </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
