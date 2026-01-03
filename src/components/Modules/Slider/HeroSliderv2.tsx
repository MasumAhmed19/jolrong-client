import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MainLogo from "@/assets/MainLogo.png";

// Mock data for demonstration
const heroSlides = [
  {
    id: 1,
    bgImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop",
    title: "Modern Architecture",
  },
  {
    id: 2,
    bgImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop",
    title: "Contemporary Design",
  },
  {
    id: 3,
    bgImage:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&h=1080&fit=crop",
    title: "Luxury Living",
  },
];

const HeroSliderv2 = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToNext = () => {
    const nextIndex = current === heroSlides.length - 1 ? 0 : current + 1;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = current === 0 ? heroSlides.length - 1 : current - 1;
    goToSlide(prevIndex);
  };

  // Autoplay functionality
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      autoplayRef.current = setInterval(() => {
        goToNext();
      }, 6000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    startAutoplay();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [current]);

  return (
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] -mt-[8vh] md:-mt-[10vh]">
      <div className="relative h-screen min-h-[500px] max-h-[1080px] overflow-hidden">
        {/* Sliding Images Container */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === current
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.bgImage}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70"></div>
            </div>
          ))}
        </div>

        {/* Static Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
          <div className="w-full max-w-[90%] xs:max-w-sm sm:max-w-md md:max-w-lg ">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 md:p-10  text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {/* Logo */}
                <div className="w-full flex justify-center">
                  <img
                    className="h-12 xs:h-14 sm:h-16 md:h-24  w-auto object-contain"
                    src={MainLogo}
                    alt="Logo"
                  />
                </div>

                {/* Tagline */}
                <h2 className="text-center text-sm xs:text-base sm:text-lg font-light leading-relaxed px-2 sm:px-4 md:px-6">
                  Creating timeless spaces that define contemporary living.
                </h2>


              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Hidden on Mobile, Visible on Tablet+ */}
        <button
          onClick={goToPrev}
          className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all flex items-center justify-center pointer-events-auto hidden sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all flex items-center justify-center pointer-events-auto hidden sm:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Slide Indicators - Always Visible */}
        <div className="absolute bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2 pointer-events-auto">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-6 sm:w-7 md:w-8 bg-white"
                  : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60 active:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSliderv2;
