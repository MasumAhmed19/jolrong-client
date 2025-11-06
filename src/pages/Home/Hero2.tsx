import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StaticImages } from "../../data/StaticData";
import { motion } from "framer-motion";
import MainLogo from "../../assets/MainLogo.png";

const Hero2 = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      //3
      src: StaticImages.heroImage1,
      scale: scale4,
      // Original desktop positioning
      adjustDesktop: "top-[-18vh] left-[30vw] w-[22vw] h-[30vh]",
      // Mobile responsive positioning
      adjustMobile: "top-[-11vh] left-[28vw] w-[22vw] h-[16vh]",
    },
    {
      //2
      src: StaticImages.heroImage2,
      scale: scale5,
      adjustDesktop: "top-[-37vh] left-[0vw] w-[30vw] h-[32vh]",
      adjustMobile: "top-[-17vh] left-[0vw] w-[18vw] h-[13vh]",
    },
    {
      //0
      src: StaticImages.heroImage3,
      scale: scale6,
      adjustDesktop: "w-[31vw] h-[29vh]",
      adjustMobile: "w-[20vw] h-[15vh]",
    },
    {
      //1
      src: StaticImages.heroImage4,
      scale: scale7,
      adjustDesktop: "top-[-18vh] left-[-30vw] w-[22vw] h-[30vh]",
      adjustMobile: "top-[-11vh] left-[-28vw] w-[22vw] h-[16vh]",
    },
    {
      //6
      src: StaticImages.heroImage1,
      scale: scale8,
      adjustDesktop: "top-[20vh] left-[-30vw] w-[22vw] h-[27vh]",
      adjustMobile: "top-[11vh] left-[-28vw] w-[22vw] h-[16vh]",
    },
    {
      //5
      src: StaticImages.heroImage3,
      scale: scale9,
      adjustDesktop: "top-[37vh] left-[0vw] w-[30vw] h-[32vh]",
      adjustMobile: "top-[17vh] left-[0vw] w-[18vw] h-[13vh]",
    },
    {
      //4
      src: StaticImages.heroImage3,
      scale: scale9,
      adjustDesktop: "top-[20vh] left-[30vw] w-[22vw] h-[27vh]",
      adjustMobile: "top-[11vh] left-[28vw] w-[22vw] h-[16vh]",
    },
  ];

  return (
    <>
      <div className="mt-[30vh] mb-[30vh] sm:mt-[50vh] sm:mb-[50vh]">
        <div className="absolute top-[7.5rem] left-[1%] sm:top-[10rem] z-10 w-full flex flex-col items-center px-4 text-center text-black gap-3 sm:gap-5 md:gap-6">
          {/* Logo */}
          <img className="h-16 sm:h-20 md:h-24" src={MainLogo} alt="Logo" />

          {/* Description */}
          <p className="max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[35%] text-sm sm:text-sm md:text-base text-slate-700 leading-relaxed">
            Creating timeless furniture pieces that define contemporary living
            through exceptional design and craftsmanship.
          </p>
        </div>

        <div
          ref={container}
          className="h-[200vh] sm:h-[300vh] relative -mt-55 md:mt-0 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        >
          {/* Sticky container */}
          <div className="sticky top-0 h-[100vh] overflow-hidden">
            {pictures.map(
              ({ src, scale, adjustDesktop, adjustMobile }, idx) => {
                return (
                  <motion.div
                    style={{ scale }}
                    key={idx}
                    className="w-[100%] h-[100%] absolute top-0 flex items-center justify-center"
                  >
                    {/* Desktop version */}
                    <div
                      className={`${adjustDesktop} relative hidden sm:block`}
                    >
                      <img
                        src={src}
                        className="object-cover w-full h-full"
                        alt={`Hero ${idx + 1}`}
                      />
                    </div>

                    {/* Mobile version */}
                    <div
                      className={`${adjustMobile} relative block sm:hidden overflow-hidden rounded-sm shadow-sm`}
                    >
                      <img
                        src={src}
                        className="object-cover w-full h-full"
                        alt={`Hero ${idx + 1}`}
                      />
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero2;
