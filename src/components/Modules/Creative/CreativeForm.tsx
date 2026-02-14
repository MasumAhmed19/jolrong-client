import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageSelectorModal from "@/pages/Dashboard/Projects/createProject/ImageSelectorModal";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

// Schema for validation
const creativeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
    image: z.string().min(1, "Image is required"),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isPublic: z.boolean().optional(),
});

interface CreativeFormProps {
    mode: "create" | "edit";
    defaultValues?: z.infer<typeof creativeSchema>;
    onSubmit: (values: z.infer<typeof creativeSchema>) => Promise<void>;
    isSubmitting?: boolean;
}

const CreativeForm = ({
    mode,
    defaultValues,
    onSubmit,
    isSubmitting,
}: CreativeFormProps) => {
    const form = useForm<z.infer<typeof creativeSchema>>({
        resolver: zodResolver(creativeSchema),
        defaultValues: defaultValues || {
            title: "",
            content: "",
            image: "",
            tags: [],
            isFeatured: false,
            isPublic: true,
        },
    });

    // Local state for tags input to handle comma typing
    const [tagInput, setTagInput] = useState("");

    // Sync local state with default values on mount or when defaultValues change
    useEffect(() => {
        if (defaultValues?.tags) {
            setTagInput(defaultValues.tags.join(", "));
        }
    }, [defaultValues]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 bg-white p-6 rounded-lg"
            >
                <h2 className="text-2xl font-bold mb-4">
                    {mode === "edit" ? "Edit Creative Post" : "Create New Creative Post"}
                </h2>

                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title *</FormLabel>
                            <FormControl>
                                <Input placeholder="Creative Post Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Image Selection */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Featured Image *</FormLabel>
                            <FormControl>
                                <ImageSelectorModal
                                    triggerLabel={field.value ? "Change Image" : "Select Image"}
                                    multiple={false}
                                    onSelect={(url) => field.onChange(url)}
                                />
                            </FormControl>
                            {field.value && (
                                <div className="relative mt-2 w-24 h-24 group">
                                    <img
                                        src={field.value}
                                        alt="featured"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => field.onChange("")}
                                        className="absolute top-1 right-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Remove image"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Content */}
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="h-32"
                                    placeholder="Detailed description of the creative work..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Tags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags (comma separated)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. sketching, painting, digital art"
                                    value={tagInput}
                                    onChange={(e) => {
                                        setTagInput(e.target.value);
                                        const tagsArray = e.target.value
                                            .split(",")
                                            .map((tag) => tag.trim())
                                            .filter(Boolean);
                                        field.onChange(tagsArray);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Options */}
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="isPublic"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="accent-primary w-4 h-4"
                                    />
                                </FormControl>
                                <FormLabel className="mb-0 cursor-pointer">Public</FormLabel>
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer"
                >
                    {isSubmitting
                        ? mode === "edit"
                            ? "Updating..."
                            : "Creating..."
                        : mode === "edit"
                            ? "Update Post"
                            : "Create Post"}
                </Button>
            </form>
        </Form>
    );
};

export default CreativeForm;
