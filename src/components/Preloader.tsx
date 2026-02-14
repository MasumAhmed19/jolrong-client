import { motion } from "framer-motion";
import { useEffect } from "react";
import MainLogo from "../assets/MainLogo.png";

const Preloader = () => {
    useEffect(() => {
        document.body.style.overflow = "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
            <div className="relative flex flex-col items-center gap-4">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 1.5,
                            ease: "easeOut",
                        },
                    }}
                    className="w-48 md:w-64"
                >
                    <img
                        src={MainLogo}
                        alt="Jolrong Logo"
                        className="w-full h-full object-contain"
                    />
                </motion.div>

                {/* Minimal Progress Line */}
                <div className="w-32 h-[2px] bg-muted overflow-hidden mt-4 rounded-full">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        className="w-full h-full bg-primary"
                    />
                </div>

                {/* Optional text or tagline if needed, keeping it minimal for now */}
            </div>
        </motion.div>
    );
};

export default Preloader;
