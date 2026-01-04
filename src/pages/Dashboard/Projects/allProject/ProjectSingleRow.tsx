import { TableCell, TableRow } from "@/components/ui/table";
import type { IProject } from "@/types";
import {
  ArrowRight,
  Trash2,
  Edit,
  Star,
  Globe,
  Lock,
  Loader2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useDeleteProjectMutation, useUpdateProjectMutation } from "@/redux/api/projects/projects.api";
import { toast } from "sonner";
import { Link } from "react-router";

interface IProjectCardProps {
  project: IProject;
  index?: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProjectSingleRow: React.FC<IProjectCardProps> = ({
  project,
  index = 0,
}) => {
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation()

  // independent dialog states
  const [openFeatureDialog, setOpenFeatureDialog] = useState(false);
  const [openVisibilityDialog, setOpenVisibilityDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  // Toggle Featured Handler
  const handleToggleFeatured = async (id: string) => {
    try {
      await updateProject({
        id,
        data: { isFeatured: !project.isFeatured },
      }).unwrap();
      toast.success(
        project.isFeatured
          ? "Project unfeatured successfully!"
          : "Project marked as featured!"
      );
      setOpenFeatureDialog(false);
    } catch {
      toast.error("Failed to update project. Please try again.");
    }
  };

  // Toggle Visibility Handler
  const handleToggleVisibility = async (id: string) => {
    try {
      await updateProject({
        id,
        data: { isPublic: !project.isPublic },
      }).unwrap();
      toast.success(
        project.isPublic
          ? "Project hidden successfully!"
          : "Project is now public!"
      );
      setOpenVisibilityDialog(false);
    } catch {
      toast.error("Failed to update project visibility.");
    }
  };

  // Delete Project Handler
  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      setOpenDeleteDialog(false);
    } catch {
      toast.error("Failed to delete project. Try again.");
    }
  };

  return (
    <TableRow key={index} className="odd:bg-muted/50">
      <TableCell className="pl-4">{index + 1}</TableCell>
      <TableCell className="font-medium">{project.name}</TableCell>
      <TableCell>{project.type.charAt(0) + project.type.slice(1).toLowerCase()}</TableCell>
      <TableCell>
        {project.typeofWork && project.typeofWork.length > 0
          ? project.typeofWork
              .map((work) => work.charAt(0) + work.slice(1).toLowerCase())
              .join(", ")
          : "N/A"}
      </TableCell>
      <TableCell>{project.status.charAt(0) + project.status.slice(1).toLowerCase()}</TableCell>
      <TableCell>{project.year}</TableCell>
      <TableCell className="flex items-center gap-3">
        <TooltipProvider>
          {/* View */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`/projects/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition cursor-pointer"
              >
                <ArrowRight size={16} />
              </a>
            </TooltipTrigger>
            <TooltipContent>View Project</TooltipContent>
          </Tooltip>
          {/* Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={`/dashboard/edit-project/${project.slug}`}
                className="hover:text-green-600 transition cursor-pointer"
              >
                <Edit size={16} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit Project</TooltipContent>
          </Tooltip>
          {/*  Delete */}
          <AlertDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <button className="hover:text-red-600 transition cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete Project</TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(project._id)}
                    className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </TooltipProvider>
          </AlertDialog>
          {/* Feature Toggle */}
          <AlertDialog
            open={openFeatureDialog}
            onOpenChange={setOpenFeatureDialog}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <button className="hover:text-yellow-500 transition cursor-pointer">
                      {isUpdating ? (
                        <Loader2
                          className="animate-spin text-yellow-500"
                          size={16}
                        />
                      ) : project.isFeatured ? (
                        <Star
                          className="fill-yellow-500 text-yellow-500"
                          size={16}
                        />
                      ) : (
                        <Star size={16} />
                      )}
                    </button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  {project.isFeatured ? "Unfeature Project" : "Make Featured"}
                </TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {project.isFeatured
                      ? "Unfeature this project?"
                      : "Feature this project?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {project.isFeatured
                      ? "This will remove it from featured section."
                      : "This will mark this project as featured."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleToggleFeatured(project._id)}
                    disabled={isUpdating}
                    className="bg-primary text-white hover:bg-primary/90 cursor-pointer"
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin mr-2 inline" size={16} />
                    ) : null}
                    {isUpdating ? "Updating..." : "Confirm"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </TooltipProvider>
          </AlertDialog>
          {/* Visibility Toggle */}
          <AlertDialog
            open={openVisibilityDialog}
            onOpenChange={setOpenVisibilityDialog}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <button className="hover:text-gray-600 transition cursor-pointer">
                      {isUpdating ? (
                        <Loader2
                          className="animate-spin text-gray-500"
                          size={16}
                        />
                      ) : project.isPublic ? (
                        <Globe size={16} />
                      ) : (
                        <Lock size={16} />
                      )}
                    </button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  {project.isPublic ? "Hide Project" : "Make Public"}
                </TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {project.isPublic
                      ? "Hide this project?"
                      : "Make this project public?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {project.isPublic
                      ? "This will hide the project from public view."
                      : "This will make the project visible to everyone."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleToggleVisibility(project._id)}
                    disabled={isUpdating}
                    className="bg-primary text-white hover:bg-primary/90 cursor-pointer"
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin mr-2 inline" size={16} />
                    ) : null}
                    {isUpdating ? "Updating..." : "Confirm"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </TooltipProvider>
          </AlertDialog>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
};

export default ProjectSingleRow;
