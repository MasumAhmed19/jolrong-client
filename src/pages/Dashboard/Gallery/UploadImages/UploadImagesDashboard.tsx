import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, ImagePlus, Info, X } from "lucide-react";
import { toast } from "sonner";
import { useUploadImagesMutation } from "@/redux/api/gallery/gallery.api";

//this is added
interface UploadImagesDashboardProps {
  onUpload?: (urls: string[]) => void;
}

const UploadImagesDashboard = (props: UploadImagesDashboardProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadImages, { isLoading }] = useUploadImagesMutation();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length === 0) return;

    // Limit to 5 images max
    if (files.length > 5) {
      toast.warning("You can upload a maximum of 5 images at a time.");
      return;
    }

    // Validate file size (5MB max per file)
    const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast.error("Some files exceed 5MB limit. Please choose smaller files.");
      return;
    }

    // Validate file types
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const invalidTypes = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidTypes.length > 0) {
      toast.error("Only JPEG, PNG, GIF, and WebP images are allowed.");
      return;
    }

    // Store files
    setSelectedFiles(files);

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // Remove individual image
  const removeImage = (index: number) => {
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }

    const newFiles = [...selectedFiles].filter((_, i) => i !== index);
    const newUrls = [...previewUrls].filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  // Handle upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.warning("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      const response = await uploadImages(formData).unwrap();
      toast.success(response.message || "Images uploaded successfully!");
    
      //this will added
      if (props.onUpload) {
        const uploadedUrls = response.data.map((img: any) => img.url);
        props.onUpload(uploadedUrls);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Upload failed");
    }
  };

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <ImagePlus className="w-5 h-5" /> Upload Images
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Upload Info */}
          <div className="flex items-start gap-2 bg-muted/30 p-3 rounded-md text-sm mb-4">
            <Info className="w-5 h-5 mt-0.5 text-muted-foreground" />
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed">
              <li>
                Accepted formats: <strong>JPEG, PNG, GIF, WEBP</strong>
              </li>
              <li>
                Maximum file size: <strong>5 MB per image</strong>
              </li>
              <li>
                Maximum upload limit: <strong>5 images at once</strong>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              disabled={isLoading}
              className="cursor-pointer"
            />

            {/* Preview Section */}
            {previewUrls.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Selected {selectedFiles.length} image
                  {selectedFiles.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {previewUrls.map((url, idx) => (
                    <div
                      key={idx}
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
                        disabled={isLoading}
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
              disabled={isLoading || selectedFiles.length === 0}
              className="mt-5 w-full cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
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



