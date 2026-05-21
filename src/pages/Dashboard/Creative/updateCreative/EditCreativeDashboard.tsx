import { useNavigate, useParams } from "react-router";
import CreativeForm from "@/components/Modules/Creative/CreativeForm";
import { useCreativePostByIdentifierQuery, useUpdateCreativePostMutation } from "@/redux/api/creative/creative.api";
import { toast } from "sonner";
import type { IUpdateCreativePayload, IApiError } from "@/types";

const EditCreativeDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: postData, isLoading: isFetching } = useCreativePostByIdentifierQuery(id as string, {
        skip: !id,
    });

    const [updatePost, { isLoading: isUpdating }] = useUpdateCreativePostMutation();

    const handleSubmit = async (values: IUpdateCreativePayload) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title || "");
            formData.append("content", values.content || "");
            formData.append("image", values.image || "");

            if (values.isFeatured !== undefined) formData.append("isFeatured", String(values.isFeatured));
            if (values.isPublic !== undefined) formData.append("isPublic", String(values.isPublic));

            if (values.tags && Array.isArray(values.tags)) {
                values.tags.forEach((tag: string) => formData.append("tags", tag));
            }

            await updatePost({ id: id as string, data: formData }).unwrap();
            toast.success("Post updated successfully");
            navigate("/dashboard/creative");
        } catch (err) {
            const error = err as IApiError;
            toast.error(error?.data?.message || "Failed to update post");
        }
    };

    if (isFetching) return <div>Loading...</div>;

    const defaultValues = postData?.data ? {
        title: postData.data.title,
        content: postData.data.content,
        image: postData.data.image,
        tags: postData.data.tags,
        isFeatured: postData.data.isFeatured,
        isPublic: postData.data.isPublic,
    } : undefined;

    return (
        <div className="max-w-4xl mx-auto">
            <CreativeForm
                mode="edit"
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
                isSubmitting={isUpdating}
            />
        </div>
    );
};

export default EditCreativeDashboard;
