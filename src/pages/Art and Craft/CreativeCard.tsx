import type { ICreative } from "@/types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface ICreativeCardProps {
    creative: ICreative;
}

const CreativeCard: React.FC<ICreativeCardProps> = ({ creative }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    const { title, image, tags, slug } = creative;
    const displayTag = tags && tags.length > 0 ? tags[0] : "Art";

    // Detect mobile devices
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const handleCardClick = () => {
        if (slug) {
            navigate(`/art-and-craft/${slug}`);
        }
    };

    return (
        <motion.div
            className="relative bg-white rounded-2xl overflow-hidden cursor-pointer group"
            onHoverStart={() => !isMobile && setIsHovered(true)}
            onHoverEnd={() => !isMobile && setIsHovered(false)}
            onClick={handleCardClick}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            {/* Card Shadow */}
            <div className="absolute inset-0 rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-300" />

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-2xl">
                <motion.img
                    src={image}
                    alt={title || "Creative Work"}
                    className="w-full h-auto object-cover block"
                    animate={{
                        scale: isHovered ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Subtle Overlay on Hover */}
                <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"
                />
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Tag */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase tracking-wide">
                        {displayTag}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-gray-900 text-base font-semibold leading-snug line-clamp-2">
                    {title}
                </h3>
            </div>
        </motion.div>
    );
};

export default CreativeCard;