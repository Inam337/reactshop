import React from "react";
import Routing from "./routes/routing";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadeNavBar from "./components/HeadeNavBar";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <HeadeNavBar />
      <Routing />
      <ToastContainer />
    </>
  );
}

export default App;
