import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categorySlice from "../features/categories/categorySlice";

export const store = configureStore({
  reducer: {
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