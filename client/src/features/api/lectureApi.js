import { apiSlice } from './apiSlice';

export const lectureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({ courseId, lectureData }) => ({
        url: `/lecture/${courseId}`,
        method: 'POST',
        body: lectureData,
      }),
      invalidatesTags: ['Lecture'],
    }),

    getLectures: builder.query({
      query: (courseId) => `/lecture/${courseId}`,
      providesTags: ['Lecture'],
    }),

    getLectureById: builder.query({
      query: (lectureId) => `/lecture/details/${lectureId}`,
      providesTags: ['Lecture'],
    }),

    updateLecture: builder.mutation({
      query: ({ lectureId, lectureData }) => ({
        url: `/lecture/${lectureId}`,
        method: 'PUT',
        body: lectureData,
      }),
      invalidatesTags: ['Lecture'],
    }),

    uploadLectureVideo: builder.mutation({
      query: ({ lectureId, formData }) => ({
        url: `/lecture/${lectureId}/video`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Lecture'],
    }),

    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lecture'],
    }),
  }),
});

export const {
  useCreateLectureMutation,
  useGetLecturesQuery,
  useGetLectureByIdQuery,
  useUpdateLectureMutation,
  useUploadLectureVideoMutation,
  useDeleteLectureMutation,
} = lectureApi;
