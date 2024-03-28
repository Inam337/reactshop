// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(localStorage.getItem("loginUser")) || null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.loading = true;
    },
    loginFulfilled: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null; // Clear any previous errors on successful login
    },
    loginRejected: (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    },
    // Other actions for user state management (e.g., logout)
    logout: (state) => {
      state.user = null;
    },
    checkLoggedInUser: (state) => {
      const user = JSON.parse(localStorage.getItem("loginUser"));
      state.user = user || null;
    },
  },
});
export const {
  loginPending,
  loginFulfilled,
  loginRejected,
  logout,
  checkLoggedInUser,
} = userSlice.actions;

export default userSlice.reducer;
