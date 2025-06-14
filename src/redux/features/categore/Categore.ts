import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoreApi = createApi({
  reducerPath: "categoreapi",
  tagTypes: ["Categore"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1/",
  }),
  endpoints: (build) => ({
    allCategore: build.query({
      query: () => {
        return { url: "categories", method: "GET" };
      },
    }),
  }),
});
export const { useAllCategoreQuery } = categoreApi;
