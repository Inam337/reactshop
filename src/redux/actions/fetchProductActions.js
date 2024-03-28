// fetchProductActions.js

import {
  setLoading,
  setError,
  setProductById,
} from "../features/products/productsSlice";

export const fetchProductById = (productId) => {
  return async (dispatch) => {
    dispatch(setLoading());

    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.status}`);
      }

      const product = await response.json();
      console.log(product);
      // dispatch(setProductById(product));
      dispatch(setProductById({ productId, product }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
export default fetchProductById;
