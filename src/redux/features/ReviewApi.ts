/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../Api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["review"],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: "/reviews/add-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {useGetAllReviewsQuery, useAddReviewMutation} = bookApi;
