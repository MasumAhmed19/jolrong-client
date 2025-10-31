import { baseApi } from "@/redux/baseApi";
import type { IGalleryImage, IPaginationParams } from "@/types";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Upload images
    uploadImages: builder.mutation<
      { success: boolean; message: string; data: IGalleryImage[] },
      FormData
    >({
      query: (formData) => ({
        url: "/gallery/upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["GALLERY"],
    }),

    // List images with pagination
    listImages: builder.query<
      {
        success: boolean;
        message: string;
        data: IGalleryImage[];
        meta: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      },
      IPaginationParams | void
    >({
      query: ({ page = 1, limit = 9 } = {}) => ({
        url: "/gallery/list",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["GALLERY"],
    }),

    // Delete image
    deleteImage: builder.mutation<
      { success: boolean; message: string; data: string },
      string
    >({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GALLERY"],
    }),
  }),
});

export const {
  useUploadImagesMutation,
  useListImagesQuery,
  useDeleteImageMutation,
} = galleryApi;
