import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import JolrongLogoWhite from "../assets/JolrongLogoWhite.png";

const Preloader2 = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Select 4 stunning images for the preloader
    const images = [
        "https://res.cloudinary.com/do0abdlxo/image/upload/v1762487943/jolrong/C_07-1762487943564.jpg",
        "https://res.cloudinary.com/do0abdlxo/image/upload/v1762486981/jolrong/render_camera_View010-1762486980927.jpg",
        "https://res.cloudinary.com/do0abdlxo/image/upload/v1762486060/jolrong/7-1762486060795.jpg",
        "https://res.cloudinary.com/do0abdlxo/image/upload/v1762487482/jolrong/ismail_final%20-%20Copy-1762487482020.jpg",
    ];

    useEffect(() => {

        // Image rotation
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 750); // Change image every 0.75s

        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 60); // Updates frequently for smooth animation

        return () => {
            document.body.style.overflow = "unset";
            clearInterval(imageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.6, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-[9999] bg-black"
        >
            {/* Background Image Slideshow */}
            <div className="absolute inset-0">
                <AnimatePresence mode="sync">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={images[currentImageIndex]}
                            alt="Architecture"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Animated Geometric Frame */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-8 md:inset-16 border border-white/20"
            >
                {/* Corner Accents */}
                {[
                    "top-0 left-0",
                    "top-0 right-0",
                    "bottom-0 left-0",
                    "bottom-0 right-0",
                ].map((position, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.3 + i * 0.1,
                            ease: "easeOut",
                        }}
                        className={`absolute ${position} w-8 h-8 md:w-12 md:h-12`}
                    >
                        <div
                            className={`absolute bg-white ${position.includes("top")
                                ? "top-0"
                                : "bottom-0"
                                } ${position.includes("left")
                                    ? "left-0"
                                    : "right-0"
                                } w-full h-[2px]`}
                        />
                        <div
                            className={`absolute bg-white ${position.includes("top")
                                ? "top-0"
                                : "bottom-0"
                                } ${position.includes("left")
                                    ? "left-0"
                                    : "right-0"
                                } w-[2px] h-full`}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col items-center justify-center px-4">
                {/* Logo */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                    }}
                    className="mb-12"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.02, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-48 md:w-72"
                    >
                        <img
                            src={JolrongLogoWhite}
                            alt="Jolrong Logo"
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mb-8"
                >
                    <p className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase font-light">
                        Loading Experience
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "10%", opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="w-64 md:w-96 relative"
                >
                    {/* Background Line */}
                    <div className="h-[1px] bg-white/20 w-full relative overflow-hidden">
                        {/* Progress Line */}
                        <motion.div
                            style={{ width: `${progress}%` }}
                            className="absolute left-0 top-0 h-full bg-white"
                            transition={{ duration: 0.1, ease: "linear" }}
                        />
                    </div>

                    {/* Progress Percentage */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-4 text-center"
                    >
                        <span className="text-white/70 text-xs md:text-sm font-light tracking-wider">
                            {Math.round(progress)}%
                        </span>
                    </motion.div>
                </motion.div>

                {/* Bottom Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="absolute bottom-8 md:bottom-12"
                >
                    <p className="text-white/40 text-xs tracking-widest uppercase">
                        Architecture & Design
                    </p>
                </motion.div>
            </div>

            {/* Subtle Scan Line Effect */}
            <motion.div
                animate={{
                    y: ["0%", "100%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
                style={{ top: "-8rem" }}
            />
        </motion.div>
    );
};

export default Preloader2;