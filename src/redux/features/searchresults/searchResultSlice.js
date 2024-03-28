// slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "results",
  initialState: {
    searchResults: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    startSearch: (state) => {
      state.loading = "loading";
      state.error = null;
    },
    searchSuccess: (state, action) => {
      state.loading = "succeeded";
      state.searchResults = action.payload;
    },
    searchFailure: (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    },
  },
});

export const { startSearch, searchSuccess, searchFailure } =
  searchResultSlice.actions;

export default searchResultSlice.reducer;
