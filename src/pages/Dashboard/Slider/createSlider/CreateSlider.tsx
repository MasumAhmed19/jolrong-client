import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateSliderMutation, useGetAllSlidersQuery } from "@/redux/api/slider/slider.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router";
import ImageSelectorModal from "@/pages/Dashboard/Projects/createProject/ImageSelectorModal";
import type { IApiError } from "@/types";

const CreateSlider = () => {
    const navigate = useNavigate();
    const [createSlider, { isLoading }] = useCreateSliderMutation();
    const { data: existingSliders } = useGetAllSlidersQuery();

    const [imageUrl, setImageUrl] = useState("");
    const [order, setOrder] = useState<number>(
        existingSliders?.data ? existingSliders.data.length + 1 : 1
    );
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageUrl) {
            toast.error("Please provide an image URL");
            return;
        }

        try {
            await createSlider({
                imageUrl,
                order,
                isActive,
            }).unwrap();

            toast.success("Slider created successfully");
            navigate("/dashboard/slider");
        } catch (err) {
            const error = err as IApiError;
            toast.error(error?.data?.message || "Failed to create slider");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/slider">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Slider</h1>
                    <p className="text-muted-foreground">
                        Add a new image to your homepage slider.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Slider Details</CardTitle>
                    <CardDescription>
                        Fill in the information below to create a new slider.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image URL */}
                        <div className="space-y-3">
                            <Label>Slider Image *</Label>

                            <ImageSelectorModal
                                triggerLabel={imageUrl ? "Change Image" : "Select Image"}
                                multiple={false}
                                onSelect={(url) => setImageUrl(url as string)}
                            />

                            {imageUrl ? (
                                <div className="relative mt-2 w-full max-w-[200px] group">
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="w-full h-auto object-cover rounded-md border"
                                        onError={() => toast.error("Invalid image URL")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImageUrl("")}
                                        className="absolute top-2 right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Remove image"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-sm text-muted-foreground italic">
                                    No image selected
                                </div>
                            )}
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                            <Label htmlFor="order">Order *</Label>
                            <Input
                                id="order"
                                type="number"
                                min="1"
                                placeholder="1"
                                value={order}
                                onChange={(e) => setOrder(parseInt(e.target.value))}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                The position of this slider in the sequence.
                            </p>
                        </div>

                        {/* Is Active */}
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="isActive">Active Status</Label>
                                <p className="text-sm text-muted-foreground">
                                    Make this slider visible on the homepage.
                                </p>
                            </div>
                            <Switch
                                id="isActive"
                                checked={isActive}
                                onCheckedChange={setIsActive}
                            />
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Creating..." : "Create Slider"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/dashboard/slider")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateSlider;