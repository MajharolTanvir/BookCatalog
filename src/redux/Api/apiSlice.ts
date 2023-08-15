/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-six.vercel.app/api/v1/",
    // baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders: (headers) => {
      const availableUser = localStorage.getItem("user");
      if (availableUser) {
        const user = JSON.parse(availableUser);

        headers.set("authorization", `Bearer ${user.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["book", "review", "wishlist", "ReadList"],
  endpoints: () => ({}),
});
