import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { imageVariants } from "@/types";

interface MediaModalProps {
  imgSrc?: string;
  videoSrc?: string;
  className?: string;
}

export function MediaModal({
  imgSrc,
  videoSrc,
  className = "",
}: MediaModalProps) {
  const [isOpen, setIsOpen] = useState(false);

const openModal = () => {
  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  setIsOpen(true);
};
const closeModal = () => {
  const scrollY = document.body.style.top;

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  setIsOpen(false);
};


  return (
    <>
      {/* Thumbnail */}
      <motion.div
        onClick={openModal}
        className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]  active:scale-[0.98] ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        
      >
        {imgSrc && (
          <motion.img
            variants={imageVariants}
            src={imgSrc}
            alt="Preview"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {videoSrc && (
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
      </motion.div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute cursor-pointer top-4 right-4 p-2 md:p-3 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors z-[150]"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Content Container */}
          <div
            className="relative max-w-7xl max-h-full animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Full view"
                className="max-h-[90vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
            )}

            {videoSrc && (
              <video
                autoPlay
                muted
                loop
                controls
                className="max-h-[90vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Helper Text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Click anywhere to close
          </div>
        </div>
      )}
    </>
  );
}
