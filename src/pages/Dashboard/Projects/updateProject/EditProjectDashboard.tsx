import {
  useProjectBySlugQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projects/projects.api";
import { toast } from "sonner";
import ProjectForm from "@/components/Modules/Projects/ProjectForm";
import { useParams } from "react-router";
import type { IUpdateProjectPayload, IApiError } from "@/types";

const EditProjectDashboard = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: projectData, isLoading } = useProjectBySlugQuery(slug!);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const handleUpdate = async (values: Record<string, any>) => {
    try {
      const payload: IUpdateProjectPayload = {
        name: values.name,
        client: values.client,
        location: values.location,
        size: values.size,
        type: values.type as IUpdateProjectPayload['type'],
        status: values.status as IUpdateProjectPayload['status'],
        typeofWork: values.typeofWork,
        year: values.year,
        description: values.description,
        image: values.image,
        gallery: values.gallery,
        featuredVideo: values.featuredVideo,
        color: values.color,
        budget: values.budget,
        tags: values.tags,
        isFeatured: values.isFeatured,
        isPublic: values.isPublic,
      };
      await updateProject({ id: projectData?.data._id!, data: payload }).unwrap();
      toast.success("Project updated successfully!");
    } catch (err) {
      const error = err as IApiError;
      toast.error(error?.data?.message || "Failed to update project");
    }
  };

  if (isLoading) return <p>Loading project...</p>;

  return (
    <ProjectForm
      mode="edit"
      defaultValues={projectData?.data}
      onSubmit={handleUpdate}
      isSubmitting={isUpdating}
    />
  );
};

export default EditProjectDashboard;
