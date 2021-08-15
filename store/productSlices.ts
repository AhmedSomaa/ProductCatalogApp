import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

export interface IProduct {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    favorite: boolean;
    description: string;
}

export interface ProductsState {
    products: IProduct[];
    favourites: IProduct[];
    status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
    products: [],
    favourites: [],
    status: "idle"
};

export const fetchProductsAsync: any = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            return await response.json();
        } catch (error) {
            Promise.reject(error);
        }
    }
)

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const {id, favorite} = action.payload;
            // id-1 => products ids starting from 1 while array indecies start at 0
            // product[0] => id = 1
            state.products[id-1].favorite = favorite;
            state.favourites = [...state.favourites, state.products[id-1]];
        }
    },
    extraReducers: {
        [fetchProductsAsync.fulfilled]: (state, action) => {
            state.products = action.payload.map((item: any) => {
                return {...item, favorite: false}
            });
            state.status = "idle";
        },
        [fetchProductsAsync.pending]: (state) => {
            state.products = [];
            state.status = "loading";
        },
        [fetchProductsAsync.rejected]: (state) => {
            state.products = [];
            state.status = "failed";
        }
    }
})

export const { addToFavorites } = productSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;

export default productSlice.reducer;