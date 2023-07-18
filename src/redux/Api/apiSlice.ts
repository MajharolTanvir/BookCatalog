import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://book-catalog-server-six.vercel.app/api/v1/",
    // baseUrl: "https://book-catalog-server.onrender.com/api/v1/",
    baseUrl: "http://localhost:5000/api/v1/",
  }),
  tagTypes: ["update-book"],
  endpoints: () => ({}),
});
