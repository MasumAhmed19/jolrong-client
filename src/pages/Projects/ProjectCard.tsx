import type { IProject } from "@/data/StaticData";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { id, name, type, status, image, year } = project;

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle mouse movement for cursor follower
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <Link to={`/projects/${id}`} className="block">
      <motion.div
        className="relative flex flex-col justify-center items-center rounded-xl overflow-hidden min-h-[50vh] md:min-h-[50vh] sm:min-h-[40vh] cursor-pointer"
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        onMouseMove={handleMouseMove}
        animate={{
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <motion.img
            src={image}
            alt={name || "Project Image"}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isHovered
                ? "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.3))"
                : isMobile
                ? "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.3), rgba(0,0,0,0.1))"
                : "linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1), transparent)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Desktop: Mouse follower "View" circle */}
        <AnimatePresence>
          {!isMobile && isHovered && (
            <motion.div
              className="absolute z-50 w-30 h-30 bg-primary rounded-full flex items-center justify-center pointer-events-none mix-blend-normal"
              style={{
                left: mousePosition.x - 60,
                top: mousePosition.y - 60,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.2 }}
            >
              <span className="text-white text-xs font-medium">View</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: Always visible title at bottom */}
        {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-lg font-bold mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/80">{type}</span>
              <span className="text-white/60">•</span>
              <span className="text-white/80">{year}</span>
            </div>
          </div>
        )}

        {/* Desktop hover details */}
        <AnimatePresence>
          {!isMobile && isHovered && (
            <motion.div
              className="relative text-white text-center space-y-4 p-6 max-w-sm z-30"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {/* Status and Type badges */}
              <motion.div
                className="flex items-center justify-center gap-2 mb-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: 0.05, ease: "easeInOut" }}
              >
                {status && (
                  <span className="px-3 py-1 bg-primary text-xs font-medium rounded-full">
                    {status}
                  </span>
                )}
                <span className="px-2 py-1 bg-white/20 text-xs font-medium rounded-full uppercase tracking-wider">
                  {type}
                </span>
                <span className="text-sm opacity-80">{year}</span>
              </motion.div>

              {/* Project Title */}
              <motion.h3
                className="font-bold mb-3 text-2xl"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.25, delay: 0.1, ease: "easeInOut" }}
              >
                {name}
              </motion.h3>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;