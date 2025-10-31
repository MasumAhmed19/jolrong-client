// import { axiosInstance } from "@/lib/axios";
// import { type BaseQueryFn } from "@reduxjs/toolkit/query";
// import { AxiosError, type AxiosRequestConfig } from "axios";

// const axiosBaseQuery =
//   (): BaseQueryFn<
//     {
//       url: string;
//       method?: AxiosRequestConfig["method"];
//       data?: AxiosRequestConfig["data"];
//       params?: AxiosRequestConfig["params"];
//       headers?: AxiosRequestConfig["headers"];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params, headers }) => {
//     try {
//       const result = await axiosInstance({
//         url: url,
//         method,
//         data,
//         params,
//         headers,
//       });
//       return { data: result.data };
//     } catch (axiosError) {
//       const err = axiosError as AxiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

// export default axiosBaseQuery;


import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, type AxiosRequestConfig } from "axios";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      body?: AxiosRequestConfig["data"]; // ✅ support body like fetchBaseQuery
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      formData?: boolean;
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, body, params, headers, formData }) => {
    try {
      const payload = formData ? body || data : data || body;

      const result = await axiosInstance({
        url,
        method,
        data: payload,
        params,
        headers: {
          ...(headers || {}),
          ...(formData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" }),
        },
        withCredentials: true,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;

