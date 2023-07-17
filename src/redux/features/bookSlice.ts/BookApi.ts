/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../Api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/books`,
    }),
    getSingleBooks: builder.query({
      query: (id: string | undefined) => `/books/${id}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetSingleBooksQuery } = bookApi;
