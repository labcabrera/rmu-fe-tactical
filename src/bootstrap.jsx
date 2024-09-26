import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './i18n/i18n'

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter basename="/tactical">
      <App />
    </BrowserRouter>
  </StrictMode>
);
