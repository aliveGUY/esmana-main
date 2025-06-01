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

    getCourseById: builder.query({
      query: (id) => `courses/${id}`,
    }),

    createCourse: builder.mutation({
      query: (courseData) => ({
        url: 'courses',
        method: 'POST',
        body: courseData,
      }),
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
  useGetCourseByIdQuery,
  useCreateCourseMutation,
} = usersApi

export const usersMiddleware = usersApi.middleware

export const usersEndpoints = usersApi.endpoints

export default usersApi.reducer
