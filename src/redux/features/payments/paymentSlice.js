// paymentSlice.js

import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    clientSecret: null, // Store the client secret obtained from the server
    paymentLoading: false,
    paymentError: null,
  },
  reducers: {
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
    startPaymentLoading: (state) => {
      state.paymentLoading = true;
      state.paymentError = null;
    },
    paymentSuccess: (state) => {
      state.paymentLoading = false;
      state.clientSecret = null;
    },
    paymentFailure: (state, action) => {
      state.paymentLoading = false;
      state.paymentError = action.payload;
    },
  },
});

export const {
  setClientSecret,
  startPaymentLoading,
  paymentSuccess,
  paymentFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;
