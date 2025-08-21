import type { IProject } from "@/data/StaticData";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { id, name, status, image, year } = project;

  // Handle mouse movement for cursor follower
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(rect.left, rect.right)
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link to={`/projects/${id}`}>
      <motion.div 
        className={`flex flex-col overflow-hidden rounded-md relative cursor-pointer ${id%2===1 ? 'md:top-[-10vh]':''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-md">
          <motion.img
            src={image}
            alt={name || "Project Image"}
            className="object-cover rounded-md w-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/20 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Mouse follower "View Detail" button */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute z-10 bg-black rounded-md whitespace-nowrap text-white px-4 py-2 text-sm font-medium pointer-events-none shadow-[30px_54px_67px_0px_rgba(209,217,230,0.67),25px_27px_27px_-7px_rgba(209,217,230,0.34),-34px_-30px_65px_0px_rgba(255,255,255,0.75),-9px_-20px_29px_0px_rgba(255,255,255,0.54),-13px_-11px_22px_7px_rgba(255,255,255,0.25),-16px_-7px_21px_4px_rgba(255,255,255,0.25)]"
                style={{
                  left: mousePosition.x - 50, // Center the button on cursor
                  top: mousePosition.y - 40,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25, 
                  duration: 0.2 
                }}
              >
                View Detail
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <motion.div 
          className="p-4 flex flex-col md:flex-row items-end justify-between md:gap-5"
          animate={{ 
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 0.9 : 1 
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <div className="">
            <div className="flex items-center gap-1">
              <h3 className="text-md text-gray-500 capitalize">{status} </h3>
              <h3 className="text-md text-primary capitaliz md:hidden"> - View Detail</h3>
            </div>
            <h3 className="text-lg font-semibold text-[#3f3f3f]">{name}</h3>
          </div>
          <div>
            <h3 className="text-md text-gray-500 capitalize">{year}</h3>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;


