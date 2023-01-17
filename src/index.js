// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/lab/LocalizationProvider";
import App from "./App";
import rootReducer from "./reducers/index.js";
// import AdapterMoment from "@mui/lab/AdapterMoment";

const enhancer = compose(applyMiddleware())

const store = createStore(rootReducer, enhancer);
const rootNode=  document.getElementById('root')
ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);