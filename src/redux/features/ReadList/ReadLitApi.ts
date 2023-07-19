/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../Api/apiSlice";

const readListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReadList: builder.query({
      query: (query) => `/readlists/?${query}`,
      providesTags: ["ReadList"],
    }),
    getSingleReadList: builder.query({
      query: ({ id, email }) => `/readlists/${id}/${email}`,
      providesTags: ["ReadList"],
    }),
    addReadList: builder.mutation({
      query: (data) => ({
        url: "/readlists/add-readlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ReadList"],
    }),
    deleteReadList: builder.mutation({
      query: ({ id, email }) => ({
        url: `/readlists/${id}/${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReadList"],
    }),
  }),
});

export const {
  useGetReadListQuery,
  useGetSingleReadListQuery,
  useAddReadListMutation,
  useDeleteReadListMutation,
} = readListApi;
