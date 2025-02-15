import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_QUERY } from "../../constants/queries";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: BASE_QUERY,
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
  }),
});

export const { useGetAllUsersQuery, useRegisterUserMutation } = usersApi;

export const usersMiddleware = usersApi.middleware;

export default usersApi.reducer;
