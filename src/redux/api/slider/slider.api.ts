import { baseApi } from "@/redux/baseApi";

export interface ISlider {
  _id: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISliderResponse {
  success: boolean;
  message: string;
  data: ISlider[] | ISlider;
}

export const sliderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    createSlider: builder.mutation<
      { success: boolean; message: string; data: ISlider },
      Partial<ISlider>
    >({
      query: (data) => ({
        url: "/slider",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SLIDER"],
    }),

    /* ===== Get All Sliders (Admin) ===== */
    getAllSliders: builder.query<
      { success: boolean; message: string; data: ISlider[] },
      void
    >({
      query: () => ({
        url: "/slider",
        method: "GET",
      }),
      providesTags: ["SLIDER"],
    }),

    /* ===== Get Active Sliders (Public) ===== */
    getActiveSliders: builder.query<
      { success: boolean; message: string; data: ISlider[] },
      void
    >({
      query: () => ({
        url: "/slider/active",
        method: "GET",
      }),
      providesTags: ["SLIDER"],
    }),

    /* ===== Reorder Sliders (Admin, Optimized) ===== */
    reorderSliders: builder.mutation<
      { success: boolean; message: string },
      { ids: string[] }
    >({
      query: (data) => ({
        url: "/slider/reorder",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SLIDER"],
    }),

    /* ===== Update Slider (Admin) ===== */
    updateSlider: builder.mutation<
      { success: boolean; message: string; data: ISlider },
      { id: string; data: Partial<ISlider> }
    >({
      query: ({ id, data }) => ({
        url: `/slider/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SLIDER"],
    }),

    /* ===== Delete Slider (Admin) ===== */
    deleteSlider: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/slider/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SLIDER"],
    }),
  }),
});

export const {
  useCreateSliderMutation,
  useGetAllSlidersQuery,
  useGetActiveSlidersQuery,
  useReorderSlidersMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi;
