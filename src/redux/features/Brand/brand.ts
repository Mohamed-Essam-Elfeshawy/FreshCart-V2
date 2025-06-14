import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandapi",
  tagTypes: ["brand"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1/",
  }),
  endpoints: (build) => ({
    allBrand: build.query({
      query: () => {
        return { url: "brands", method: "GET" };
      },
    }),
  }),
});
export const { useAllBrandQuery } = brandApi;
