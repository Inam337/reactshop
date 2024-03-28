// // src/features/categoriesSlice.js
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//   async () => {
//     const response = await fetch("https://dummyjson.com/products/categories");
//     return response.json();
//   }
// );

// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });
// export const selectCategories = (state) => state.categories.items;

// export default categoriesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedCategory: null, // Add a selectedCategory field to your state
  },
  reducers: {
    setCategory: (state, action) => {
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
    // Add a new reducer to set the selected category
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  setCategory,
  setLoading,
  setError,
  selectCategory,
  setSelectedCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
