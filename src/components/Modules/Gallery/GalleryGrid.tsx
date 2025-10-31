import GalleryCard from "./GalleryCard";
import type { IGalleryImage } from "@/types";

interface GalleryGridProps {
  images: IGalleryImage[];
  onPreview: (img: IGalleryImage) => void;
  onDelete: (img: IGalleryImage) => void;
  isLoading: boolean;
  error: unknown;
  pageLimit: number;
}

const GalleryGrid = ({
  images,
  onPreview,
  onDelete,
  isLoading,
  error,
  pageLimit,
}: GalleryGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: pageLimit }).map((_, i) => (
          <div key={i} className="h-44 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-700">
        Failed to load images.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((img) => (
        <GalleryCard
          key={img._id}
          img={img}
          onPreview={onPreview}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
