import React from "react";
import ReactDOM from "react-dom";
// import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
// import reducer from "./reducers/anecdoteReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
