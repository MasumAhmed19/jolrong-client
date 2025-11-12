import Copy from "@/components/copy/Copy";
import type { IProject } from "@/types";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

interface IProjectCardProps {
  project: IProject;
  index?: number;
}

const ProjectSingleCard: React.FC<IProjectCardProps> = ({
  project,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { name, status, image, year, slug } = project;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const imageVariants:Variants = {
  hidden: { y: 70, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

  return (
    <Link to={`/projects/${slug}`}>
      <motion.div
        className={`flex flex-col overflow-hidden rounded-md relative cursor-pointer transition-all duration-300 ${
          index % 2 === 1 ? "md:top-[10vh]" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15, delayChildren: index * 0.1 }}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-md h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px]">
          <motion.img
            src={image}
            alt={name || "Project Image"}
            className="object-cover rounded-md w-full h-full"
            whileHover={{ scale: 1.05 }}
            variants={imageVariants}

          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Mouse follower "View Detail" — desktop only */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute z-10 bg-black text-white whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md pointer-events-none hidden md:block"
                style={{
                  left: mousePosition.x - 50,
                  top: mousePosition.y - 40,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.2,
                }}
              >
                View Detail
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <motion.div
          className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-start justify-between sm:gap-5 mt-2 sm:mt-3"
          animate={{
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 0.95 : 1,
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <div className="w-full sm:w-auto">
            <div className="flex items-center gap-1 flex-wrap">
              <Copy delay={0.1}>
                <h3 className="text-sm sm:text-md text-gray-500 capitalize">
                  {status}
                </h3>
              </Copy>
              {/* Visible on mobile only */}
              <h3 className="text-sm text-primary capitalize sm:hidden">
                {" "}
                - View Detail
              </h3>
            </div>
            <Copy delay={0.2}>
              <h3 className="text-lg sm:text-xl font-semibold text-[#3f3f3f] mt-1">
                {name}
              </h3>
            </Copy>
          </div>

          <div className="mt-2 sm:mt-0">
            <Copy delay={0.1}>
              <h3 className="text-sm sm:text-md text-gray-500 capitalize">
                {year}
              </h3>
            </Copy>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProjectSingleCard;
