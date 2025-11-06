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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import type { ProjectStatus, ProjectType, TypeOfWork } from "@/types";
import ImageSelectorModal from "@/pages/Dashboard/Projects/createProject/ImageSelectorModal";
import { X } from "lucide-react";

const projectSchema = z.object({
  authorId: z.string().min(1, "Author is required"),
  name: z.string().min(1, "Project name is required"),
  client: z.string().min(1, "Client name is required"),
  location: z.string().min(1, "Location is required"),
  size: z.string().min(1, "Size is required"),
  type: z.string().min(1, "Project type is required"),
  status: z.string().min(1, "Project status is required"),
  typeofWork: z.string().min(1, "Type of work is required"),
  year: z.string().min(1, "Year is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  featuredVideo: z.string().optional(),
  color: z.string().optional(),
  budget: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isPublic: z.boolean().optional(),
});

const years = Array.from({ length: 9 }, (_, i) => 2022 + i);

const projectTypes: ProjectType[] = [
  "EXTERIOR",
  "INTERIOR",
  "STRUCTURAL",
  "GRAPHICS",
];

const projectStatuses: ProjectStatus[] = ["ONGOING", "COMPLETED", "UPCOMING"];

const typeofWork: TypeOfWork[] = [
  "DESIGN",
  "VISUALIZATION",
  "ANIMATION",
  "CONSULTANT",
];

interface ProjectFormProps {
  mode: "create" | "edit";
  defaultValues?: z.infer<typeof projectSchema>;
  onSubmit: (values: z.infer<typeof projectSchema>) => Promise<void>;
  isSubmitting?: boolean;
}

const ProjectForm = ({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">
          {mode === "edit" ? "Edit Project" : "Create New Project"}
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Project Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-wrap md:flex gap-5">
          {/* Client */}
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input placeholder="Client Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Project Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Size */}
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder="Project Size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input placeholder="Budget" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

            {/* type - work - status - year */}
        <div className="flex-wrap md:flex gap-5 ">
          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project Type</FormLabel>
                <FormControl className="w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type.charAt(0).toUpperCase() +
                            type.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* type of work */}
          <FormField
            control={form.control}
            name="typeofWork"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Type of work</FormLabel>
                <FormControl className="w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type of work" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeofWork.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="capitalize"
                        >
                          {status.charAt(0).toUpperCase() +
                            status.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project Status</FormLabel>
                <FormControl className="w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatuses.map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="capitalize"
                        >
                          {status.charAt(0).toUpperCase() +
                            status.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Year</SelectLabel>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-32"
                  placeholder="Project Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* images select */}
        <div className="flex-wrap md:flex gap-5 ">
          {/* Featured Image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Featured Image</FormLabel>
                <FormControl>
                  <ImageSelectorModal
                    triggerLabel={field.value ? "Change Image" : "Select Image"}
                    multiple={false}
                    onSelect={(url) => field.onChange(url)}
                  />
                </FormControl>
                {field.value && (
                  <div className="relative mt-2 w-24 h-24 group ">
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
              </FormItem>
            )}
          />

          {/* Gallery - UPDATED */}
          <FormField
            control={form.control}
            name="gallery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Gallery Images</FormLabel>
                <FormControl>
                  <ImageSelectorModal
                    triggerLabel="Add Gallery Images"
                    multiple={true}
                    initialSelected={field.value || []} // ✅ Pass existing selections
                    onSelect={(urls) => {
                      // ✅ NEW: Merge logic - selectedUrls already contains old + new
                      const newUrls = Array.isArray(urls) ? urls : [urls];
                      field.onChange(newUrls);
                    }}
                  />
                </FormControl>
                {field.value && field.value.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {field.value.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={url}
                          alt={`gallery-${idx}`}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = field.value!.filter(
                              (_, i) => i !== idx
                            );
                            field.onChange(newValue);
                          }}
                          className="absolute cursor-pointer top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. modern, minimalist"
                  value={
                    Array.isArray(field.value) ? field.value.join(", ") : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Featured & Public */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="accent-primary"
                  />
                </FormControl>
                <FormLabel className="mb-0">Featured</FormLabel>
              </FormItem>
            )}
          />

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
                    className="accent-primary"
                  />
                </FormControl>
                <FormLabel className="mb-0">Public</FormLabel>
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
            ? "Update Project"
            : "Create Project"}
        </Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
