import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.esmana-main.org";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/student",
        method: "POST",
        body: userData,
      }),
    }),

    registerMember: builder.mutation({
      query: (userData) => ({
        url: "/users/member",
        method: "POST",
        body: userData,
      }),
    }),

    extendStudentToMember: builder.mutation({
      query: (userData) => ({
        url: "/users/student-to-member",
        method: "PUT",
        body: userData,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: "/auth",
        method: "POST",
        body: userData,
      }),
    }),

    getSession: builder.query({
      query: () => "/auth",
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    checkIfUserExists: builder.mutation({
      query: (user) => ({
        url: "/auth/check",
        method: "POST",
        body: user,
      }),
    }),

    checkIfIdentityComplete: builder.mutation({
      query: (userId) => `/users/check-complete/${userId}`,
    }),

    createCourse: builder.mutation({
      query: (course) => ({
        url: "/course",
        method: "POST",
        body: course,
      }),
    }),

    getAllCourses: builder.mutation({
      query: () => "/course/all",
    }),

    getAllActiveCourses: builder.mutation({
      query: () => "/course/active",
    }),

    createLecture: builder.mutation({
      query: (lecture) => ({
        url: "/lecture",
        method: "POST",
        body: lecture,
      }),
    }),

    searchForUser: builder.mutation({
      query: (partialEmail) => ({
        url: `/users/mail-search/${partialEmail}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useGetSessionQuery,
  useLogoutMutation,
  useCheckIfUserExistsMutation,
  useRegisterMemberMutation,
  useExtendStudentToMemberMutation,
  useCheckIfIdentityCompleteMutation,
  useCreateCourseMutation,
  useGetAllCoursesMutation,
  useGetAllActiveCoursesMutation,
  useCreateLectureMutation,
  useSearchForUserMutation,
} = usersApi;

export const usersMiddleware = usersApi.middleware;

export const usersEndpoints = usersApi.endpoints;

export default usersApi.reducer;
