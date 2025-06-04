import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../constants/config'

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createMembershipPaymentIntent: builder.mutation({
      query: (memberIdentity) => ({
        url: '/create-membership-payment-intent',
        method: 'POST',
        body: memberIdentity,
      }),
    }),

    checkRegistrationStatus: builder.mutation({
      query: (paymentIntentId) => ({
        url: `/check-registration-status?paymentIntentId=${encodeURIComponent(paymentIntentId)}`,
        method: 'GET',
      }),
    }),

    login: builder.mutation({
      query: (loginData) => ({
        url: 'auth/login',
        method: 'POST',
        body: loginData,
      }),
    }),

    register: builder.mutation({
      query: (registerData) => ({
        url: 'auth/register',
        method: 'POST',
        body: registerData,
      }),
    }),

    googleLogin: builder.mutation({
      query: (loginData) => ({
        url: 'auth/google/login',
        method: 'POST',
        body: loginData,
      }),
    }),

    googleRegister: builder.mutation({
      query: (registerData) => ({
        url: 'auth/google/register',
        method: 'POST',
        body: registerData,
      }),
    }),

    updateAuth: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
    }),

    getAllCourses: builder.query({
      query: () => 'courses',
    }),

    getCourseById: builder.mutation({
      query: (id) => `courses/${id}`,
    }),

    createCourse: builder.mutation({
      query: (courseData) => ({
        url: 'courses',
        method: 'POST',
        body: courseData,
      }),
    }),

    editCourse: builder.mutation({
      query: (courseData) => ({
        url: 'courses',
        method: 'PUT',
        body: courseData,
      }),
    }),

    searchVideos: builder.mutation({
      query: (query) => ({
        url: `static/video?title=${query}`,
        method: 'GET',
      }),
    }),

    searchUsers: builder.mutation({
      query: (mail) => ({
        url: `users/search?mail=${mail}`,
        method: 'GET',
      }),
    }),

    getAllUsers: builder.query({
      query: () => 'users',
    }),

    createAccount: builder.mutation({
      query: (accountData) => ({
        url: 'users',
        method: 'POST',
        body: accountData,
      }),
    }),

    editAccount: builder.mutation({
      query: (accountData) => ({
        url: 'users',
        method: 'PUT',
        body: accountData,
      }),
    }),

    getUserById: builder.mutation({
      query: (userId) => `users/${userId}`,
    }),

    createCheckoutForm: builder.mutation({
      query: ({ lectureIds, formData }) => {
        const searchParams = new URLSearchParams()
        lectureIds.forEach((value) => searchParams.append('lids', value.toString()))

        return {
          url: `checkout/way-for-pay?${searchParams.toString()}`,
          method: 'POST',
          body: formData,
          responseHandler: (response) => response.text(),
        }
      },
    }),

    createCheckoutFormWithGoogle: builder.mutation({
      query: ({ lectureIds, token }) => {
        const searchParams = new URLSearchParams()
        lectureIds.forEach((value) => searchParams.append('lids', value.toString()))

        return {
          url: `checkout/google/way-for-pay?${searchParams.toString()}`,
          method: 'POST',
          body: token,
          responseHandler: (response) => response.text(),
        }
      },
    }),
  }),
})

export const {
  useCreateMembershipPaymentIntentMutation,
  useCheckRegistrationStatusMutation,
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useGoogleRegisterMutation,
  useUpdateAuthMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdMutation,
  useCreateCourseMutation,
  useSearchVideosMutation,
  useEditCourseMutation,
  useSearchUsersMutation,
  useGetAllUsersQuery,
  useCreateAccountMutation,
  useGetUserByIdMutation,
  useEditAccountMutation,
  useCreateCheckoutFormMutation,
  useCreateCheckoutFormWithGoogleMutation,
} = usersApi

export function serveStaticImage(imageId) {
  return `${BASE_URL}/static/images/${imageId}`
}

export const usersMiddleware = usersApi.middleware

export const usersEndpoints = usersApi.endpoints

export default usersApi.reducer
