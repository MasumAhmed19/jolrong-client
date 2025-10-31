import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import type { IGalleryImage } from "@/types";

interface GalleryCardProps {
  img: IGalleryImage;
  onPreview: (img: IGalleryImage) => void;
  onDelete: (img: IGalleryImage) => void;
}

const GalleryCard = ({ img, onPreview, onDelete }: GalleryCardProps) => (
  <Card className="relative overflow-hidden rounded-xl shadow-sm">
    <img
      src={img.url}
      alt={img.public_id || "gallery-image"}
      loading="lazy"
      className="w-full h-56 object-cover rounded-t-xl cursor-pointer"
      onClick={() => onPreview(img)}
    />

    <div className="absolute top-3 right-3 flex gap-2">
      <Button size="sm" variant="ghost" onClick={() => onPreview(img)}>
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="text-red-700"
        onClick={() => onDelete(img)}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  </Card>
);

export default GalleryCard;
