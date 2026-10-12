import { useState, useMemo } from "react";
import {
  useListImagesQuery,
  useDeleteImageMutation,
} from "@/redux/api/gallery/gallery.api";
import type { IGalleryImage } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router";
import { Loader2, UploadIcon } from "lucide-react";
import GalleryGrid from "@/components/Modules/Gallery/GalleryGrid";
import PaginationModule from "@/components/Modules/Gallery/PaginationModule";
import { toast } from "sonner";



const PAGE_LIMIT = 15;

const AllImagesDashboard = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching, error, refetch } = useListImagesQuery({
    page,
    limit: PAGE_LIMIT,
  });
  const [deleteImage] = useDeleteImageMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const [previewImage, setPreviewImage] = useState<IGalleryImage | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<IGalleryImage | null>(
    null
  );

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

  const handleDelete = async (id: string | undefined) => {
    if (!id || isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteImage(id).unwrap();
    } catch (err) {
      console.error("Failed to delete image", err);
      toast.error("Failed to delete image. Please try again.");
      setIsDeleting(false);
      return;
    }

    try {
      await refetch().unwrap();
    } catch (err) {
      console.error("Failed to refresh gallery after deleting image", err);
      toast.error("Image deleted, but the gallery could not refresh.");
    } finally {
      setConfirmDelete(null);
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-5 items-center">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <Link
            to="/dashboard/upload-images"
            className="flex items-center gap-2 text-sm border border-gray-100 px-2 py-1 rounded-sm"
          >
            <UploadIcon size={15} /> Upload Image
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          {isFetching ? "Updating..." : `Page ${page} of ${totalPages}`}
        </div>
      </div>

      <GalleryGrid
        images={images}
        onPreview={setPreviewImage}
        onDelete={setConfirmDelete}
        isLoading={isLoading}
        error={error}
        pageLimit={PAGE_LIMIT}
      />

      <PaginationModule
        page={page}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        setPage={setPage}
      />

      {/* Preview Popup */}
      <Dialog
        open={!!previewImage}
        onOpenChange={(open) => !open && setPreviewImage(null)}
      >
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex justify-center">
            {previewImage && (
              <img
                src={previewImage.url}
                alt={previewImage.public_id}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!confirmDelete}
        onOpenChange={(open) => !open && !isDeleting && setConfirmDelete(null)}
      >
        <AlertDialogContent
          onEscapeKeyDown={(event) => isDeleting && event.preventDefault()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this image?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleDelete(confirmDelete?._id);
              }}
              disabled={isDeleting}
              className="bg-destructive cursor-pointer text-white hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Deleting...
                </>
              ) : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllImagesDashboard;

