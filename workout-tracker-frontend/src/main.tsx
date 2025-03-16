import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
const rootElement = document.getElementById("root");
console.log("Root Element:", rootElement);

if (!rootElement) {
  throw new Error("No root element found!");
}
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);