import { ICredential, ILoginResponse } from "../../../Types/GlobalTypes";
import { api } from "../../Api/apiSlice";


const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (data: ICredential) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (data: ILoginResponse) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserLoginMutation
} = userApi;
