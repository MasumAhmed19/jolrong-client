import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, ImagePlus, Info, X } from "lucide-react";
import { toast } from "sonner";
import { useUploadImagesMutation } from "@/redux/api/gallery/gallery.api";
import type { IGalleryImage, IApiError } from "@/types";

interface UploadImagesDashboardProps {
  onUpload?: (urls: string[]) => void;
}

const MAX_FILES = 5;
// Leave room for multipart headers below Vercel's 4.5 MB request limit.
const MAX_FILE_SIZE = 4_000_000;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const getUploadErrorMessage = (error: unknown) => {
  const apiError = error as IApiError;
  if (apiError?.status === 413) {
    return "Image exceeds the server request limit. Choose one under 4 MB.";
  }
  if (apiError?.data?.message) return apiError.data.message;
  if (error instanceof Error) return error.message;
  return "Upload failed. Please try again.";
};

const UploadImagesDashboard = ({ onUpload }: UploadImagesDashboardProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const previewUrlsRef = useRef<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadImages] = useUploadImagesMutation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;

    if (files.length > MAX_FILES) {
      toast.warning(`You can upload a maximum of ${MAX_FILES} images at a time.`);
      event.target.value = "";
      return;
    }

    if (files.some((file) => file.size > MAX_FILE_SIZE)) {
      toast.error("Some files exceed the 4 MB limit. Please choose smaller files.");
      event.target.value = "";
      return;
    }

    if (files.some((file) => !ALLOWED_TYPES.includes(file.type))) {
      toast.error("Only JPEG, PNG, GIF, and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    const urls = files.map((file) => URL.createObjectURL(file));
    previewUrlsRef.current = urls;
    setSelectedFiles(files);
    setPreviewUrls(urls);
    // Allows selecting the same file again after removing it or a failed upload.
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    if (isUploading) return;
    URL.revokeObjectURL(previewUrls[index]);
    previewUrlsRef.current = previewUrlsRef.current.filter((_, i) => i !== index);
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
    setPreviewUrls((urls) => urls.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (isUploading) return;
    if (selectedFiles.length === 0) {
      toast.warning("Please select images to upload.");
      return;
    }

    const files = selectedFiles;
    const urls = previewUrls;
    const uploadedImages: IGalleryImage[] = [];
    const failedFiles: File[] = [];
    const failedUrls: string[] = [];
    setIsUploading(true);
    setUploadProgress({ current: 0, total: files.length });

    try {
      for (const [index, file] of files.entries()) {
        setUploadProgress({ current: index + 1, total: files.length });
        const formData = new FormData();
        formData.append("images", file);

        try {
          const response = await uploadImages(formData).unwrap();
          if (!response.success || !response.data?.[0]?.url) {
            throw new Error("The server did not return an uploaded image.");
          }
          uploadedImages.push(...response.data);
          toast.success(`${file.name} uploaded`);
        } catch (error) {
          failedFiles.push(file);
          failedUrls.push(urls[index]);
          toast.error(`${file.name}: ${getUploadErrorMessage(error)}`);
        }
      }

      const failedUrlSet = new Set(failedUrls);
      urls.forEach((url) => {
        if (!failedUrlSet.has(url)) URL.revokeObjectURL(url);
      });
      previewUrlsRef.current = failedUrls;
      setSelectedFiles(failedFiles);
      setPreviewUrls(failedUrls);
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (uploadedImages.length > 0) {
        onUpload?.(uploadedImages.map((image) => image.url));
      }
      if (failedFiles.length > 0 && uploadedImages.length > 0) {
        toast.warning(`${uploadedImages.length} uploaded; ${failedFiles.length} failed. You can retry the failed images.`);
      }
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setIsUploading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <ImagePlus className="w-5 h-5" /> Upload Images
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-md text-sm mb-4">
            <Info className="w-5 h-5 mt-0.5 text-muted-foreground" />
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed">
              <li>
                Accepted formats: <strong>JPEG, PNG, GIF, WEBP</strong>
              </li>
              <li>
                Maximum file size: <strong>4 MB per image</strong>
              </li>
              <li>
                Select up to <strong>5 images</strong>; each uploads separately.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              disabled={isUploading}
              className="cursor-pointer"
            />

            {previewUrls.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Selected {selectedFiles.length} image
                  {selectedFiles.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {previewUrls.map((url, idx) => (
                    <div
                      key={url}
                      className="relative w-full h-32 rounded-md overflow-hidden border group"
                    >
                      <img
                        src={url}
                        alt={`preview-${idx}`}
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-2xl group-hover:opacity-100 transition-opacity"
                        type="button"
                        disabled={isUploading}
                        aria-label={`Remove ${selectedFiles[idx]?.name}`}
                      >
                        <X className="w-5 h-5 cursor-pointer" />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                        {selectedFiles[idx]?.name} (
                        {Math.round(selectedFiles[idx]?.size / 1024)}KB)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
              className="mt-5 w-full cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading {uploadProgress.current} of {uploadProgress.total}...
                </>
              ) : (
                `Upload ${selectedFiles.length} Image${
                  selectedFiles.length !== 1 ? "s" : ""
                }`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadImagesDashboard;
