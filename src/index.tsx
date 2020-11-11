import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { voterToolStore } from "./store/voterAppStore";

ReactDOM.render(
  <Provider store={voterToolStore}>
    <Router >
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);