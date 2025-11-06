import { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Images } from "lucide-react";
import { useListImagesQuery } from "@/redux/api/gallery/gallery.api";
import GalleryGrid from "@/components/Modules/Gallery/GalleryGrid";
import { cn } from "@/lib/utils";
import PaginationModule from "@/components/Modules/Gallery/PaginationModule";
import UploadImagesDashboard from "../../Gallery/UploadImages/UploadImagesDashboard";

interface ImageSelectorModalProps {
  triggerLabel?: string;
  multiple?: boolean;
  onSelect: (urls: string[] | string) => void;
  initialSelected?: string[]; // ✅ NEW: Accept already selected images
}

const PAGE_LIMIT = 15;

const ImageSelectorModal = ({
  triggerLabel = "Select Image",
  multiple = false,
  onSelect,
  initialSelected = [], // ✅ NEW
}: ImageSelectorModalProps) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("gallery");
  
  const { data, isLoading, error } = useListImagesQuery({
    page,
    limit: PAGE_LIMIT,
  });

  const images = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 7;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPages]);
  
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  // ✅ NEW: Pre-populate with existing selections when modal opens
  useEffect(() => {
    if (open && multiple) {
      setSelectedUrls(initialSelected);
    }
  }, [open, initialSelected, multiple]);

  const toggleSelect = (url: string) => {
    if (multiple) {
      setSelectedUrls((prev) =>
        prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
      );
    } else {
      setSelectedUrls([url]);
    }
  };

  const handleConfirm = () => {
    if (multiple) onSelect(selectedUrls);
    else onSelect(selectedUrls[0] || "");
    setOpen(false);
    setSelectedUrls([]);
  };

  const handleCancel = () => {
    setSelectedUrls([]);
    setOpen(false);
    setActiveTab("gallery");
  };

  return (
    <>
      {/* Trigger Button */}
      <div
        onClick={() => setOpen(true)}
        className={cn(
          "flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:border-primary/70 hover:bg-muted/40 p-6",
          "w-full sm:w-auto min-h-[160px] md:min-h-[200px]"
        )}
      >
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Images className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="text-base sm:text-lg font-medium text-center">
            {triggerLabel}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          Click to browse and select image{multiple ? "s" : ""}
        </p>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl md:max-w-5xl p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl font-semibold">
              {triggerLabel}
            </DialogTitle>
          </DialogHeader>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-4 space-y-4">
              {/* ✅ NEW: Show selection count if multiple mode */}
              {multiple && selectedUrls.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    {selectedUrls.length} image{selectedUrls.length > 1 ? "s" : ""} selected
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedUrls([])}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 h-8"
                  >
                    Clear Selection
                  </Button>
                </div>
              )}

              <GalleryGrid
                images={images}
                onPreview={() => {}}
                onDelete={() => {}}
                isLoading={isLoading}
                error={error}
                pageLimit={PAGE_LIMIT}
                selectionMode={true}
                selectedUrls={selectedUrls}
                onSelectImage={toggleSelect}
              />

              <PaginationModule
                page={page}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                setPage={setPage}
              />
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="mt-4">
              <UploadImagesDashboard />
            </TabsContent>
          </Tabs>

          {/* Footer Buttons - Only show in Gallery tab */}
          {activeTab === "gallery" && (
            <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="w-full sm:w-auto"
                disabled={selectedUrls.length === 0}
                onClick={handleConfirm}
              >
                {multiple
                  ? `Insert ${selectedUrls.length} Image${
                      selectedUrls.length > 1 ? "s" : ""
                    }`
                  : "Insert Image"}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageSelectorModal;