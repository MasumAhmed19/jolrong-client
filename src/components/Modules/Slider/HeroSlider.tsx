import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

// Slide data structure
const heroSlides = [
  {
    id: 1,
    title: 'Design',
    description:
      'We blend creativity and function to craft modern spaces that inspire and elevate everyday living.',
    buttonText: 'View More',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600',
    cardImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
  },
  {
    id: 2,
    title: 'Visualization',
    description:
      'See your ideas come alive with immersive 3D visuals that reveal every detail before creation.',
    buttonText: 'Explore Design',
    bgImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600',
    cardImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
  },
  {
    id: 3,
    title: 'Animation',
    description:
      'Bring concepts to motion with stunning animations that tell your story vividly and dynamically.',
    buttonText: 'Discover More',
    bgImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600',
    cardImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
  },
  {
    id: 4,
    title: 'Consultancy',
    description:
      'From concept to completion, our expert guidance helps you achieve design perfection with ease.',
    buttonText: 'See Projects',
    bgImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
    cardImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  },
];


// Circular Text Component (Simplified for demo)
const CircularText = ({ text = 'Jolrong*Architects*Design*Interior' }) => {
  // Repeat text to fill the circle completely
  const repeatedText = (text + ' ').repeat(3);
  
  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
      <div className="absolute inset-0 rounded-full border-2 border-white/30 flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
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
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
      </div>
    </div>
  );
};


const HeroSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Auto-play functionality using useEffect
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-advance every 6 seconds
    const autoplay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(autoplay);
  }, [api]);

  return (
    <div className="relative w-full py-8 md:py-12 mt-[3vh] md:mt-[5vh]">
      <div className="max-w-[1600px] mx-auto">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: 'center',
          }}
          className="w-full"
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <section className="relative h-[calc(100vh-130px)] md:h-[calc(100vh-170px)] flex flex-col justify-center rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={slide.bgImage}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  </div>
                  <div className="pt-25 md:pt-10"></div>

                  <div className="relative z-10 text-center text-white px-4 sm:px-6 mb-4 sm:mb-8 md:mb-16">
                    <h1 className="text-[2.5rem] md:text-6xl lg:text-8xl uppercase font-bold tracking-wide leading-[0.85] font-sans animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {slide.title}
                    </h1>
                  </div>

                  <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-4 sm:gap-6 lg:gap-12">
                      
                      <div className="relative flex-1 max-w-2xl">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
                          
                          <div className="relative mt-10 md:mt-0 bg-black/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white flex-1 sm:flex-[2] z-20 animate-in fade-in slide-in-from-left duration-700 delay-150">
                            <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 text-white/80">
                              {slide.description}
                            </p>
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
                          <CircularText />
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

        <div className="flex justify-center gap-2 mt-6 ">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full cursor-pointer transition-all ${
                index === current
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-black/20 hover:bg-primary'
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