import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/config";

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

    getUserById: builder.query({
      query: (id) => `users/cabinet/${id}`,
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

    setCourseStatus: builder.mutation({
      query: (course) => ({
        url: "/course/set-status",
        method: "PUT",
        body: course,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/${courseId}`,
        method: "DELETE",
      }),
    }),

    removeStudentFromCourse: builder.mutation({
      query: (courseStudent) => ({
        url: "/course/student",
        method: "DELETE",
        body: courseStudent,
      }),
    }),

    addStudentsToCourse: builder.mutation({
      query: (courseStudent) => ({
        url: "/course/student",
        method: "POST",
        body: courseStudent,
      }),
    }),

    getCoursesByStudent: builder.mutation({
      query: (studentId) => `/course/student/${studentId}`,
    }),

    changePassword: builder.mutation({
      query: (passDto) => ({
        url: "/auth/pass",
        method: "PUT",
        body: passDto,
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
  useSetCourseStatusMutation,
  useDeleteCourseMutation,
  useRemoveStudentFromCourseMutation,
  useAddStudentsToCourseMutation,
  useGetCoursesByStudentMutation,
  useChangePasswordMutation,
  useGetUserByIdQuery
} = usersApi;

export const usersMiddleware = usersApi.middleware;

export const usersEndpoints = usersApi.endpoints;

export default usersApi.reducer;
