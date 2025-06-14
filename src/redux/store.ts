import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authApi } from "./features/Auth/Auth";
import { categoreApi } from "./features/categore/Categore";
import { productApi } from "./features/Product/Proudct";
import { brandApi } from "./features/Brand/brand";
import { cartApi } from "./features/Cart/cart";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoreApi.reducerPath]: categoreApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      categoreApi.middleware,
      productApi.middleware,
      brandApi.middleware,
      cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
