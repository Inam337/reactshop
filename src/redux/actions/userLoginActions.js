// Custom action function
// productActions.js

import {
  loginPending,
  loginFulfilled,
  loginRejected,
  checkLoggedInUser,
} from "../features/users/userSlice";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginPending()); // Set loading state to 'loading'

  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR",
      }),
    });

    if (response.ok) {
      const user = await response.json();
      // console.log(user);

      localStorage.setItem("loginUser", JSON.stringify(user));
      dispatch(loginFulfilled(user)); // Set loading state to 'succeeded' and update the user
      dispatch(checkLoggedInUser()); // Check and set user from localStorage
    } else {
      const errorData = await response.json();
      console.log(errorData);
      dispatch(loginRejected(errorData.error)); // Set loading state to 'failed' and capture the error
    }
  } catch (error) {
    dispatch(loginRejected(error.message)); // Set loading state to 'failed' and capture the error
  }
};
export default loginUser;
