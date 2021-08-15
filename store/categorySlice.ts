import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

export interface CategoriesState {
  categories: string[];
  status: "idle" | "loading" | "failed";
}

const initialState: CategoriesState = {
  categories: [],
  status: "idle",
};

export const fetchCategoriesAsync: any = createAsyncThunk(
  "counter/fetchCategories",
  async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      return await response.json();
    } catch (error) {
      Promise.reject(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategoriesAsync.fulfilled]: (state, action) => {
      state.categories = ['all', ...action.payload];
      state.status = "idle";
    },
    [fetchCategoriesAsync.pending]: (state, action) => {
      state.categories = [];
      state.status = "loading";
    },
    [fetchCategoriesAsync.rejected]: (state, action) => {
      state.categories = [];
      state.status = "failed";
    },
  },
});

export const selectCategories = (state: RootState) =>
  state.categories.categories;

export const selectCategoriesStatus = (state: RootState) =>
  state.categories.status;

export default categorySlice.reducer;
