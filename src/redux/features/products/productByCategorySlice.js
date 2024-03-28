import { createSlice } from "@reduxjs/toolkit";

const productByCategorySlice = createSlice({
  name: "productByCategory",
  initialState: {
    selectedCategory: null, // To store the selected category
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError, setSelectedCategory } =
  productByCategorySlice.actions;

export default productByCategorySlice.reducer;
