// productActions.js

import {
  setProducts,
  setLoading,
  setError,
  updateLoadedCount,
} from "../features/products/productsSlice";

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(setLoading());

    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status}`);
      }

      const data = await response.json();
      const { products } = data;
      dispatch(setProducts(products));
      dispatch(updateLoadedCount(products.length)); // Update loaded count
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
