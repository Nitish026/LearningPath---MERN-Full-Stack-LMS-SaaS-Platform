import { apiSlice } from './apiSlice';
import { userLoggedIn, userLoggedOut } from '../authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: '/users/register',
        method: 'POST',
        body: inputData,
      }),
    }),

    // Login
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: '/users/login',
        method: 'POST',
        body: inputData,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const user = result?.data?.user;
          if (user) {
            dispatch(userLoggedIn({ user }));
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),

    adminLogin: builder.mutation({
      query: (inputData) => ({
        url: '/users/admin-login',
        method: 'POST',
        body: inputData,
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
      providesTags: ['User'],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const user = result?.data?.user;
          if (user) {
            dispatch(userLoggedIn({ user }));
          }
        } catch (error) {
          dispatch(userLoggedOut());
        }
      },
    }),

    // Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(userLoggedOut());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),

    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: '/users/update-profile',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAdminLoginMutation,
  useGetUserProfileQuery,
  useLogoutUserMutation,
  useUpdateUserProfileMutation,
} = authApi;
