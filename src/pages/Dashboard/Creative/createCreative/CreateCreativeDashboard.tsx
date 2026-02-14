import { useNavigate } from "react-router";
import CreativeForm from "@/components/Modules/Creative/CreativeForm";
import { useCreateCreativePostMutation } from "@/redux/api/creative/creative.api";
import { toast } from "sonner";

const CreateCreativeDashboard = () => {
    const navigate = useNavigate();
    const [createPost, { isLoading }] = useCreateCreativePostMutation();

    const handleSubmit = async (values: any) => {
        try {



            // Manually construct FormData to avoid duplication issues and ensure correct types
            const formData = new FormData();
            formData.append("title", values.title);
            // Handle optional content
            formData.append("content", values.content || "");

            // Image is a URL string from the selector
            formData.append("image", values.image);

            // Handle boolean values explicitly
            if (values.isFeatured !== undefined) {
                formData.append("isFeatured", String(values.isFeatured));
            }
            // default isPublic is true, but handle explicitly
            formData.append("isPublic", String(values.isPublic !== undefined ? values.isPublic : true));

            // Handle tags array
            if (values.tags && Array.isArray(values.tags)) {
                values.tags.forEach((tag: string) => {
                    formData.append("tags", tag);
                });
            }

            await createPost(formData).unwrap();

            toast.success("Post created successfully");
            navigate("/dashboard/creative");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to create post");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <CreativeForm
                mode="create"
                onSubmit={handleSubmit}
                isSubmitting={isLoading}
            />
        </div>
    );
};

export default CreateCreativeDashboard;
