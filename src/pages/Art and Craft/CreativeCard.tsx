import type { ICreative } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ICreativeCardProps {
    creative: ICreative;
}

const CreativeCard: React.FC<ICreativeCardProps> = ({ creative }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const { title, image, tags } = creative;
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

    // Prevent body scroll when preview is open
    useEffect(() => {
        if (showPreview) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showPreview]);

    const handleCardClick = () => {
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    return (
        <>
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

            {/* Image Preview Modal */}
            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePreview}
                    >
                        {/* Close button */}
                        <button
                            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-2.5 sm:p-3 bg-gray-900 hover:bg-gray-800 rounded-full transition-colors shadow-lg"
                            onClick={handleClosePreview}
                            aria-label="Close preview"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>

                        {/* Image container */}
                        <motion.div
                            className="relative w-full h-full max-w-6xl px-4 sm:px-8 py-16 sm:py-20 flex flex-col items-center justify-center"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image */}
                            <div className="relative w-full flex items-center justify-center">
                                <img
                                    src={image}
                                    alt={title || "Creative Work"}
                                    className="max-w-full max-h-[calc(100vh-160px)] w-auto h-auto object-contain rounded-xl shadow-2xl"
                                />
                            </div>

                            {/* Image details below */}
                            <div className="mt-6 sm:mt-8 text-center max-w-2xl">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase tracking-wide">
                                        {displayTag}
                                    </span>
                                </div>
                                <h3 className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold">
                                    {title}
                                </h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CreativeCard;