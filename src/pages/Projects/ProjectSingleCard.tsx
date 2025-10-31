// import type { IProject } from "@/types";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { Link } from "react-router";

// interface IProjectCardProps {
//   project: IProject;
//   index?: number;
// }

// const ProjectSingleCard: React.FC<IProjectCardProps> = ({ project, index = 0 }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   // Destructure with proper handling of optional fields
//   const { 
//     name, 
//     status, 
//     image, 
//     year,  
//     slug, 
//   } = project;

//   // Handle mouse movement for cursor follower
//   const handleMouseMove = (e: React.MouseEvent) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setMousePosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   return (
//     <Link to={`/projects/${slug}`}>
//       <motion.div 
//         className={`flex flex-col overflow-hidden rounded-md relative cursor-pointer ${index % 2 === 1 ? 'md:top-[10vh]' : ''}`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onMouseMove={handleMouseMove}
//       >
//         {/* Image Container */}
//         <div className="relative overflow-hidden rounded-md">
//           <motion.img
//             src={image}
//             alt={name || "Project Image"}
//             className="object-cover rounded-md w-full"
//             whileHover={{ scale: 1.1 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//           />
          
//           {/* Overlay on hover */}
//           <motion.div
//             className="absolute inset-0 bg-black/20 rounded-md"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isHovered ? 1 : 0 }}
//             transition={{ duration: 0.4 }}
//           />

//           {/* Mouse follower "View Detail" button */}
//           <AnimatePresence>
//             {isHovered && (
//               <motion.div
//                 className="absolute z-10 bg-black rounded-md whitespace-nowrap text-white px-4 py-2 text-sm font-medium pointer-events-none shadow-[30px_54px_67px_0px_rgba(209,217,230,0.67),25px_27px_27px_-7px_rgba(209,217,230,0.34),-34px_-30px_65px_0px_rgba(255,255,255,0.75),-9px_-20px_29px_0px_rgba(255,255,255,0.54),-13px_-11px_22px_7px_rgba(255,255,255,0.25),-16px_-7px_21px_4px_rgba(255,255,255,0.25)]"
//                 style={{
//                   left: mousePosition.x - 50,
//                   top: mousePosition.y - 40,
//                 }}
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0, opacity: 0 }}
//                 transition={{ 
//                   type: "spring", 
//                   stiffness: 400, 
//                   damping: 25, 
//                   duration: 0.2 
//                 }}
//               >
//                 View Detail
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Content */}
//         <motion.div 
//           className="p-4 flex flex-col md:flex-row items-end justify-between md:gap-5"
//           animate={{ 
//             y: isHovered ? -5 : 0,
//             opacity: isHovered ? 0.9 : 1 
//           }}
//           transition={{ duration: 0.1, ease: "easeOut" }}
//         >
//           <div className="">
//             <div className="flex items-center gap-1">
//               <h3 className="text-md text-gray-500 capitalize">{status} </h3>
//               <h3 className="text-md text-primary capitalize md:hidden"> - View Detail</h3>
//             </div>
//             <h3 className="text-lg font-semibold text-[#3f3f3f]">{name}</h3>
//           </div>
//           <div>
//             <h3 className="text-md text-gray-500 capitalize">{year}</h3>
//           </div>
//         </motion.div>
//       </motion.div>
//     </Link>
//   );
// };

// export default ProjectCard;


import type { IProject } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

interface IProjectCardProps {
  project: IProject;
  index?: number;
}

const ProjectSingleCard: React.FC<IProjectCardProps> = ({ project, index = 0 }) => {
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

  return (
    <Link to={`/projects/${slug}`}>
      <motion.div
        className={`flex flex-col overflow-hidden rounded-md relative cursor-pointer transition-all duration-300 ${
          index % 2 === 1 ? "md:top-[10vh]" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-md h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px]">
          <motion.img
            src={image}
            alt={name || "Project Image"}
            className="object-cover rounded-md w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
              <h3 className="text-sm sm:text-md text-gray-500 capitalize">{status}</h3>
              {/* Visible on mobile only */}
              <h3 className="text-sm text-primary capitalize sm:hidden"> - View Detail</h3>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#3f3f3f] mt-1">
              {name}
            </h3>
          </div>

          <div className="mt-2 sm:mt-0">
            <h3 className="text-sm sm:text-md text-gray-500 capitalize">{year}</h3>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProjectSingleCard;

