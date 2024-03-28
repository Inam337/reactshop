// Define an action to fetch categories
import axios from "axios";
import {
  setCategory,
  setLoading,
  setError,
} from "../features/categories/categoriesSlice";

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(setLoading());

    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );

      const category = await response.data;

      console.log(category);
      dispatch(setCategory(category));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
export const selectCategory = (selectedCategory) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const response = await axios.get(
      `https://dummyjson.com/products/categories/${selectedCategory}`
    );
    const category = await response.data;

    console.log(category);
    dispatch(setCategory(category));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
