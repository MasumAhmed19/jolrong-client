// components/Description.tsx

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const slideUp = {
  initial: { y: "100%" },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

interface DescriptionProps {
  headline: string;
  textSize?: string; // Tailwind class like "text-3xl"
  textColor?: string; // Tailwind class like "text-black"
}

const Description: React.FC<DescriptionProps> = ({
  headline,
  textSize = "text-3xl",
  textColor = "text-black",
}) => {
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(descriptionRef, { once: false, amount: 0.3 });

  return (
    <div ref={descriptionRef} className="mt-[00px]  flex justify-center">
      <div className="max-w-[1400px] flex flex-col gap-8 relative">
        <p className={`${textSize} leading-[1.3] flex flex-wrap gap-[8px] ${textColor}`}>
          {headline.split(" ").map((word, index) => (
            <span key={index} className="relative inline-flex overflow-hidden">
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? "open" : "closed"}
                initial="initial"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Description;
