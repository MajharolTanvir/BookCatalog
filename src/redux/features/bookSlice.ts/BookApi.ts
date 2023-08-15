/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../Api/apiSlice";


const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/books`,
      providesTags: ["book"],
    }),
    getSingleBook: builder.query({
      query: (id: string | undefined) => `/books/${id}`,
      providesTags: ["book"],
    }),
    getFilterBook: builder.query({
      query: (query) => `/books/?${query}`,
      providesTags: ["book"],
    }),
    getSearchBook: builder.query({
      query: (query) => `/books/?${query}`,
      providesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/books/add-new-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const { useGetAllBooksQuery, useGetSingleBookQuery, useUpdateBookMutation, useAddBookMutation, useDeleteBookMutation, useGetSearchBookQuery, useGetFilterBookQuery } = bookApi;
