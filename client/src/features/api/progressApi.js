import { apiSlice } from './apiSlice';

export const progressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markLectureComplete: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: '/progress/complete',
        method: 'POST',
        body: {
          courseId,
          lectureId,
        },
      }),
      invalidatesTags: ['CourseProgress'],
    }),

    getCourseProgress: builder.query({
      query: (courseId) => `/progress/${courseId}`,
      providesTags: ['CourseProgress'],
    }),
  }),
});

export const { useMarkLectureCompleteMutation, useGetCourseProgressQuery } =
  progressApi;
