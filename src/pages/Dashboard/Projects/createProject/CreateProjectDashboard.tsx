import ProjectForm from "@/components/Modules/Projects/ProjectForm";
import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { useCreateProjectMutation } from "@/redux/api/projects/projects.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreateProjectPage = () => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
    const { data: userData } = useUserInfoQuery({});
    const navigate= useNavigate()

  const handleCreate = async (values: any) => {
    try {
      await createProject(values).unwrap();
      toast.success("Project created successfully!");
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create project");
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

