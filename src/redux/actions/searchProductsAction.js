// actions/searchProducts.js
import {
  startSearch,
  searchSuccess,
  searchFailure,
} from "../features/searchresults/searchResultSlice";
import axios from "axios";

export const searchProducts = (searchQuery) => async (dispatch) => {
  dispatch(startSearch());

  try {
    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${searchQuery}`
    );
    const results = await response.data;

    console.log(results);
    dispatch(searchSuccess(results));
  } catch (error) {
    dispatch(searchFailure(error.message));
  }
};
export default searchProducts;
