import { baseApi } from "@/redux/baseApi";
import type { ICreativeResponse, ICreativeQueryParams, ICreative } from "@/types";

export const creativeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCreativePosts: builder.query<ICreativeResponse, ICreativeQueryParams | void>({
      query: (params = {}) => ({
        url: "/creative",
        method: "GET",
        params: {
            page: params?.page || 1,
            limit: params?.limit || 10,
            search: params?.search
        }
      }),
      providesTags: ["CREATIVE"],
    }),
    creativePostByIdentifier: builder.query<
      { success: boolean; message: string; data: ICreative },
      string
    >({
      query: (identifier) => ({
        url: `/creative/${identifier}`,
        method: "GET",
      }),
      providesTags: ["CREATIVE"]
    }),
    createCreativePost: builder.mutation<
      { success: boolean; message: string; data: ICreative },
      any
    >({
      query: (data) => ({
        url: "/creative/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CREATIVE"],
    }),
    updateCreativePost: builder.mutation<
      { success: boolean; message: string; data: ICreative },
      { id: string; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/creative/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CREATIVE"],
    }),
    deleteCreativePost: builder.mutation<
      { success: boolean; message: string; data: ICreative },
      string
    >({
      query: (id) => ({
        url: `/creative/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CREATIVE"],
    }),
  }),
});

export const { 
  useAllCreativePostsQuery, 
  useCreativePostByIdentifierQuery,
  useCreateCreativePostMutation,
  useUpdateCreativePostMutation,
  useDeleteCreativePostMutation
} = creativeApi;
