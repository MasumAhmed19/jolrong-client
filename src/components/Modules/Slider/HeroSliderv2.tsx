import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import MainLogo from "@/assets/MainLogo.png";
import JolrongLogoWhite from "@/assets/JolrongLogoWhite.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

// Mock data for demonstration
const heroSlides = [
  {
    id: 1,
    bgImage:
      "https://res.cloudinary.com/do0abdlxo/image/upload/v1762486024/jolrong/2c-1762486024309.jpg",
    title: "Modern Architecture",
  },
  {
    id: 2,
    bgImage:
      "https://res.cloudinary.com/do0abdlxo/image/upload/v1762486024/jolrong/1-1762486024246.jpg",
    title: "Contemporary Design",
  },
  {
    id: 3,
    bgImage:
      "https://res.cloudinary.com/do0abdlxo/image/upload/v1762485434/jolrong/1r%20%284%29-1762485434409.jpg",
    title: "Luxury Living",
  },
];

const HeroSliderv2 = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    const nextIndex = (current + 1) % heroSlides.length;
    goToSlide(nextIndex);
  }, [current, goToSlide]);

  const goToPrev = useCallback(() => {
    const prevIndex = current === 0 ? heroSlides.length - 1 : current - 1;
    goToSlide(prevIndex);
  }, [current, goToSlide]);

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSignificant = Math.abs(distance) > 50;

    if (isSignificant) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Autoplay functionality - robust version
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [goToNext]);

  // GSAP animations for smoother transitions
  useGSAP(() => {
    const slides = gsap.utils.toArray(".slide-item") as Element[];
    gsap.to(slides, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      pointerEvents: "none"
    });
    gsap.to(slides[current], {
      opacity: 1,
      duration: 0.7,
      ease: "power2.inOut",
      pointerEvents: "auto"
    });
  }, [current]);

  return (
   <div className="relative w-screen left-1/2 -ml-[50vw] -mt-[8.2vh] md:-mt-[10vh]">
     <div 
        ref={containerRef}
        className="relative md:min-h-[110vh] h-[108vh] min-h-[500px] max-h-[1080px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding Images Container */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide-item absolute inset-0 opacity-0 pointer-events-none`}
            >
              <img
                src={slide.bgImage}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
            </div>
          ))}
        </div>

        {/* Static Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
          <div className="w-full max-w-[90%] xs:max-w-sm sm:max-w-md md:max-w-lg ">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 md:p-10  text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-4">
                {/* Logo */}
                <div className="w-full flex justify-center">
                  <img
                    className="h-14 sm:h-16 md:h-30  w-auto object-contain"
                    src={JolrongLogoWhite}
                    alt="Logo"
                  />
                </div>

                {/* Tagline */}
                <h2 className="text-center text-sm xs:text-base sm:text-lg font-light leading-relaxed px-2 sm:px-4 md:px-6">
                  Creating timeless spaces that define contemporary living.
                </h2>

                <Button size="lg" className="text-white bg-primary ">
                  <Link to="/projects">View Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Hidden on Mobile, Visible on Tablet+ */}
        <button
          onClick={goToPrev}
          className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all flex items-center justify-center pointer-events-auto  sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all flex items-center justify-center pointer-events-auto  sm:flex"
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

