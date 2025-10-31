import { baseApi } from "@/redux/baseApi";
import type {
  IProject,
  ICreateProjectPayload,
  IUpdateProjectPayload,
  IProjectQueryParams,
  IProjectsResponse,
} from "@/types";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create project
    createProject: builder.mutation<
      { success: boolean; message: string; data: IProject },
      ICreateProjectPayload
    >({
      query: (projectData) => ({
        url: "/project",
        method: "POST",
        body: projectData, // Changed from 'data' to 'body'
      }),
      invalidatesTags: ["PROJECTS"],
    }),

    // Get all projects with filters and pagination
    allProjects: builder.query<IProjectsResponse, IProjectQueryParams | void>({
      query: (params = {}) => ({
        url: "/project",
        method: "GET",
        params: {
          search: params?.search,
          type: params?.type,
          status: params?.status,
          sortBy: params?.sortBy || "createdAt",
          sortOrder: params?.sortOrder || "desc",
          page: params?.page || 1,
          limit: params?.limit || 10,
          isFeatured: params?.isFeatured,
        },
      }),

    }),

    // Get project by slug
    projectBySlug: builder.query<
      { success: boolean; message: string; data: IProject },
      string
    >({
      query: (slug) => ({
        url: `/project/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [
        { type: "PROJECTS", id: result?.data._id },
      ],
    }),

    // Update project
    updateProject: builder.mutation<
      { success: boolean; message: string; data: IProject },
      { id: string; data: IUpdateProjectPayload }
    >({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data, // Changed from 'data' to 'body'
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PROJECTS", id },
        { type: "PROJECTS", id: "LIST" },
      ],
    }),

    // Delete project
    deleteProject: builder.mutation<
      { success: boolean; message: string; data: string },
      string
    >({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PROJECTS", id },
        { type: "PROJECTS", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useAllProjectsQuery,
  useProjectBySlugQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;