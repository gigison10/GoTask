import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.scss";
import { UserProvider } from "./contexts/context";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "../src/utils/firebase/firebase-utils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/gotask">
      <ApiProvider api={apiSlice}>
        <UserProvider>
          <App />
        </UserProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
