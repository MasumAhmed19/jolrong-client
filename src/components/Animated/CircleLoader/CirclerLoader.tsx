
import { motion } from "motion/react";



// Animated Loader Component
export const CircleLoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Outer rotating circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Middle rotating circle (opposite direction) */}
        <motion.div
          className="absolute inset-3 rounded-full border-3 border-transparent border-b-primary border-l-primary"
          animate={{ rotate: -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-6 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};