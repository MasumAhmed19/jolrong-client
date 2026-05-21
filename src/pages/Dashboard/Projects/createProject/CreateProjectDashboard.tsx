import ProjectForm from "@/components/Modules/Projects/ProjectForm";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { useCreateProjectMutation } from "@/redux/api/projects/projects.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { IApiError, ICreateProjectPayload } from "@/types";

const CreateProjectPage = () => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
    const { data: userData } = useUserInfoQuery({});
    const navigate= useNavigate()

  const handleCreate = async (values: Record<string, any>) => {
    try {
      const payload: ICreateProjectPayload = {
        authorId: values.authorId,
        name: values.name,
        client: values.client,
        location: values.location,
        size: values.size,
        type: values.type as ICreateProjectPayload['type'],
        status: values.status as ICreateProjectPayload['status'],
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
      await createProject(payload).unwrap();
      toast.success("Project created successfully!");
      navigate('/dashboard')
    } catch (err) {
      const error = err as IApiError;
      toast.error(error?.data?.message || "Failed to create project");
    }
  };

  return (
    <ProjectForm
      mode="create"
      onSubmit={handleCreate}
      isSubmitting={isLoading}
      defaultValues={{
        authorId: userData?.data?._id,
        name: "",
        client: "",
        location: "",
        size: "",
        type: "",
        typeofWork: [],
        status: "",
        description: "",
        image: "",
        gallery: [],
        featuredVideo:"",
        year: "",
        budget: "",
        tags: [],
        isFeatured: false,
        isPublic: true,
      }}
    />
  );
};

export default CreateProjectPage;

