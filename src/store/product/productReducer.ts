import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '..';
import { Product } from './types';

export interface ProductState {
  products: Product[];
  allTags: string[];
}

const initialState: ProductState = {
    products: [],
    allTags: [],
};


export const productSlice = createSlice({
    name: 'product',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      setProducts: (state: { products: Product[]; }, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      },
      setAllTags: (state: { allTags: string[]; }, action: PayloadAction<string[]>) => {
        state.allTags = action.payload;
      },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
  });

  export const { setProducts, setAllTags } = productSlice.actions;

  export const selectProducts = (state: RootState) => state.product.products;
  export const selectAllTags = (state: RootState) => state.product.allTags;

  export default productSlice.reducer;