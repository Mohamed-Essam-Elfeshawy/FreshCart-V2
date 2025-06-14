import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const localData =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
export const cartApi = createApi({
  reducerPath: "cartapi",
  tagTypes: ["Cart"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce.routemisr.com/api/v1/",
  }),
  endpoints: (build) => ({
    allCart: build.query({
      query: () => {
        return {
          url: "cart",
          method: "GET",
          headers: {
            token: `${localData}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.products.map(({ id }: { id: number }) => ({
                type: "Cart" as const,
                id,
              })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    addProductCart: build.mutation({
      query: (body) => {
        return {
          url: "/cart",
          method: "POST",
          body,
          headers: {
            token: `${localData}`,
          },
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteProudctCart: build.mutation({
      query: (id) => {
        return {
          url: `/cart/${id}`,
          method: "DELETE",
          headers: {
            token: `${localData}`,
          },
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateProudctCount: build.mutation({
      query: ({ id, body }) => {
        return {
          url: `/cart/${id}`,
          method: "PUT",
          body,
          headers: {
            token: `${localData}`,
          },
        };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("allCart", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});
export const {
  useAllCartQuery,
  useAddProductCartMutation,
  useDeleteProudctCartMutation,
  useUpdateProudctCountMutation,
} = cartApi;
