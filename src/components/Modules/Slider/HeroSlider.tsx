import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Copy from "@/components/copy/Copy";
import { CircularTextRound } from "@/components/Animated/CircularTextRound/CircularTextRound";
import { heroSlides } from "@/data/StaticData";

gsap.registerPlugin(ScrollTrigger);

const HeroSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Handle Carousel API setup and autoplay
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));

    const startAutoplay = () => {
      stopAutoplay(); // avoid duplicates
      autoplayRef.current = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }, 6000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    // Visibility handler to pause/resume autoplay
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    // Start autoplay on mount
    startAutoplay();
    // Add listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [api]);

  // Ensure ScrollTrigger refreshes properly
  useEffect(() => {
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh(true));

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="relative w-full py-8 md:py-12 mt-[3vh] md:mt-[5vh]">
      <div className="max-w-[1600px] mx-auto">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "center",
          }}
          className="w-full"
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <section className="relative h-[calc(100vh-250px)] md:h-[calc(100vh-170px)] flex flex-col justify-center rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={slide.bgImage}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  </div>

                  <div className="relative z-10 text-center text-white px-4 sm:px-6 mb-4 sm:mb-8 md:mb-16">
                    <Copy delay={0.5}>
                      <h1 className="text-[2.5rem] md:text-6xl lg:text-8xl uppercase font-bold tracking-wide leading-[0.85] font-sans animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {slide.title}
                      </h1>
                    </Copy>
                  </div>

                  <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col lg:flex-row md:items-end justify-between gap-4 sm:gap-6 lg:gap-12">
                      <div className="relative flex-1 max-w-2xl">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
                          <div className="relative mt-10 md:mt-0 bg-black/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white flex-1 sm:flex-[2] z-20 animate-in fade-in slide-in-from-left duration-700 delay-150">
                            <Copy delay={0.6}>
                              <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 text-white/80">
                                {slide.description}
                              </p>
                            </Copy>
                            <button className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-white/80 transition-colors group">
                              {slide.buttonText}
                              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                          </div>

                          <div className="relative hidden md:block bg-black/30 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-1 sm:p-2 lg:p-8 text-white flex-1 sm:flex-[2] z-20 h-32 sm:h-40 lg:h-auto animate-in fade-in slide-in-from-right duration-700 delay-300">
                            <img
                              src={slide.cardImage}
                              alt={slide.title}
                              className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:flex justify-center lg:justify-end mt-4 lg:mt-0 animate-in fade-in zoom-in-95 duration-700 delay-500">
                        <div className="scale-75 sm:scale-90 lg:scale-100">
                          <CircularTextRound />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 hidden md:flex cursor-pointer md:left-8 h-10 w-10 md:h-12 md:w-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/30 text-white transition-all">
            <ChevronLeft className="h-6 w-6" />
          </CarouselPrevious>
          <CarouselNext className="right-4 hidden md:flex cursor-pointer md:right-8 h-10 w-10 md:h-12 md:w-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/30 text-white transition-all">
            <ChevronRight className="h-6 w-6" />
          </CarouselNext>
        </Carousel>

        <div className="flex justify-center gap-2 mt-6">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full cursor-pointer transition-all ${
                index === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-black/20 hover:bg-primary"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
