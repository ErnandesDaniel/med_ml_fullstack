import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { prepareHeaders } from '@/app/cytology/[id]/core/functions/prepareHeaders'
import { IPoint } from '@/app/uzi_view/[id]/UziView/UziViewer/Viewer/interfaces/queries'


import {
    ICytolgyInfoPatch,
    ICytology,
    ICytologyHistory,
} from '@/app/cytology/[id]/core/types/cytology'
import {
    IGroupedSegments,
    ISegmentCreate,
    ISegmentResponse,
    ISegmentStack,
} from '@/app/cytology/[id]/core/types/segments'

export const cytologyApi = createApi({
    reducerPath: 'cytologyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            'http://109.73.201.164:8000/api/v3/'
        }cytology/`,
        prepareHeaders,
    }),
    tagTypes: ['Segments', 'Cytology'],
    endpoints: (builder) => ({
        getCytologyInfo: builder.query<ICytology, string | number>({
            query: (id) => `${id}`,
            providesTags: ['Cytology'],
        }),
        getCytologySegment: builder.query<IGroupedSegments[], string | number>({
            query: (id) => `${id}/segments`,
            providesTags: ['Segments'],
            transformResponse: (response: ISegmentResponse) =>
                response.results.reduce((acc: IGroupedSegments[], segment) => {
                    const existingGroup = acc.find(
                        (group) => group.seg_type === segment.seg_type
                    )
                    const { data, seg_type, is_ai } = segment
                    const segmentsToStack: ISegmentStack[] = data.map(
                        (segmentData) => ({
                            id: segmentData.id,
                            seg_type,
                            is_ai,
                            points: segmentData.points,
                            details: segmentData.details,
                        })
                    )

                    if (existingGroup) {
                        existingGroup.segments.push(...segmentsToStack)
                    } else {
                        acc.push({
                            seg_type: seg_type,
                            segments: segmentsToStack,
                        })
                    }

                    return acc
                }, []),
        }),
        addSegment: builder.mutation<
            void,
            { cytologyId: number; segment: ISegmentCreate }
        >({
            query: ({ cytologyId, segment }) => ({
                url: `/segment/group/create/${cytologyId}/`,
                method: 'POST',
                body: segment,
            }),
            invalidatesTags: ['Segments'],
        }),
        patchSegment: builder.mutation<
            void,
            { segmentId: string | number; points: IPoint[] }
        >({
            query: ({ segmentId, points }) => ({
                url: `/segment/update/${segmentId}/`,
                method: 'PATCH',
                body: { points },
            }),
            invalidatesTags: ['Segments'],
        }),
        deleteSegment: builder.mutation<void, number>({
            query: (segmentId) => ({
                url: `/segment/update/${segmentId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Segments'],
        }),
        addNewRevise: builder.mutation<{ id: number }, number>({
            query: (pk) => ({
                url: `/copy/`,
                method: 'POST',
                body: { pk },
            }),
            invalidatesTags: ['Cytology'],
        }),
        patchCytologyInfo: builder.mutation<
            void,
            { id: number; body: ICytolgyInfoPatch }
        >({
            query: (data) => ({
                url: `/${data.id}/update/`,
                method: 'PATCH',
                body: { ...data.body },
            }),
            invalidatesTags: ['Cytology'],
        }),
        getCytologyHistory: builder.query<ICytologyHistory, number>({
            query: (id) => `/history/${id}/`,
            providesTags: ['Cytology'],
        }),
    }),
})

export const {
    useGetCytologyInfoQuery,
    useGetCytologySegmentQuery,
    useLazyGetCytologySegmentQuery,
    useAddSegmentMutation,
    usePatchSegmentMutation,
    useDeleteSegmentMutation,
    useAddNewReviseMutation,
    usePatchCytologyInfoMutation,
    useGetCytologyHistoryQuery,
} = cytologyApi
