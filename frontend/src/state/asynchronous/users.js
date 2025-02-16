import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
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
  }),
});

export const {
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
} = usersApi;

export const usersMiddleware = usersApi.middleware;

export const usersEndpoints = usersApi.endpoints;

export default usersApi.reducer;
