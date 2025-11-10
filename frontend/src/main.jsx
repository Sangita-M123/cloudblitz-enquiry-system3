import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { EnquiryProvider } from "./context/EnquiryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EnquiryProvider>
      <App />
    </EnquiryProvider>
  </React.StrictMode>
);
