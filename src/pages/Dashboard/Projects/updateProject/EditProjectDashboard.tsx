import {
  useProjectBySlugQuery,
  useUpdateProjectMutation,
} from "@/redux/api/projects/projects.api";
import { toast } from "sonner";
import ProjectForm from "@/components/Modules/Projects/ProjectForm";
import { useParams } from "react-router";

const EditProjectDashboard = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: projectData, isLoading } = useProjectBySlugQuery(slug!);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  // console.log(projectData?.data._id);

  const handleUpdate = async (values: any) => {
    try {
      await updateProject({ id: projectData?.data._id!, data: values }).unwrap();
      toast.success("Project updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update project");
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
