import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../redux/actions/paymentActions";
import stripePromise from "../stripe/stripe";
import { Link } from "react-router-dom";
export default function Checkout() {
  // Fetch cart items from the Redux store
  const itemsInCart = useSelector((state) => state.cart.items);
  const { paymentIntent } = useSelector((state) => state.payment); // Replace with your actual selector
  const dispatch = useDispatch();
  //   const paymentLoading = useSelector((state) => state.payment.paymentLoading);
  //   const paymentError = useSelector((state) => state.payment.paymentError);
  // Calculate total price
  const totalPrice = itemsInCart.reduce((total, item) => total + item.price, 0);
  const setCurrency = "usd";

  const handlePayment = async (e, totalPrice) => {
    e.preventDefault();
    dispatch(createPaymentIntent(totalPrice));
  };

  //   const handlePayment = async (e) => {
  //     e.preventDefault();
  //     // Here you could dispatch an action to handle the payment
  //     // This is a simulated example and doesn't perform actual payment processing

  //     // Simulate processing by alerting a success message
  //     alert("Payment processed! This is a demo, no real payment is made.");
  //     dispatch(createPaymentIntent(totalPrice, "usd")); // Replace with desired amount and currency
  //     if (stripe) {
  //       // Example: Create a payment intent
  //       try {
  //         const paymentIntent = await fetch("/payment_intents", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(totalPrice, "usd"), // Replace with your payment details
  //         });

  //         const { clientSecret } = await paymentIntent.json();

  //         // Use stripe for payment processing
  //         const result = await stripe.confirmCardPayment(clientSecret, {
  //           payment_method: {
  //             card: {
  //               number: "1234567890",
  //               exp_month: 12,
  //               exp_year: 25,
  //               cvc: "123",
  //             },
  //           },
  //         });

  //         // Handle the result of the payment intent
  //         console.log(result);
  //       } catch (error) {
  //         console.error("Error processing payment:", error);
  //       }
  //     }
  //   };

  return (
    <div>
      <div className="col-xs-8 offset-xs-2 col-md-8 offset-md-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
        <div className="main-page">
          <h2>
            <span>Checkout</span>
          </h2>
          <h3 class="items-cart-heading">
            {" "}
            <span> Items in Cart</span>
          </h3>
          <ul className="product-list-block">
            {itemsInCart.map((item) => (
              <li key={item.id} className="product-box">
                <h5 class="card-title">{item.title}</h5>
                <span class="card-price"> ${item.price}</span>
              </li>
            ))}
          </ul>

          <div>
            <h3 class="items-cart-heading">
              <span>Payments</span>
            </h3>
            {/* Form to collect user details for payment */}
            <form onSubmit={handlePayment}>
              {/* Input fields for user's payment and shipping details (for demo purposes) */}
              <div class="form-group mb-2">
                <div>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div class="form-group mb-2">
                <div>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    name="address"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div class="form-group mb-2">
                <div>
                  <input
                    type="text"
                    id="cardnumber"
                    className="form-control"
                    name="cardnumber"
                    placeholder="Card Number "
                  />
                </div>
              </div>
              <div className="cart-summary mb-4">
                <div className="row">
                  <div className="col-lg-10 backtocart-block justify-content-start">
                    <div className="continue-shopping">
                      <Link to="/products">
                        <span className="btn btn-info btn-continue-shopping">
                          Continue Shopping
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-2 cart-checkout">
                    <div className="row subtotal-block">
                      <span className="col-lg-6 subtotal d-flex justify-content-start">
                        Total
                      </span>
                      <span className="col-lg-6 amount d-flex justify-content-end">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Other necessary input fields */}
              {/* Submit button to process payment */}
              <div className="col-lg-12">
                <div className="row">
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary btn-sm" type="submit">
                      Place Order Now
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* {paymentLoading && <p>Processing Payment...</p>}
      {paymentError && <p>Error: {paymentError}</p>} */}
      </div>
    </div>
  );
}
