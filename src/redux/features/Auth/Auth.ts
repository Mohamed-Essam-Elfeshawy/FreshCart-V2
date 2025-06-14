import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authapi",
  tagTypes: ["Auth"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1/",
  }),
  endpoints: (build) => ({
    signup: build.mutation({
      query: (body) => {
        return { url: "auth/signup", method: "POST", body };
      },
    }),
    signin: build.mutation({
      query: (body) => {
        return { url: "auth/signin", method: "POST", body };
      },
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
