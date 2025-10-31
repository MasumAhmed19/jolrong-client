import {createApi} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './axiosBaseQuery'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    // baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9000/api/v1', credentials: 'include'}),
    // credentials include krle axios er moto cookie save hve
    baseQuery: axiosBaseQuery(),
    tagTypes: ["PROJECTS", "GALLERY", "ADMIN"],
    endpoints:()=>({})
})