import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/config";

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createMembershipPaymentIntent: builder.mutation({
      query: (memberIdentity) => ({
        url: "/create-membership-payment-intent",
        method: "POST",
        body: memberIdentity,
      }),
    }),
  }),
});

export const {
  useCreateMembershipPaymentIntentMutation
} = usersApi;

export const usersMiddleware = usersApi.middleware;

export const usersEndpoints = usersApi.endpoints;

export default usersApi.reducer;
