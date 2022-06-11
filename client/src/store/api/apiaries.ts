import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Apiary } from '../../models/apiary'

type ApiaryResponse = Apiary[]

export const apiaryApi = createApi({
  reducerPath: 'apiaryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/'}),
  tagTypes: ['Apiary'],
  endpoints: (builder) => ({
    getAllApiaries: builder.query<ApiaryResponse, void>({
      query: () => `apiaries`,
      providesTags: ['Apiary'],
    }),
    getApiary: builder.query<Apiary, string>({
      query: (id) => {
        return {
          url: `apiaries/${id}`,
        }
      },
      providesTags: ['Apiary'],
    }),
    createApiary: builder.mutation<Apiary, Partial<Apiary>>({
      query: (body: {}) => ({
        url: 'apiaries',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Apiary'],
    }),
    updateApiary: builder.mutation<Apiary, Partial<Apiary>>({
      query: ({ _id, ...patch }) => ({
        url: `apiaries/${_id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Apiary'],
    }),
    deleteApiary: builder.mutation<{ success: boolean; id: string | number }, string>({
      query: (id) => ({
        url: `apiaries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Apiary'],
    }),
  }),
})

export const {
  useGetAllApiariesQuery,
  useGetApiaryQuery,
  useCreateApiaryMutation,
  useUpdateApiaryMutation,
  useDeleteApiaryMutation,
} = apiaryApi