import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '@/app/cytology/[id]/core/functions/prepareHeaders'

export const medWorkerAndPatientApi = createApi({
    reducerPath: 'medWorkerAndPatientApi',
    tagTypes: ['MedWorker', 'Patient'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://109.73.201.164:8000/api/v3'}`,
        prepareHeaders,
    }),
    endpoints: (builder) => ({
        getMedWorker: builder.query<any, string>({
            query: (id) => `/med_worker/patients/${id}`,
            providesTags: ['MedWorker', 'Patient'],
        }),
        editMedWorker: builder.mutation<
            void,
            { id: string; payload: Partial<any> }
        >({
            query: ({ id, payload }) => ({
                url: `/med_worker/update/${id}`,
                method: 'PATCH',
                payload,
            }),
            invalidatesTags: ['MedWorker'],
        }),
        addPatient: builder.mutation<
            void,
            { id: string; payload: Partial<any> }
        >({
            query: (body) => ({
                url: `/patient/create/${body.id}`,
                method: 'POST',
                body: body.payload,
            }),
            invalidatesTags: ['Patient'],
        }),
        editPatient: builder.mutation<
            void,
            { id: string; payload: Partial<any> }
        >({
            query: ({ id, payload }) => ({
                url: `/patient/update/${id}`,
                method: 'PATCH',
                payload,
            }),
            invalidatesTags: ['Patient'],
        }),
        deletePatient: builder.mutation<void, string>({
            query: (id) => ({ url: `/card/${id}/`, method: 'DELETE' }),
            invalidatesTags: ['Patient'],
        }),
        getShots: builder.query<any, string>({
            query: (id) => `/patient/shots/${id}`,
            providesTags: ['Patient'],
        }),
    }),
})

export const {
    useGetMedWorkerQuery,
    useEditMedWorkerMutation,
    useAddPatientMutation,
    useEditPatientMutation,
    useDeletePatientMutation,
    useGetShotsQuery,
} = medWorkerAndPatientApi
