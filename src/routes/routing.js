import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../components/Cart";
import Home from "../pages/Home";
import ProductList from "../components/ProductList";
import NotFound from "../pages/NotFound";
import ProductDetails from "../components/ProductDetails";
import Categories from "../components/Categories";
import Login from "../components/Login";
import ProductsByCategory from "../components/ProductsByCategory";
import Checkout from "../components/Checkout";
export default function routing() {
  return (
    <>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/products/category/:category"
          element={<ProductsByCategory />}
        />
        <Route path="*" element={<NotFound />} />
        {/* Use the navigate function to direct to the NotFound component for all other paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}
