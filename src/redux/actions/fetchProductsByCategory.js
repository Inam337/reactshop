import {
  setLoading,
  setError,
  setProducts,
  setSelectedCategory,
} from "../features/products/productByCategorySlice"; // Import the actions from your slice

export const fetchDataCategoryByProduct = (category) => {
  return async (dispatch) => {
    dispatch(setLoading());

    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.status}`);
      }

      const products = await response.json();

      // Dispatch the setProducts action with the products data
      dispatch(setProducts(products));

      // Dispatch the setSelectedCategory action to store the selected category
      dispatch(setSelectedCategory(category));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
