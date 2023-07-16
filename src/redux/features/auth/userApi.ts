import { api } from "../../Api/apiSlice";
import { ICredential } from "./userSlice";


const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (data: ICredential) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["signup"],
    }),
  }),
});

export const {
  useUserSignupMutation
} = userApi;
