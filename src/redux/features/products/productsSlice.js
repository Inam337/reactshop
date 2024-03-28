// productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    loadedCount: 0, // Track the number of loaded products
  },

  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setProductById: (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    // New reducer to update the loaded count
    updateLoadedCount: (state, action) => {
      state.loadedCount = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setProductById,
  updateLoadedCount,
} = productSlice.actions;

export default productSlice.reducer;
