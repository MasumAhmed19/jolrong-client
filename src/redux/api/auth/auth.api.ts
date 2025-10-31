import { baseApi } from "@/redux/baseApi";
import type { IAdminLogin, IAdminRegister } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo: IAdminRegister) => ({
        url: "/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo: IAdminLogin) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["ADMIN"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
