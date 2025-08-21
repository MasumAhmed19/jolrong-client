import { ArrowRight } from "lucide-react";
import { StaticImages } from "@/data/StaticData";
import CircularText from "@/components/CircularText/CircularText";

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-100px)] flex flex-col justify-center rounded-2xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={StaticImages.heroImage3}
          alt="Contemporary interior design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>
      <div className="pt-25 md:pt-10"></div>
      
      {/* Main Title */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 mb-4 sm:mb-8 md:mb-16">

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[12rem] font-bold tracking-wide leading-[0.85] font-sans">
          Contemporary
        </h1>
      </div>

      {/* Bottom Section with Cards and Circular Text */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-4 sm:gap-6 lg:gap-12">
          
          {/* Left Side - Two Overlapping Cards */}
          <div className="relative flex-1 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
              
              {/* Text Card */}
              <div className="relative bg-black/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white flex-1 sm:flex-[2] z-20">
                <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 text-white/80">
                  Crafting spaces that harmonize modern aesthetics with timeless elegance, our contemporary interior designs breathe life into every room, redefining the essence of chic living.
                </p>
                <button className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-white/80 transition-colors group">
                  View More
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              {/* Image Card */}
              <div className="relative hidden md:block bg-black/30 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-1 sm:p-2 lg:p-8 text-white flex-1 sm:flex-[2] z-20 h-32 sm:h-40 lg:h-auto">
                <img
                  src={StaticImages.heroImage3}
                  alt="Interior design showcase"
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Circular Text */}
          <div className="flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="scale-75 sm:scale-90 lg:scale-100">
              <CircularText
                text="Royal*Architecture*Design*"
                onHover="speedUp"
                spinDuration={20}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;