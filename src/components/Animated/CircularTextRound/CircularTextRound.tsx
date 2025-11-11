import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export const CircularTextRound = ({ text = "Jolrong*Architects*Design*Interior" }) => {
  const repeatedText = (text + " ").repeat(3);

  return (
    <motion.div
      className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.6,
        ease: [0.23, 1, 0.320, 1],
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            />
          </defs>
          <text className="text-[11px] sm:text-[12px] lg:text-[13px] fill-white font-medium tracking-[0.15em] uppercase">
            <textPath href="#circlePath" startOffset="0%">
              {repeatedText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.8,
          ease: [0.23, 1, 0.320, 1],
        }}
      >
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
