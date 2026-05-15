import { apiSlice } from './apiSlice';

export const enrollmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation({
      query: (courseId) => ({
        url: `/enrollment/${courseId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Enrollment'],
    }),

    getMyEnrolledCourses: builder.query({
      query: () => '/enrollment/my-courses',
      providesTags: ['Enrollment'],
    }),

    checkEnrollmentStatus: builder.query({
      query: (courseId) => `/enrollment/check/${courseId}`,
      providesTags: ['Enrollment'],
    }),
  }),
});

export const {
  useEnrollInCourseMutation,
  useGetMyEnrolledCoursesQuery,
  useCheckEnrollmentStatusQuery,
} = enrollmentApi;
