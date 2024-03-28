// api/fakeApi.js
import axios from "axios";

const fakeApi = axios.create({
  baseURL: "https://dummyjson.com", // Replace with your fake API URL
});
export default fakeApi;
