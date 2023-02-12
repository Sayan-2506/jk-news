import ReactDOM from "react-dom/client";
import React, { createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import Store from "./store/store";

const store = new Store();

export const Context = createContext({
  store,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        store,
      }}
    >
      <Router>
        <App />
      </Router>
    </Context.Provider>
  </React.StrictMode>
);
