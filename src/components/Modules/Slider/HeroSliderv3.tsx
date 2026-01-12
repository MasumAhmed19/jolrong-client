import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";

/* =======================
   Static Slides
======================= */

interface Slide {
  id: number;
  title: string;
  bgImage: string;
}

const heroSlides: Slide[] = [
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

const HeroSliderv3: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const slideRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navigate = useNavigate();

  /* =======================
     Navigation
  ======================= */
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNavigate = () => {
    navigate("/projects");
  };

  /* =======================
     GSAP Animations
  ======================= */
  useEffect(() => {
    const currentImageWrapper = imageRefs.current[currentIndex];
    if (!currentImageWrapper) return;

    const ctx = gsap.context(() => {
      const img = currentImageWrapper.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.1 },
          { scale: 1, duration: 1.5, ease: "power2.out" }
        );
      }

      if (contentRef.current?.children) {
        const content = Array.from(contentRef.current.children);
        gsap.fromTo(
          content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }, slideRef);

    return () => ctx.revert();
  }, [currentIndex]);

  /* =======================
     Auto Play
  ======================= */
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  /* =======================
     Render
  ======================= */
  return (
    <div ref={slideRef} className="relative w-screen overflow-x-hidden left-1/2 -translate-x-1/2 h-screen overflow-hidden bg-charcoal">
      {/* Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => (imageRefs.current[index] = el)}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center">
          <div
            ref={contentRef}
            key={currentIndex}
            className="text-center mb-12 relative z-10 pointer-events-auto"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
              {heroSlides[currentIndex].title}
            </h1>
          </div>

          {/* Circular Button */}
          <div
            onClick={handleNavigate}
            className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center cursor-pointer pointer-events-auto group mt-4"
          >
            <div
              className="absolute inset-0 rounded-full border border-white/20 transition-transform duration-500 group-hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            />

            <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  />
                </defs>
                <text className="fill-white text-[8.5px] font-bold uppercase tracking-[0.16em]">
                  <textPath href="#circlePath">
                    View Projects • Explore •
                  </textPath>
                </text>
              </svg>
            </div>

            <FiArrowRight className="text-3xl text-white relative z-10 group-hover:-rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 right-12 z-30 flex space-x-4">
        <button
          onClick={prevSlide}
          className="p-4 border border-white/10 text-white hover:bg-white hover:text-charcoal transition-all rounded-full glass"
        >
          <FiArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 border border-white/10 text-white hover:bg-white hover:text-charcoal transition-all rounded-full glass"
        >
          <FiArrowRight />
        </button>
      </div>

      {/* Progress */}
      <div className="absolute bottom-12 left-12 z-30 text-white/50 text-xs tracking-widest font-mono">
        0{currentIndex + 1} / 0{heroSlides.length}
      </div>
    </div>
  );
};

export default HeroSliderv3;


// import { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// // import MainLogo from "@/assets/MainLogo.png";
// import JolrongLogoWhite from "@/assets/JolrongLogoWhite.png";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router";

// // Mock data for demonstration
// const heroSlides = [
//   {
//     id: 1,
//     bgImage:
//       "https://res.cloudinary.com/do0abdlxo/image/upload/v1762486024/jolrong/2c-1762486024309.jpg",
//     title: "Modern Architecture",
//   },
//   {
//     id: 2,
//     bgImage:
//       "https://res.cloudinary.com/do0abdlxo/image/upload/v1762486024/jolrong/1-1762486024246.jpg",
//     title: "Contemporary Design",
//   },
//   {
//     id: 3,
//     bgImage:
//       "https://res.cloudinary.com/do0abdlxo/image/upload/v1762485434/jolrong/1r%20%284%29-1762485434409.jpg",
//     title: "Luxury Living",
//   },
// ];

// const HeroSliderv2 = () => {
//   const [current, setCurrent] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const autoplayRef = useRef<NodeJS.Timeout | null>(null);

//   const goToSlide = (index: number) => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setCurrent(index);
//     setTimeout(() => setIsTransitioning(false), 700);
//   };

//   const goToNext = () => {
//     const nextIndex = current === heroSlides.length - 1 ? 0 : current + 1;
//     goToSlide(nextIndex);
//   };

//   const goToPrev = () => {
//     const prevIndex = current === 0 ? heroSlides.length - 1 : current - 1;
//     goToSlide(prevIndex);
//   };

//   // Autoplay functionality
// useEffect(() => {
//   const startAutoplay = () => {
//     if (autoplayRef.current) {
//       clearInterval(autoplayRef.current);
//     }
//     autoplayRef.current = setInterval(() => {
//       goToNext();
//     }, 5000); 
//   };

//   const stopAutoplay = () => {
//     if (autoplayRef.current) {
//       clearInterval(autoplayRef.current);
//       autoplayRef.current = null;
//     }
//   };

//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       stopAutoplay();
//     } else {
//       startAutoplay();
//     }
//   };

//   startAutoplay();
//   document.addEventListener("visibilitychange", handleVisibilityChange);

//   return () => {
//     stopAutoplay();
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//   };
// }, [current]);

//   return (
//    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] -mt-[8.2vh] md:-mt-[10vh]">
//      <div className="relative md:min-h-[110vh] h-[108vh] min-h-[500px] max-h-[1080px] overflow-hidden">
//         {/* Sliding Images Container */}
//         <div className="absolute inset-0">
//           {heroSlides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//                 index === current
//                   ? "opacity-100"
//                   : "opacity-0 pointer-events-none"
//               }`}
//             >
//               <img
//                 src={slide.bgImage}
//                 alt={slide.title}
//                 className="w-full h-full object-cover object-center"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
//             </div>
//           ))}
//         </div>

//         {/* Static Overlay Content */}
//         <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
//           <div className="w-full max-w-[90%] xs:max-w-sm sm:max-w-md md:max-w-lg ">
//             <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 md:p-10  text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
//               <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-4">
//                 {/* Logo */}
//                 <div className="w-full flex justify-center">
//                   <img
//                     className="h-14 sm:h-16 md:h-30  w-auto object-contain"
//                     src={JolrongLogoWhite}
//                     alt="Logo"
//                   />
//                 </div>

//                 {/* Tagline */}
//                 <h2 className="text-center text-sm xs:text-base sm:text-lg font-light leading-relaxed px-2 sm:px-4 md:px-6">
//                   Creating timeless spaces that define contemporary living.
//                 </h2>

//                 <Button size="lg" className="text-white bg-primary ">
//                   <Link to="/projects">View Our Work</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Buttons - Hidden on Mobile, Visible on Tablet+ */}
//         <button
//           onClick={goToPrev}
//           className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all flex items-center justify-center pointer-events-auto  sm:flex"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
//         </button>

//         <button
//           onClick={goToNext}
//           className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all flex items-center justify-center pointer-events-auto  sm:flex"
//           aria-label="Next slide"
//         >
//           <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
//         </button>

//         {/* Slide Indicators - Always Visible */}
//         <div className="absolute bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2 pointer-events-auto">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
//                 index === current
//                   ? "w-6 sm:w-7 md:w-8 bg-white"
//                   : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60 active:bg-white/70"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSliderv2;

