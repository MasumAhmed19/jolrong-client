import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface SliderGalleryProps {
  gallery: string[];
  name?: string;
  showNumbers?: boolean;
  showDots?: boolean;
}

export function SliderGallery({ 
  gallery, 
  name = "Photo Gallery",
  showNumbers = true,
  showDots = true 
}: SliderGalleryProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full mx-auto py-12">
        <h2 className="text-2xl font-semibold uppercase text-gray-900 mb-2">{name}</h2>

      
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {gallery.map((img, index) => (
            <CarouselItem 
              key={index} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div 
                      className="aspect-[2/3] overflow-hidden cursor-pointer group"
                    >
                      <img
                        src={img}
                        alt={`${name} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* <CarouselPrevious className="-left-10" />
        <CarouselNext className="-right-10" /> */}
      </Carousel>

      {/* Indicators Container */}
      <div className="mt-2 space-y-4">
        {showNumbers && (
          <div className="text-center text-sm text-muted-foreground">
            {current + 1} / {count}
          </div>
        )}

        {/* Dot Indicators */}
        {showDots && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 cursor-pointer",
                  current === index 
                    ? "bg-primary scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}