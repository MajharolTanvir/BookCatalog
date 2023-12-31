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
    updateReadList: builder.mutation({
      query: ({ data, id }) => ({
        url: `/readlists/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ReadList"],
    }),
  }),
});

export const {
  useGetReadListQuery,
  useGetSingleReadListQuery,
    useAddReadListMutation,
  useUpdateReadListMutation
} = readListApi;
