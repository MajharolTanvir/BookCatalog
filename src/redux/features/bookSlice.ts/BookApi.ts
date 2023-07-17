/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useGetSingleBooksQuery, useUpdateBookMutation } = bookApi;
