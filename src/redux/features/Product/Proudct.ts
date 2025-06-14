import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productapi",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1/",
  }),
  endpoints: (build) => ({
    allProducts: build.query({
      query: () => {
        return { url: "products", method: "GET" };
      },
    }),
    singleProduct: build.query({
      query: (id) => {
        return { url: `products/${id}`, method: "GET" };
      },
    }),
    relatedProduct: build.query({
      query: (id) => {
        return { url: `products?category=${id}`, method: "GET" };
      },
    }),
  }),
});
export const {
  useAllProductsQuery,
  useSingleProductQuery,
  useRelatedProductQuery,
} = productApi;
