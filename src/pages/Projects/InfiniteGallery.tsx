import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface InfiniteGalleryProps {
  gallery: string[];
  name?: string;
  speed?: number; // seconds for one loop
  direction?: "left" | "right";
}

export default function InfiniteGallery({
  gallery,
  name = "Gallery",
  speed = 20,
  direction = "right",
}: InfiniteGalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const controls = useAnimation();

  // Duplicate the array for seamless loop
  const sliderImages: string[] = [...gallery, ...gallery];

  useEffect(() => {
    // Start animation on mount
    controls.start({
      x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      transition: {
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      },
    });
  }, [controls, direction, speed]);

  return (
    <div className="w-full overflow-hidden py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">{name}</h2>

      <motion.div className="flex gap-8" animate={controls}>
        {sliderImages.map((img, i) => (
          <div key={`${img}-${i}`} className="flex-shrink-0 w-[500px] min-h-[400px]">
            <img
              src={img}
              alt={`${name} ${i + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => setSelectedImg(img)}
            />
          </div>
        ))}
      </motion.div>

      {/* Full Image Preview */}
      <Dialog open={!!selectedImg} onOpenChange={() => setSelectedImg(null)}>
        <DialogContent className="md:min-w-[50vw] h-fit p-8 md:p-10 shadow-none border-none bg-white">
          {selectedImg && (
            <img
              src={selectedImg}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
