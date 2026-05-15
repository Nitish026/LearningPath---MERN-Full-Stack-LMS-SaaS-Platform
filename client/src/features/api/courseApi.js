import { apiSlice } from './apiSlice';

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: '/course/create',
        method: 'POST',
        body: courseData,
      }),
      invalidatesTags: ['Course'],
    }),

    getCourses: builder.query({
      query: () => '/course',
      providesTags: ['Course'],
    }),

    getCourseById: builder.query({
      query: (courseId) => `/course/${courseId}`,
      providesTags: ['Course'],
    }),

    updateCourse: builder.mutation({
      query: ({ courseId, courseData }) => ({
        url: `/course/${courseId}`,
        method: 'PUT',
        body: courseData,
      }),
      invalidatesTags: ['Course'],
    }),

    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),

    updateCourseThumbnail: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/course/${courseId}/thumbnail`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Course'],
    }),

    togglePublishCourse: builder.mutation({
      query: ({ courseId, isPublished }) => ({
        url: `/course/${courseId}/publish`,
        method: 'PATCH',
        body: { isPublished },
      }),
      invalidatesTags: ['Course'],
    }),

    getPublishedCourses: builder.query({
      query: () => '/course/published',
      providesTags: ['Course'],
    }),

    getPublicCourseById: builder.query({
      query: (courseId) => `/course/public/${courseId}`,
      providesTags: ['Course'],
    }),

    getCourseForLearning: builder.query({
      query: (courseId) => `/course/learn/${courseId}`,
      providesTags: ['Course'],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useDeleteCourseMutation,
  useUpdateCourseThumbnailMutation,
  useTogglePublishCourseMutation,
  useGetPublishedCoursesQuery,
  useGetPublicCourseByIdQuery,
  useGetCourseForLearningQuery,
} = courseApi;
