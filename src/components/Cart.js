// src/components/Cart.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  calculateTotal,
  clearCart,
  checkOut,
} from "../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import CommonModal from "./CommonModal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveProduct, setIsRemoveProduct] = useState(false);
  // Define a state variable to store the ID of the product to be removed
  const [productToRemoveId, setProductToRemoveId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateTotal());
    console.log(calculateTotal());

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [dispatch, cart]);

  // // Function to update and calculate the cart total
  // const handleRemoveFromCart = (productId) => {
  //   dispatch(removeFromCart(productId));

  // };

  // ...

  // Modify the handleRemoveProductModal function to set the productToRemoveId
  const handleRemoveProductModal = (id) => {
    console.log("remove Id " + id);
    setProductToRemoveId(id);
    setIsRemoveProduct(true);
  };
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
    dispatch(calculateTotal()); // Update the total
  };
  // const handleClearCart = () => {
  //   dispatch(clearCart()); // Dispatch the clearCart action
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // const handleRemoveProductModal = (id) => {
  //   console.log("remove Id " + id);
  //   setIsRemoveProduct(true);
  // };

  const handleCloseProductModal = () => {
    setIsRemoveProduct(false);
  };
  const handleConfirmAction = () => {
    // Define the action to be executed when the "Confirm" button is clicked
    console.log("Confirmed!");
    // Add your custom logic here
    handleCloseModal();
    dispatch(clearCart());
  };
  const handleConfirmRemoveAction = (productId) => {
    // Define the action to be executed when the "Confirm" button is clicked
    console.log("Confirmed to remove product with ID:", productId);

    // Dispatch the action to remove the product
    dispatch(removeFromCart(productId));
    dispatch(calculateTotal()); // Update the total
    handleCloseProductModal(); // Close the removal confirmation modal
  };

  const handleCheckout = () => {
    //dispatch(checkOut());
    navigate("/checkout"); // Redirect to the checkout route
  };
  return (
    <div class="col-xs-8 offset-xs-2 col-md-8 offset-md-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
      <div className="main-page">
        <h2>
          <span>Shopping Cart</span>
        </h2>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <ul className="shopping-cart-list">
            {cart.map((item) => (
              <li key={item.id}>
                <span class="col-lg-12 card mb-4">
                  <span class="row card-body">
                    <span className="col-lg-6 card-text-image">
                      <span className="card-image">
                        <img src={item.thumbnail} alt={item.title} width="36" />
                      </span>
                      <h3 className="card-title">{item.title}</h3>
                    </span>

                    <span className="col-lg-2 quantity-box">
                      <button
                        className="btn btn-secondary btn-increase btn-sm "
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        <i class="bi bi-plus"></i>
                      </button>

                      <i className="card-quantity">{item.quantity}</i>
                      <button
                        className="btn btn-secondary btn-decrease btn-sm"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        <i class="bi bi-dash"></i>
                      </button>
                    </span>
                    <span className="col-lg-2 remove-box">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleRemoveProductModal(item.id)}
                      >
                        <i class="bi bi-trash3-fill"></i>
                      </button>
                    </span>
                    <span className="col-lg-2 d-flex justify-content-end price-number">
                      <p className="card-subtitle">${item.price}</p>
                    </span>
                  </span>
                </span>
              </li>
            ))}
            <div className="cart-summary">
              <div className="row">
                <div className="col-lg-8 backtocart-block justify-content-start">
                  <button
                    className="btn btn-secondary"
                    onClick={handleOpenModal}
                  >
                    Clear Cart
                  </button>
                  <div className="continue-shopping mt-4">
                    <Link to="/products">
                      <span className="btn btn-info btn-continue-shopping">
                        Continue Shopping
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 cart-checkout">
                  <div className="row subtotal-block">
                    <span className="col-lg-6 subtotal d-flex justify-content-start">
                      Subtotal
                    </span>
                    <span className="col-lg-6 amount d-flex justify-content-end">
                      ${cartTotal}
                    </span>
                  </div>
                  <p>Taxes and Shipping at checkout 5%</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </ul>
        )}
      </div>
      <CommonModal
        isOpen={isModalOpen}
        title="Cart"
        description="Are you sure you want to proceed?"
        onConfirm={handleConfirmAction}
        onClose={handleCloseModal}
      />
      <CommonModal
        isOpen={isRemoveProduct}
        title="Product"
        description="Are you sure you want to process this product ="
        onConfirm={() => handleConfirmRemoveAction(productToRemoveId)} // Pass the stored productToRemoveId
        onClose={handleCloseProductModal}
      />
    </div>
  );
};

export default Cart;
