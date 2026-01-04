/* eslint-disable @typescript-eslint/no-unused-vars */
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
          year: params?.year,
          typeofWork: params?.typeofWork,
          page: params?.page || 1,
          limit: params?.limit || 10,
          isFeatured: params?.isFeatured,
          isPublic: params?.isPublic
        },
      }),
      providesTags:["PROJECTS"]

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
      providesTags: ["PROJECTS"]
    }),

    // Update project
    updateProject: builder.mutation<
      { success: boolean; message: string; data: IProject },
      { id: string; data: IUpdateProjectPayload }
    >({
      query: ({ id, data }) => ({
        url: `/project/${id}`,
        method: "PATCH",
        body: data, // Changed from 'data' to 'body'
      }),
      invalidatesTags: ["PROJECTS"],
    }),

    // Delete project
    deleteProject: builder.mutation<
      { success: boolean; message: string; data: string },
      string
    >({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PROJECTS"],
    }),

    // Get related projects by slug
    getRelatedProjects: builder.query<
      IProjectsResponse,
      { slug: string; limit?: number }
    >({
      query: ({ slug, limit = 6 }) => ({
        url: `/project/related/${slug}`,
        method: "GET",
        params: {
          limit,
        },
      }),
      providesTags: ["PROJECTS"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useAllProjectsQuery,
  useProjectBySlugQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetRelatedProjectsQuery,
} = projectsApi;