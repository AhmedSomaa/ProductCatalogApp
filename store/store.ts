import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import categorySlice from "./categorySlice";
import productSlice  from "./productSlices";

export const store = configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
