// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Eye, Trash, Check } from "lucide-react";
// import type { IGalleryImage } from "@/types";

// interface GalleryCardProps {
//   img: IGalleryImage;
//   onPreview: (img: IGalleryImage) => void;
//   onDelete: (img: IGalleryImage) => void; 
//   isSelected?: boolean; 
//   selectionMode?: boolean; 
//   onSelect?: () => void;
// }

// const GalleryCard = ({
//   img,
//   onPreview,
//   onDelete,
//   isSelected = false,
//   selectionMode = false,
//   onSelect
// }: GalleryCardProps) => (
//   <Card
//     className={`relative overflow-hidden rounded-xl p-0 shadow-sm transition-all cursor-pointer ${
//       selectionMode
//         ? isSelected
//           ? "ring-4 ring-blue-500 ring-offset-2"
//           : "hover:ring-2 hover:ring-gray-300"
//         : ""
//     }`}
//     onClick={() => (selectionMode ? onSelect?.() : onPreview(img))} 
//   >
//     <img
//       src={img.url}
//       alt={img.public_id || "gallery-image"}
//       loading="lazy"
//       className="w-full h-56 object-cover rounded-t-xl"
//     />

//     {/* Selection Mode: Show checkmark when selected */}
//     {selectionMode && isSelected && (
//       <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-full p-2 shadow-lg">
//         <Check className="w-5 h-5" strokeWidth={3} />
//       </div>
//     )}

//     {/* Normal Mode: Show action buttons */}
//     {!selectionMode && (
//       <div className="absolute top-3 right-3 flex gap-2">
//         <Button
//           size="sm"
//           variant="ghost"
//           onClick={(e) => {
//             e.stopPropagation();
//             onPreview(img);
//           }}
//           className="bg-white shadow-2xl cursor-pointer hover:bg-gray-100"
//         >
//           <Eye className="w-4 h-4" />
//         </Button>
//         {onDelete && (
//           <Button
//             size="sm"
//             variant="ghost"
//             className="text-red-700 bg-white shadow-2xl cursor-pointer hover:bg-red-50"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(img);
//             }}
//           >
//             <Trash className="w-4 h-4" />
//           </Button>
//         )}
//       </div>
//     )}

//     {/* Selection Mode: Show subtle overlay on selected images */}
//     {selectionMode && isSelected && (
//       <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
//     )}
//   </Card>
// );

// export default GalleryCard;



import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash, Check } from "lucide-react";
import type { IGalleryImage } from "@/types";

interface GalleryCardProps {
  img: IGalleryImage;
  onPreview: (img: IGalleryImage) => void;
  onDelete: (img: IGalleryImage) => void; 
  isSelected?: boolean; 
  selectionMode?: boolean; 
  onSelect?: () => void;
}

const GalleryCard = ({
  img,
  onPreview,
  onDelete,
  isSelected = false,
  selectionMode = false,
  onSelect
}: GalleryCardProps) => (
  <Card
    className={`relative overflow-hidden rounded-lg sm:rounded-xl p-0 shadow-sm transition-all cursor-pointer group ${
      selectionMode
        ? isSelected
          ? "ring-1 sm:ring-4 ring-primary ring-offset-1 sm:ring-offset-2"
          : "hover:ring-1 hover:ring-gray-300 active:ring-2 active:ring-gray-400"
        : "hover:shadow-md active:shadow-lg"
    }`}
    onClick={() => (selectionMode ? onSelect?.() : onPreview(img))} 
  >
    {/* Image Container */}
    <div className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        src={img.url}
        alt={img.public_id || "gallery-image"}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
      />
      
      {/* Gradient overlay for better button visibility */}
      {!selectionMode && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>

    {/* Selection Mode: Show checkmark when selected */}
    {selectionMode && isSelected && (
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white rounded-full p-1.5 sm:p-2 shadow-lg animate-in zoom-in-50 duration-200">
        <Check className="w-3 h-3 sm:w-4 sm:h-4 " strokeWidth={3} />
      </div>
    )}

    {/* Selection Mode: Show selection indicator on unselected items */}
    {/* {selectionMode && !isSelected && (
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 border-2 border-white rounded-full p-1.5 sm:p-2 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-3 h-3 sm:w-4 sm:h-4 " />
      </div>
    )} */}

    {/* Normal Mode: Show action buttons */}
    {!selectionMode && (
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onPreview(img);
          }}
          className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white h-7 w-7 sm:h-8 sm:w-8 p-0"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
        {onDelete && (
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-red-50 h-7 w-7 sm:h-8 sm:w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(img);
            }}
          >
            <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        )}
      </div>
    )}

    {/* Selection Mode: Show subtle overlay on selected images */}
    {selectionMode && isSelected && (
      <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
    )}

    {/* Image filename/info overlay (optional - shows on hover in normal mode) */}
    {!selectionMode && img.public_id && (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-xs sm:text-sm font-medium truncate">
          {img.public_id.split('/').pop()}
        </p>
      </div>
    )}
  </Card>
);

export default GalleryCard;