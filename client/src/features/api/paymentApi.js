import { apiSlice } from './apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (courseId) => ({
        url: '/payment/create-order',
        method: 'POST',
        body: { courseId },
      }),
    }),

    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payment/verify',
        method: 'POST',
        body: paymentData,
      }),
    }),

    getAllPayments: builder.query({
      query: () => ({
        url: '/payment/all',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetAllPaymentsQuery,
} = paymentApi;
