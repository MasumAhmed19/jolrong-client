

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
    // const year = new Date(createdAt).getFullYear();
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
                className="relative rounded-xl overflow-hidden cursor-pointer group break-inside-avoid mb-4"
                onHoverStart={() => !isMobile && setIsHovered(true)}
                onHoverEnd={() => !isMobile && setIsHovered(false)}
                onClick={handleCardClick}
                animate={{
                    filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {/* Image - Natural Height */}
                <motion.img
                    src={image}
                    alt={title || "Creative Work"}
                    className="w-full h-auto object-cover block"
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />

                {/* Overlay Gradient */}
                <motion.div
                    className="absolute inset-0 z-10"
                    animate={{
                        background: isHovered
                            ? "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.3))"
                            : "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                    <motion.div
                        className="flex items-center gap-2 mb-2"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                    >
                        <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full uppercase tracking-wider backdrop-blur-sm">
                            {displayTag}
                        </span>
                    </motion.div>
                    <h3 className="text-white text-lg font-bold leading-tight">{title}</h3>
                </div>
            </motion.div>

            {/* Image Preview Modal */}
            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-2 sm:p-4 md:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClosePreview}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[10000] p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                            onClick={handleClosePreview}
                            aria-label="Close preview"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>

                        {/* Image container */}
                        <motion.div
                            className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={image}
                                    alt={title || "Creative Work"}
                                    className="max-w-full max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-140px)] w-auto h-auto object-contain rounded-lg"
                                />

                                {/* Image details overlay */}
                                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 md:p-6 rounded-b-lg">
                                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                        <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full uppercase tracking-wider">
                                            {displayTag}
                                        </span>
                                        <span className="text-white/80 text-xs sm:text-sm">{year}</span>
                                    </div>
                                    <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold line-clamp-2">
                                        {title}
                                    </h3>
                                </div> */}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CreativeCard;