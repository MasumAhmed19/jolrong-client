// import GalleryCard from "./GalleryCard";
// import type { IGalleryImage } from "@/types";

// interface GalleryGridProps {
//   images: IGalleryImage[];
//   onPreview: (img: IGalleryImage) => void;
//   onDelete: (img: IGalleryImage) => void; 
//   isLoading: boolean;
//   error: unknown;
//   pageLimit: number;
//   selectedUrls?: string[];
//   selectionMode?: boolean;
//   onSelectImage?: (url: string) => void;
// }

// const GalleryGrid = ({
//   images,
//   onPreview,
//   onDelete,
//   isLoading,
//   error,
//   pageLimit,
//   selectedUrls = [],
//   selectionMode = false,
//   onSelectImage
// }: GalleryGridProps) => {
//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-6 gap-4">
//         {Array.from({ length: pageLimit }).map((_, i) => (
//           <div key={i} className="h-44 bg-gray-100 animate-pulse rounded-lg" />
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 rounded-lg bg-red-50 text-red-700">
//         Failed to load images.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//       {images.map((img) => (
//         <GalleryCard
//           key={img._id}
//           img={img}
//           onPreview={onPreview}
//           onDelete={onDelete}
//           selectionMode={selectionMode}
//           isSelected={selectedUrls.includes(img.url)}
//           onSelect={() => onSelectImage?.(img.url)} // 👈 trigger selection
//         />
//       ))}
//     </div>
//   );
// };

// export default GalleryGrid;


import GalleryCard from "./GalleryCard";
import type { IGalleryImage } from "@/types";

interface GalleryGridProps {
  images: IGalleryImage[];
  onPreview: (img: IGalleryImage) => void;
  onDelete: (img: IGalleryImage) => void; 
  isLoading: boolean;
  error: unknown;
  pageLimit: number;
  selectedUrls?: string[];
  selectionMode?: boolean;
  onSelectImage?: (url: string) => void;
}

const GalleryGrid = ({
  images,
  onPreview,
  onDelete,
  isLoading,
  error,
  pageLimit,
  selectedUrls = [],
  selectionMode = false,
  onSelectImage
}: GalleryGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {Array.from({ length: pageLimit }).map((_, i) => (
          <div 
            key={i} 
            className="h-32 sm:h-40 md:h-44 lg:h-48 bg-gray-100 animate-pulse rounded-lg" 
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 sm:p-4 rounded-lg bg-red-50 text-red-700 text-sm sm:text-base">
        Failed to load images. Please try again.
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
        <div className="text-gray-400 mb-3 sm:mb-4">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-sm sm:text-base font-medium">
          No images found
        </p>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Upload some images to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
      {images.map((img) => (
        <GalleryCard
          key={img._id}
          img={img}
          onPreview={onPreview}
          onDelete={onDelete}
          selectionMode={selectionMode}
          isSelected={selectedUrls.includes(img.url)}
          onSelect={() => onSelectImage?.(img.url)}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;