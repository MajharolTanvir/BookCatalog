import { api } from "../../Api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/books`,
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
