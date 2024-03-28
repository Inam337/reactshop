// paymentActions.js

import {
  setClientSecret,
  startPaymentLoading,
  paymentSuccess,
  paymentFailure,
} from "../features/payments/paymentSlice";

export const createPaymentIntent = (amount, currency) => async (dispatch) => {
  dispatch(startPaymentLoading());
  try {
    // Make an API call to your backend to create a payment intent
    // Send amount, currency, and other necessary data
    const response = await fetch("/createPaymentIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment intent");
    }

    const { clientSecret } = await response.json();
    console.log(clientSecret);

    dispatch(setClientSecret(clientSecret));
    dispatch(paymentSuccess());
  } catch (error) {
    dispatch(paymentFailure(error.message));
  }
};
