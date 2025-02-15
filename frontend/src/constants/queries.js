import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const BASE_QUERY = fetchBaseQuery({ baseUrl: "http://localhost:5000" });
