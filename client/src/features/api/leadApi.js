import { apiSlice } from './apiSlice';

export const leadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation({
      query: (leadData) => ({
        url: '/lead/create',
        method: 'POST',
        body: leadData,
      }),
      invalidatesTags: ['Lead'],
    }),

    getAllLeads: builder.query({
      query: () => '/lead',
      providesTags: ['Lead'],
    }),

    updateLeadStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/lead/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Lead'],
    }),
  }),
});

export const {
  useCreateLeadMutation,
  useGetAllLeadsQuery,
  useUpdateLeadStatusMutation,
} = leadApi;
