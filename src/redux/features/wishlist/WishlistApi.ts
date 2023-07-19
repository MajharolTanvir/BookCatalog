/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../Api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => `/wishlists`,
      providesTags: ["wishlist"],
    }),
    getSingleWishlist: builder.query({
      query: (id) => `/wishlists/${id}`,
      providesTags: ["wishlist"],
    }),
    addWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlists/add-wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useGetSingleWishlistQuery, useAddWishlistMutation, useDeleteWishlistMutation } = wishlistApi;
