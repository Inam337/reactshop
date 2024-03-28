// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; // Adjust the path as needed for your project
import productReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import searchResultReducer from "./features/searchresults/searchResultSlice";
import usersReducer from "./features/users/userSlice";
import fetchProductByCategoryReducer from "./features/products/productByCategorySlice";
import paymentReducer from "./features/payments/paymentSlice";
const rootReducer = combineReducers({
  // Add other reducers here if you have them
  cart: cartReducer, // Assuming you have a 'cart' reducer
  products: productReducer,
  categories: categoriesReducer,
  searchResults: searchResultReducer,
  users: usersReducer,
  productByCategory: fetchProductByCategoryReducer,
  payment: paymentReducer,
});

const store = configureStore({
  reducer: rootReducer, // Pass the combined reducers to the store
  // Other store configuration options if needed
});

export default store;
