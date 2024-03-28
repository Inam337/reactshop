// src/store/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  items: localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [],
  itemCount: 0, // New state for cart item count
  cartTotal: 0, // Initialize the total to 0
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.items.find(
        (product) => product.id === productToAdd.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...productToAdd, quantity: 1 });
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const productIndex = state.items.findIndex(
        (product) => product.id === productIdToRemove
      );

      if (productIndex !== -1) {
        // If the product is in the cart, remove it.
        state.items.splice(productIndex, 1);
        toast.success("Product removed from cart", {
          position: "bottom-left",
        });
      }
    },
    increaseQuantity: (state, action) => {
      const productIdToIncrease = action.payload;
      const productToIncrease = state.items.find(
        (product) => product.id === productIdToIncrease
      );

      if (productToIncrease) {
        // Increase the quantity of the specified product.
        productToIncrease.quantity += 1;
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      }
    },
    decreaseQuantity: (state, action) => {
      const productIdToDecrease = action.payload;
      const productToDecrease = state.items.find(
        (product) => product.id === productIdToDecrease
      );

      if (productToDecrease) {
        // Decrease the quantity of the specified product, but remove if it reaches 0.
        if (productToDecrease.quantity > 1) {
          productToDecrease.quantity -= 1;
          toast.info("Decrease product quantity", {
            position: "bottom-left",
          });
        } else {
          const productIndex = state.items.findIndex(
            (product) => product.id === productIdToDecrease
          );
          state.items.splice(productIndex, 1);
        }
      }
    },
    // Add other cart-related actions
    calculateTotal: (state) => {
      state.cartTotal = state.items.reduce((total, item) => {
        const test = total + item.price * item.quantity;
        console.log(test);
        return test;
      }, 0);
    },
    // Clear Cart
    clearCart: (state) => {
      // Clear the cart by setting items to an empty array
      state.items = [];
      toast.info("You Cart is Clear Now Happy Shopping :) ", {
        position: "bottom-left",
      });
    },
    // Other cart reducers
    checkOut: (state) => {
      // Perform actions related to checkout
      state.items = []; // Empty the cart on checkout
      // Other checkout related actions
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  calculateTotal,
  updateTotal,
  checkOut,
} = cartSlice.actions;

export default cartSlice.reducer;
