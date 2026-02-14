// import { baseApi } from "@/redux/baseApi";
// import type { IAdminLogin, IAdminRegister } from "@/types";

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: (userInfo: IAdminRegister) => ({
//         url: "/register",
//         method: "POST",
//         data: userInfo,
//       }),
//     }),

//     login: builder.mutation({
//       query: (userInfo: IAdminLogin) => ({
//         url: "/auth/login",
//         method: "POST",
//         data: userInfo,
//       }),
//       invalidatesTags: ["ADMIN"],
//     }),

//     userInfo: builder.query({
//       query: () => ({
//         url: "/user/me",
//         method: "GET",
//       }),
//       providesTags: ["ADMIN"],
//     }),

//     logout: builder.mutation({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//       invalidatesTags: ["ADMIN"],
//     }),
//   }),
// });

// export const {
//   useRegisterMutation,
//   useLoginMutation,
//   useUserInfoQuery,
//   useLogoutMutation,
// } = authApi;

import { baseApi } from "@/redux/baseApi";
import type { IAdminLogin, IAdminRegister } from "@/types";

export interface IUpdateProfile {
  name?: string;
  profilePic?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  aboutMe?: string;
  education?: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

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

    updateProfile: builder.mutation({
      query: (data: IUpdateProfile) => ({
        url: "/user/update-me",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    changePassword: builder.mutation({
      query: (data: IChangePassword) => ({
        url: "/user/change-password",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;