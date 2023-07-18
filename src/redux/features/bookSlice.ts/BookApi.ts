/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../Api/apiSlice";


const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/books`,
      providesTags: ["update-book"],
    }),
    getSingleBook: builder.query({
      query: (id: string | undefined) => `/books/${id}`,
      providesTags: ["update-book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["update-book"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/add-new-book`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useGetSingleBookQuery, useUpdateBookMutation, useAddBookMutation, useDeleteBookMutation } = bookApi;
