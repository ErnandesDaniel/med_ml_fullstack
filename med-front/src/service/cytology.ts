import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./headers";

export const cytologyApi = createApi({
    reducerPath: "cytologyApi",
    tagTypes: ["Cytology"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://109.73.201.164:8000/api/v3"}/cytology`,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        getCytology: builder.query<any, string>({
            query: (id) => `/${id}`,
            providesTags: ["Cytology"]
        }),
        editCytology: builder.mutation<void, { id: string; payload: Partial<any> }>({
            query: ({ id, payload }) => ({ url: `/${id}/update`, method: "PATCH", payload }),
            invalidatesTags: ["Cytology"]
        }),
        getHistory: builder.query<any, string>({
            query: (id) => `/history/${id}`,
            providesTags: ["Cytology"]
        }),
        createCytology: builder.mutation<void, { payload: Partial<any> }>({
            query: (body) => ({
              url: "/create/",
              method: "POST",
              body: body.payload,
            }),
            invalidatesTags: ["Cytology"]
        })
    })
});

export const { useCreateCytologyMutation, useGetHistoryQuery, useGetCytologyQuery, useEditCytologyMutation } = cytologyApi;